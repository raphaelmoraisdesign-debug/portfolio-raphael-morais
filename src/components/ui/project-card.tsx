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
  imageUrl,
  className,
}: ProjectCardProps) {
  return (
    <Link to={`/projet/${id}`}>
      <motion.article
        className={cn(
          "group relative bg-card rounded-xl overflow-hidden shadow-card",
          "transition-all duration-300 hover:shadow-elevated",
          className
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="aspect-[16/10] bg-muted overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-subtle to-muted flex items-center justify-center">
              <span className="text-4xl font-display text-accent/40">{client.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Tag variant="accent" size="sm" className="mb-2">{sector}</Tag>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {client}
              </h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100" />
          </div>
          
          <p className="text-text-secondary mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Tag key={role} variant="outline" size="sm">{role}</Tag>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
