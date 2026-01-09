import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link 
              to="/" 
              className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors duration-250 ease-in-out"
            >
              Marie Dupont
            </Link>
            <p className="text-text-secondary mt-2 text-sm">
              Senior Product Designer · Paris
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-250 ease-in-out"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="text-text-secondary hover:text-primary transition-colors duration-250 ease-in-out"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-tertiary">
          <p>© 2025 Marie Dupont. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/projets" className="hover:text-primary transition-colors duration-250 ease-in-out">
              Projets
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-250 ease-in-out">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}