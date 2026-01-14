import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Tag } from "@/components/ui/tag";
import { ProjectCard } from "@/components/ui/project-card";
import { HeroCentered } from "@/components/hero/HeroCentered";
import { useFeaturedProjectsWithFallback } from "@/hooks/useProjectsWithFallback";

const services = [
  {
    title: "Product Discovery",
    description:
      "Recherche utilisateur, définition du problème et validation des opportunités pour réduire les risques produit.",
  },
  {
    title: "UX/UI Design",
    description: "Conception d'interfaces intuitives et esthétiques, du wireframe au prototype haute-fidélité.",
  },
  {
    title: "Design Systems",
    description: "Création de systèmes de design scalables pour assurer cohérence et efficacité des équipes.",
  },
  {
    title: "Facilitation & Ateliers",
    description: "Animation de workshops collaboratifs pour aligner les équipes et accélérer la prise de décision.",
  },
];

const clients = [
  "Banque & Finance",
  "Sercice Publique",
  "B2B",
  "B2C",
  "Outils Internes",
  "Grands Comptes",
  "Ressource Humaines",
];

const methodology = [
  {
    step: "01",
    title: "Découvrir",
    description: "Comprendre les utilisateurs, le business et les contraintes techniques.",
  },
  { step: "02", title: "Définir", description: "Cadrer le problème et prioriser les opportunités à fort impact." },
  { step: "03", title: "Concevoir", description: "Itérer rapidement sur des solutions, tester et affiner." },
  { step: "04", title: "Livrer", description: "Accompagner les équipes pour une implémentation réussie." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Index() {
  const { data: featuredProjects = [], isLoading } = useFeaturedProjectsWithFallback();

  return (
    <PageLayout>
      {/* Hero Section */}
      <HeroCentered />

      {/* Services Section */}
      <section className="py-section-mobile md:py-section">
        <div className="container">
          <SectionTitle
            title="Ce que je fais"
            subtitle="Une approche centrée utilisateur pour créer des produits qui comptent."
          />

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group p-6 md:p-8 rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-section-mobile md:py-section bg-primary-light">
        <div className="container">
          <SectionTitle title="Clients & secteurs" subtitle="7 ans d'expérience dans des environnements variés." />

          <motion.div
            className="flex flex-wrap gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {clients.map((client) => (
              <motion.div key={client} variants={fadeInUp}>
                <Tag variant="default" size="lg">
                  {client}
                </Tag>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-section-mobile md:py-section">
        <div className="container">
          <SectionTitle
            title="Méthode de travail"
            subtitle="Un process itératif et collaboratif pour des résultats mesurables."
          />

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {methodology.map((item, index) => (
              <motion.div key={item.step} variants={fadeInUp} className="relative">
                <div className="text-5xl font-display font-bold text-accent/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                {index < methodology.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-8 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-section-mobile md:py-section bg-card/50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <SectionTitle
              title="Projets sélectionnés"
              subtitle="Quelques études de cas qui illustrent mon approche."
              className="mb-0"
            />
            <Button asChild variant="ghost">
              <Link to="/projets">
                Voir tous les projets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {featuredProjects.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {featuredProjects.slice(0, 3).map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    client={project.client}
                    sector={project.sector}
                    description={project.description}
                    roles={project.roles}
                    imageUrl={project.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-text-secondary py-8">Aucun projet à afficher pour le moment.</p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
