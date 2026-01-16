import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Star, Loader2, Search, MoreHorizontal, Eye } from "lucide-react";
import { useProjects, useDeleteProject, Project } from "@/hooks/useProjects";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Admin() {
  const { data: projects, isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const featuredCount = projects?.filter(p => p.is_featured).length || 0;

  return (
    <AdminLayout
      title="Projets"
      subtitle={`${projects?.length || 0} projet${(projects?.length || 0) > 1 ? "s" : ""}`}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total projets"
          value={projects?.length || 0}
        />
        <StatCard
          label="Mis en avant"
          value={featuredCount}
        />
        <StatCard
          label="Catégories"
          value={[...new Set(projects?.map(p => p.category) || [])].length}
        />
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <Input
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[1fr_150px_120px_100px_60px] gap-4 px-6 py-3 bg-muted/30 border-b border-border text-xs font-medium text-text-secondary uppercase tracking-wider">
          <span>Projet</span>
          <span>Catégorie</span>
          <span>Année</span>
          <span>Statut</span>
          <span></span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredProjects.map((project) => (
              <ProjectRow 
                key={project.id} 
                project={project} 
                onDelete={() => deleteProject.mutate(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-5 h-5 text-text-tertiary" />
            </div>
            <p className="text-text-secondary mb-1">
              {searchQuery ? "Aucun projet trouvé" : "Aucun projet pour le moment"}
            </p>
            {!searchQuery && (
              <p className="text-sm text-text-tertiary">
                Créez votre premier projet pour commencer
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      <p className="text-2xl font-display font-semibold text-foreground">{value}</p>
    </div>
  );
}

function ProjectRow({ project, onDelete }: { project: Project; onDelete: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_120px_100px_60px] gap-2 md:gap-4 p-4 md:px-6 md:py-4 hover:bg-muted/30 transition-colors items-center">
      {/* Project Info */}
      <div className="flex items-center gap-4 min-w-0">
        {project.hero_image_url ? (
          <img 
            src={project.hero_image_url} 
            alt={project.title}
            className="w-12 h-12 md:w-14 md:h-10 object-cover rounded-lg shrink-0"
          />
        ) : (
          <div className="w-12 h-12 md:w-14 md:h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
            <span className="text-text-tertiary text-xs">—</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link 
              to={`/admin/projet/${project.slug}`}
              className="font-medium text-foreground hover:text-primary truncate transition-colors"
            >
              {project.title}
            </Link>
            {project.is_featured && (
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-text-secondary truncate">
            {project.client || "—"}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="hidden md:block">
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary">
          {project.category}
        </span>
      </div>

      {/* Year */}
      <div className="hidden md:block text-sm text-text-secondary">
        {project.year || "—"}
      </div>

      {/* Status */}
      <div className="hidden md:block">
        <span className={cn(
          "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
          project.is_featured
            ? "bg-primary/10 text-primary"
            : "bg-muted text-text-tertiary"
        )}>
          {project.is_featured ? "Vedette" : "Standard"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to={`/projet/${project.slug}`} className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Voir le projet
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/projet/${project.slug}`} className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Modifier
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem 
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </DropdownMenuItem>
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
                  <AlertDialogAction 
                    onClick={onDelete} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
