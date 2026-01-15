import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  LogOut, 
  ExternalLink,
  ChevronLeft,
  Menu,
  Plus
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Tableau de bord",
    href: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Projets",
    href: "/admin",
    icon: FolderKanban,
    end: true,
  },
];

export function AdminLayout({ 
  children, 
  title, 
  subtitle,
  actions,
  showBackButton = false,
  backTo = "/admin"
}: AdminLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (href: string, end?: boolean) => {
    if (end) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-card border-r border-border flex flex-col"
      >
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">RM</span>
                </div>
                <span className="font-display font-semibold text-foreground">Admin</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 shrink-0"
          >
            {sidebarCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <NavLink
            to="/admin"
            icon={FolderKanban}
            label="Projets"
            collapsed={sidebarCollapsed}
            active={location.pathname.startsWith("/admin")}
          />
        </nav>

        {/* Quick Actions */}
        <div className="p-3 border-t border-border space-y-1">
          <NavLink
            to="/admin/projet/nouveau"
            icon={Plus}
            label="Nouveau projet"
            collapsed={sidebarCollapsed}
            active={false}
            variant="primary"
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-1">
          <NavLink
            to="/"
            icon={ExternalLink}
            label="Voir le site"
            collapsed={sidebarCollapsed}
            external
          />
          <button
            onClick={handleSignOut}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-text-secondary hover:text-foreground hover:bg-muted/50",
              "transition-colors duration-150"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  Déconnexion
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col transition-all duration-200"
        style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
      >
        {/* Top Bar */}
        <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30 flex items-center px-6 gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="gap-2 -ml-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour
            </Button>
          )}
          
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="font-display text-lg font-semibold text-foreground truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-text-secondary truncate">{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0">
              {actions}
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  collapsed: boolean;
  active?: boolean;
  external?: boolean;
  variant?: "default" | "primary";
}

function NavLink({ to, icon: Icon, label, collapsed, active, external, variant = "default" }: NavLinkProps) {
  const baseClasses = cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
    "transition-all duration-150",
    collapsed && "justify-center px-0"
  );

  const variantClasses = {
    default: cn(
      active
        ? "bg-primary/10 text-primary"
        : "text-text-secondary hover:text-foreground hover:bg-muted/50"
    ),
    primary: cn(
      "bg-primary text-primary-foreground hover:bg-primary/90"
    ),
  };

  const content = (
    <>
      <Icon className={cn("w-5 h-5 shrink-0", collapsed && "w-5 h-5")} />
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="truncate"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, variantClasses[variant])}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={cn(baseClasses, variantClasses[variant])}>
      {content}
    </Link>
  );
}
