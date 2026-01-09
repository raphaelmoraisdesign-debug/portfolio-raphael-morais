import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

// Import project images
import bnpOmnicanaliteHero from "@/assets/projects/bnp-omnicanalite-siclid.png";
import bnpSouscriptionHero from "@/assets/projects/bnp-souscription-hero.jpg";
import eneHero from "@/assets/projects/ene-hero.jpg";
import polluxVoxalyHero from "@/assets/projects/pollux-voxaly-hero.jpg";

const allProjects = [
  {
    id: "bnp-omnicanalite-b2c",
    title: "Omnicanalité B2C",
    client: "BNP Paribas Personal Finance",
    sector: "Banque",
    description: "Conception d'une interface vendeur omnicanale pour les conseillers crédit Cetelem.",
    roles: ["UX Design", "UI Design", "Design System"],
    image: bnpOmnicanaliteHero,
  },
  {
    id: "bnp-souscription",
    title: "Parcours Souscription",
    client: "BNP Paribas Personal Finance",
    sector: "Banque",
    description: "Refonte complète du parcours de souscription crédit en ligne pour augmenter la conversion.",
    roles: ["UX Research", "UI Design", "Tests utilisateurs"],
    image: bnpSouscriptionHero,
  },
  {
    id: "ene-plateforme-educative",
    title: "ENE - Espace Numérique Éducatif",
    client: "JUNVA SAS",
    sector: "Éducation",
    description: "Conception d'une plateforme éducative numérique pour les collèges et départements.",
    roles: ["UX Design", "UI Design", "Personas"],
    image: eneHero,
  },
  {
    id: "pollux-voxaly",
    title: "POLLUX - Vote Électronique",
    client: "Docaposte / Voxaly",
    sector: "Services",
    description: "Refonte de l'expérience de vote électronique professionnel pour les élections d'entreprise.",
    roles: ["UX Research", "UI Design", "Ateliers"],
    image: polluxVoxalyHero,
  },
];

const sectors = ["Tous", "Banque", "Éducation", "Services"];

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
