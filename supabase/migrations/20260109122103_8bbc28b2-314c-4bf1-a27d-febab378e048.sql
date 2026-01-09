-- Enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Table des rôles utilisateurs
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- RLS sur user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Fonction pour vérifier le rôle (security definer pour éviter la récursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Table des projets
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    hero_image_url TEXT,
    client TEXT,
    year TEXT,
    duration TEXT,
    role TEXT,
    context TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    tools TEXT[] DEFAULT '{}',
    gallery_images TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS sur projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Lecture publique des projets
CREATE POLICY "Projects are viewable by everyone"
ON public.projects
FOR SELECT
USING (true);

-- Admin peut tout faire sur projects
CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin peut voir les rôles
CREATE POLICY "Admins can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Bucket pour les images des projets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Politique de lecture publique pour les images
CREATE POLICY "Project images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

-- Admin peut upload des images
CREATE POLICY "Admins can upload project images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Admin peut supprimer des images
CREATE POLICY "Admins can delete project images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));