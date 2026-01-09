import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Tag } from "@/components/ui/tag";
import { ProjectCard } from "@/components/ui/project-card";

const services = [
  {
    title: "Product Discovery",
    description: "Recherche utilisateur, définition du problème et validation des opportunités pour réduire les risques produit.",
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
  "SaaS B2B",
  "Assurance",
  "E-commerce",
  "Santé",
  "Énergie",
];

const methodology = [
  { step: "01", title: "Découvrir", description: "Comprendre les utilisateurs, le business et les contraintes techniques." },
  { step: "02", title: "Définir", description: "Cadrer le problème et prioriser les opportunités à fort impact." },
  { step: "03", title: "Concevoir", description: "Itérer rapidement sur des solutions, tester et affiner." },
  { step: "04", title: "Livrer", description: "Accompagner les équipes pour une implémentation réussie." },
];

const featuredProjects = [
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
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Decorative elements component
const DecorativeElements = () => (
  <>
    {/* Top right stars */}
    <motion.div 
      className="absolute top-8 right-12 text-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
    >
      <Star className="w-6 h-6 fill-primary" />
    </motion.div>
    <motion.div 
      className="absolute top-16 right-4 text-primary/60"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.4 }}
    >
      <Star className="w-4 h-4 fill-primary/60" />
    </motion.div>
    
    {/* Lightning bolt */}
    <motion.svg
      className="absolute top-12 left-[55%] w-8 h-12 text-foreground"
      viewBox="0 0 24 36"
      fill="none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <path d="M13 2L4 20h7l-2 14 11-18h-8l3-14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </motion.svg>

    {/* Squiggle line near photo */}
    <motion.svg
      className="absolute bottom-20 left-[42%] w-16 h-8 text-foreground/40"
      viewBox="0 0 64 32"
      fill="none"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <path d="M2 16c10-12 20 12 30 0s20 12 30 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </motion.svg>

    {/* Arrow pointing to CTA */}
    <motion.svg
      className="absolute bottom-32 right-[20%] w-12 h-16 text-foreground hidden lg:block"
      viewBox="0 0 48 64"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <path d="M24 4c0 30 0 40 0 50M12 46l12 12 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </motion.svg>

    {/* Small diamond */}
    <motion.div
      className="absolute bottom-16 right-8"
      initial={{ opacity: 0, rotate: -45 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
      <div className="w-3 h-3 border-2 border-foreground rotate-45" />
    </motion.div>
  </>
);

export default function Index() {
  return (
    <PageLayout>
      {/* Hero Section - Split Asymmetric */}
      <section className="relative py-section-mobile md:py-section bg-primary-light overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left - Photo with decorative frame */}
            <motion.div 
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Circular badge "Welcome to my portfolio" */}
              <motion.div 
                className="absolute -top-4 -left-4 md:top-0 md:left-0 z-10"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                    </defs>
                    <text className="text-[11px] fill-foreground font-medium uppercase tracking-widest">
                      <textPath href="#circlePath">★ HELLO ★ WELCOME TO MY PORTFOLIO ★</textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-foreground" />
                  </div>
                </div>
              </motion.div>

              {/* Photo container with rounded shape */}
              <div className="relative">
                <div className="w-64 h-80 md:w-80 md:h-96 rounded-[2rem] overflow-hidden border-4 border-foreground/10 shadow-xl bg-card">
                  {/* Placeholder - replace with actual photo */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-4xl">👋</span>
                      </div>
                      <p className="text-sm text-text-secondary">Ajoutez votre photo ici</p>
                    </div>
                  </div>
                </div>
                
                {/* Sun decorative element */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-foreground" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="24"
                        y1="4"
                        x2="24"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${i * 45} 24 24)`}
                      />
                    ))}
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              className="order-1 lg:order-2"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              {/* Tagline badge */}
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6"
              >
                <span className="text-sm font-medium">:) MAKING IDEAS LOOK GOOD!</span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground leading-tight mb-4"
              >
                I'm [Votre Nom],
                <br />
                <span className="relative">
                  a Product Designer.
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary"
                    viewBox="0 0 200 12"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <path d="M2 8c50-8 100-8 196 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-text-secondary max-w-lg mb-6 leading-relaxed"
              >
                J'aide les équipes produit à lancer des expériences digitales 
                <span className="text-foreground font-medium"> utiles</span>, 
                <span className="text-foreground font-medium"> utilisables</span> et 
                <span className="text-foreground font-medium"> désirables</span>.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center gap-3 text-text-secondary mb-8">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Paris, France</span>
                <span className="mx-1">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Disponible</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="hero">
                  <Link to="/projets">
                    Voir mes projets
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Me contacter</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <DecorativeElements />
      </section>

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
                    <p className="text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
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
          <SectionTitle 
            title="Clients & secteurs" 
            subtitle="Plus de 8 ans d'expérience dans des environnements variés."
          />

          <motion.div 
            className="flex flex-wrap gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {clients.map((client) => (
              <motion.div key={client} variants={fadeInUp}>
                <Tag variant="default" size="lg">{client}</Tag>
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
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative"
              >
                <div className="text-5xl font-display font-bold text-accent/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
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

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
}
