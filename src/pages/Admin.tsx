import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Home, Star, GripVertical, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects, useDeleteProject, Project } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast.error("Vous n'avez pas les droits d'administration");
      navigate("/");
    }
  }, [isAdmin, authLoading, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors">
              Portfolio Admin
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Voir le site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold text-foreground">
                Gestion des projets
              </h1>
              <p className="text-text-secondary mt-1">
                {projects?.length || 0} projet{(projects?.length || 0) > 1 ? "s" : ""}
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/projet/nouveau">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau projet
              </Link>
            </Button>
          </div>

          {/* Projects List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {projects && projects.length > 0 ? (
              <div className="divide-y divide-border">
                {projects.map((project) => (
                  <ProjectRow 
                    key={project.id} 
                    project={project} 
                    onDelete={() => deleteProject.mutate(project.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-text-secondary mb-4">Aucun projet pour le moment</p>
                <Button asChild>
                  <Link to="/admin/projet/nouveau">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer votre premier projet
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function ProjectRow({ project, onDelete }: { project: Project; onDelete: () => void }) {
  return (
    <div className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
      <GripVertical className="w-4 h-4 text-text-tertiary cursor-grab" />
      
      {project.hero_image_url ? (
        <img 
          src={project.hero_image_url} 
          alt={project.title}
          className="w-16 h-12 object-cover rounded-lg"
        />
      ) : (
        <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-text-tertiary text-xs">No img</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-foreground truncate">{project.title}</h3>
          {project.is_featured && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          )}
        </div>
        <p className="text-sm text-text-secondary truncate">
          {project.client} · {project.category}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/admin/projet/${project.slug}`}>
            <Pencil className="w-4 h-4" />
          </Link>
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer le projet ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le projet "{project.title}" sera définitivement supprimé.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
