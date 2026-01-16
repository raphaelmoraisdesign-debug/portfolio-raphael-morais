import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
export function Footer() {
  return <footer className="relative border-t border-border bg-card/50 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container py-14 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link to="/" className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 tracking-tight">
              Raphael<span className="text-gradient"> MORAIS</span>
            </Link>
            <p className="text-text-secondary mt-3 text-sm">
              Product Designer confirmé · Paris, France
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-secondary hover:bg-primary/10 text-text-secondary hover:text-primary transition-all duration-300" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@example.com" 
              className="p-3 rounded-full bg-secondary hover:bg-primary/10 text-text-secondary hover:text-primary transition-all duration-300" 
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} Raphael MORAIS LEAL. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link to="/projets" className="hover:text-primary transition-colors duration-300 font-medium">
              Projets
            </Link>
            <Link to="/competences" className="hover:text-primary transition-colors duration-300 font-medium">
              Compétences
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-300 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}