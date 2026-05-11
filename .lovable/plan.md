## Problème

L'utilisateur `raphaelmorais.design@gmail.com` a bien le rôle `admin` en base, mais reçoit quand même le message « Vous n'avez pas les droits d'administration » lorsqu'il accède à `/admin`.

## Cause racine

Dans `src/hooks/useAuth.tsx`, la vérification du rôle admin (`checkAdminStatus`) est asynchrone et **n'est pas attendue** avant de passer `loading` à `false` :

```ts
supabase.auth.getSession().then(({ data: { session } }) => {
  setSession(session);
  setUser(session?.user ?? null);
  if (session?.user) {
    checkAdminStatus(session.user.id); // pas de await
  }
  setLoading(false); // déclenché immédiatement
});
```

Conséquence : dans `ProtectedRoute`, dès que `loading` passe à `false`, `isAdmin` vaut encore `false` (la requête `user_roles` n'a pas eu le temps de répondre). Le `useEffect` déclenche alors immédiatement le toast d'erreur et la redirection vers `/`, avant que le rôle admin réel ne soit chargé.

Le même problème existe dans le listener `onAuthStateChange` qui utilise `setTimeout(..., 0)` — `isAdmin` reste `false` pendant un tick, suffisant pour déclencher la redirection.

## Correctif

### 1. `src/hooks/useAuth.tsx`
- Ajouter un état distinct `roleLoading` (ou attendre la fin de `checkAdminStatus` avant de passer `loading` à `false`).
- Rendre `checkAdminStatus` `async` et `await` son résultat dans le flux de chargement initial et dans `onAuthStateChange`.
- Exposer un `loading` qui ne devient `false` qu'une fois la session **et** le rôle vérifiés.

Approche concrète :
```ts
const checkAdminStatus = async (userId: string) => {
  const { data } = await supabase.from("user_roles")
    .select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  setIsAdmin(!!data);
};

// init
const { data: { session } } = await supabase.auth.getSession();
setSession(session); setUser(session?.user ?? null);
if (session?.user) await checkAdminStatus(session.user.id);
setLoading(false);
```

Pour `onAuthStateChange`, conserver le pattern non-bloquant mais marquer un `roleChecked` à `false` pendant la revérification, et inclure cet état dans `loading`.

### 2. `src/components/auth/ProtectedRoute.tsx`
Aucune modification fonctionnelle nécessaire — il suffit que `loading` reflète aussi le chargement du rôle. Optionnel : ne déclencher la redirection admin que si `user` est défini ET `roleChecked` est `true`.

## Vérification

1. Se déconnecter / reconnecter avec `raphaelmorais.design@gmail.com`.
2. Accéder à `/admin` → la page doit s'afficher sans toast d'erreur.
3. Tester avec un compte non-admin → le toast et la redirection doivent toujours fonctionner.