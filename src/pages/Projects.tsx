import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

const allProjects = [
  {
    id: "refonte-credit-en-ligne",
    title: "Refonte parcours crédit",
    client: "Crédit Mutuel",
    sector: "Banque",
    description: "Augmenter le taux de conversion du parcours de souscription crédit en ligne de 35%.",
    roles: ["UX Research", "UI Design", "Design System"],
  },
  {
    id: "dashboard-analytics-saas",
    title: "Dashboard Analytics",
    client: "DataViz Pro",
    sector: "SaaS B2B",
    description: "Concevoir un dashboard analytique intuitif pour des utilisateurs non-techniques.",
    roles: ["Product Discovery", "UX Design", "Prototypage"],
  },
  {
    id: "application-mobile-assurance",
    title: "App mobile sinistres",
    client: "AXA",
    sector: "Assurance",
    description: "Simplifier la déclaration de sinistres pour réduire le temps de traitement de 60%.",
    roles: ["UX Research", "Mobile Design", "Tests utilisateurs"],
  },
  {
    id: "plateforme-energie",
    title: "Plateforme suivi conso",
    client: "Engie",
    sector: "Énergie",
    description: "Créer une expérience de suivi de consommation énergétique engageante pour les particuliers.",
    roles: ["UX Design", "Data Visualization", "Workshop"],
  },
  {
    id: "e-commerce-luxe",
    title: "E-commerce premium",
    client: "Maison Luxe",
    sector: "E-commerce",
    description: "Repenser l'expérience d'achat en ligne pour une marque de luxe française.",
    roles: ["UX Strategy", "UI Design", "Design System"],
  },
  {
    id: "app-sante-patients",
    title: "Suivi patient",
    client: "Doctolib",
    sector: "Santé",
    description: "Améliorer l'engagement patient dans le suivi post-consultation.",
    roles: ["UX Research", "Mobile Design", "Accessibility"],
  },
];

const sectors = ["Tous", "Banque", "SaaS B2B", "Assurance", "Énergie", "E-commerce", "Santé"];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredProjects = activeFilter === "Tous" 
    ? allProjects 
    : allProjects.filter(p => p.sector === activeFilter);

  return (
    <PageLayout>
      <section className="py-section-mobile md:py-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle 
              title="Mes projets" 
              subtitle="Une sélection d'études de cas qui illustrent ma démarche et mon impact."
            />
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveFilter(sector)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ease-in-out",
                  activeFilter === sector
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-text-secondary hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {sector}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            animate="animate"
            variants={stagger}
            key={activeFilter}
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={fadeInUp}
                layout
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.p 
              className="text-center text-text-secondary py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Aucun projet dans cette catégorie pour le moment.
            </motion.p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
