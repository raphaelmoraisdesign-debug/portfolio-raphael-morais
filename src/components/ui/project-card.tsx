import { cn } from "@/lib/utils";
import { Tag } from "./tag";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  client: string;
  sector: string;
  description: string;
  roles: string[];
  image?: string;
  imageUrl?: string;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  client,
  sector,
  description,
  roles,
  image,
  imageUrl,
  className,
}: ProjectCardProps) {
  const imageSrc = image || imageUrl;
  
  return (
    <Link to={`/projet/${id}`} className="h-full">
      <motion.article
        className={cn(
          "group relative bg-card rounded-2xl overflow-hidden shadow-card border border-transparent h-full flex flex-col",
          "transition-all duration-300 ease-out hover:shadow-card-hover hover:border-primary/30",
          className
        )}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Image */}
        <div className="aspect-[16/10] bg-muted overflow-hidden relative">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-light via-muted to-accent-secondary/10 flex items-center justify-center">
              <span className="text-5xl font-display font-bold text-gradient">{client.charAt(0)}</span>
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Tag variant="accent" size="sm" className="mb-2">{sector}</Tag>
              <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
            </div>
            <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
          
          <p className="text-text-secondary mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {roles.map((role) => (
              <Tag 
                key={role} 
                variant={role.toLowerCase().includes("lead") ? "primary" : "outline"} 
                size="sm"
              >
                {role}
              </Tag>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}