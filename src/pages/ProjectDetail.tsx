import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Building2, ChevronDown, Loader2, TrendingUp, TrendingDown, Quote, Lightbulb, Target } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { SectionTitle } from "@/components/ui/section-title";
import { useProjectWithFallback } from "@/hooks/useProjectsWithFallback";

// Section navigation items
const sectionNav = [
  { id: "info", label: "Info projet" },
  { id: "role", label: "Rôle" },
  { id: "process", label: "Process" },
  { id: "resultats", label: "Résultats" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProjectWithFallback(id || "");

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-text-secondary mt-4">Chargement du projet...</p>
        </div>
      </PageLayout>
    );
  }

  if (!project) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-display font-semibold mb-4">Projet non trouvé</h1>
          <Button asChild>
            <Link to="/projets">Voir tous les projets</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Sticky Section Navigation */}
      <nav className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border/50 hidden md:block">
        <div className="container">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-250 ease-in-out whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Image left, content panel right */}
      <header className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] overflow-hidden">
        {/* Background Image - Full width */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={project.heroImage}
            alt={`${project.title} - Aperçu`}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/40 md:from-black/10 via-black/20 md:via-transparent to-white/80 md:to-white/30" />
        </motion.div>

        {/* Content Panel - Right side on desktop, bottom overlay on mobile */}
        <div className="relative h-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] flex items-end md:items-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[45%] xl:w-[40%] bg-card/95 backdrop-blur-sm p-5 sm:p-6 md:p-10 lg:p-12 md:rounded-l-3xl lg:shadow-elevated flex flex-col justify-center"
          >
            {/* Back link */}
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-250 ease-in-out mb-4 md:mb-8 text-xs md:text-sm"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              Retour aux projets
            </Link>

            {/* Title block */}
            <div className="mb-4 md:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-[42px] font-display font-bold text-foreground leading-tight mb-2">
                {project.client && <span className="text-text-secondary">{project.client} / </span>}
                {project.title}
              </h1>
              <p className="text-text-tertiary text-xs md:text-sm mt-2">{project.year}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-3">
                <span className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium bg-primary text-primary-foreground rounded-full">
                  {project.role}
                </span>
              </div>
            </div>

            {/* La mission */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">La mission</h3>
              <p className="text-text-secondary leading-relaxed text-sm md:text-base">{project.subtitle}</p>
            </div>

            {/* Contexte - Hidden on mobile for brevity */}
            <div className="hidden md:block mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Contexte</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{project.context}</p>
            </div>

            {/* Principales actions menées */}
            {project.process && project.process.length > 0 && (
              <div className="mb-4 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">Principales actions menées</h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.process.slice(0, 4).map((step: any, i: number) => (
                    <span 
                      key={i} 
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {step.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href="#info"
              className="inline-flex items-center gap-2 text-primary font-medium text-sm md:text-base hover:gap-3 transition-all duration-250 ease-in-out"
            >
              Voir le détail du projet
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-section-mobile md:py-section">
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
          {/* CARTOUCHE INFO PROJET - Compact bloc replacing "À propos" + "Contexte" */}
          <motion.section
            id="info"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-card rounded-xl md:rounded-2xl border border-primary/20 shadow-soft p-4 sm:p-6 md:p-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Column 1 - À propos du client */}
                <div className="space-y-3 md:space-y-4 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-2xl font-display font-semibold text-foreground break-words">{project.client}</h3>
                  </div>
                  <div className="space-y-1 md:space-y-2 text-text-secondary text-xs sm:text-sm md:text-base">
                    <p className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <span className="font-medium text-foreground">Secteur :</span> 
                      <span className="break-words">{project.sector}</span>
                    </p>
                    <p className="flex flex-wrap items-start gap-1 sm:gap-2">
                      <span className="font-medium text-foreground shrink-0">Audience :</span> 
                      <span className="break-words">{project.audienceCible}</span>
                    </p>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-xs md:text-sm text-primary font-medium bg-primary/5 rounded-lg px-2 md:px-3 py-1.5 md:py-2 inline-block break-words">
                      {project.statCle}
                    </p>
                  </div>
                </div>

                {/* Column 2 - Contexte & Problème */}
                <div className="space-y-3 md:space-y-4 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-2xl font-display font-semibold text-foreground">Problème business</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-xs sm:text-sm md:text-base">{project.context}</p>
                  <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
                    {project.objectives.map((obj: { text: string; metric: string }, i: number) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-1.5 md:py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="text-text-secondary text-xs sm:text-sm md:text-base">{obj.text}</span>
                        <span className="font-semibold text-primary text-xs sm:text-sm md:text-base sm:whitespace-nowrap">{obj.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION OUTILS UTILISÉS */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-6">
              Outils utilisés sur ce projet
            </h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
              {project.tools.map((tool: { name: string; logo: string }, i: number) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="group flex flex-col items-center gap-1.5 md:gap-2"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-card border border-border shadow-soft flex items-center justify-center group-hover:shadow-elevated group-hover:border-primary/30 transition-all duration-250 ease-in-out">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${tool.name}&background=1E1AFD&color=fff`;
                      }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-text-secondary group-hover:text-primary transition-colors duration-250">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* GALERIE VISUELS PROJET */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
              <SectionTitle title="Aperçu du projet" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {project.gallery.map((image: any, i: number) => {
                  const src = typeof image === "string" ? image : image?.src;
                  const alt =
                    typeof image === "string"
                      ? `${project.title} - Visuel ${i + 1}`
                      : image?.alt || `${project.title} - Visuel ${i + 1}`;
                  const caption = typeof image === "string" ? "" : image?.caption;

                  if (!src) return null;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-250"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={src}
                          alt={alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {caption ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                          <p className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-xs sm:text-sm text-white font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 sm:translate-y-2 sm:group-hover:translate-y-0">
                            {caption}
                          </p>
                        </>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-center text-xs sm:text-sm text-text-tertiary mt-3 sm:mt-4 italic hidden sm:block">
                💡 Survolez les images pour voir les légendes
              </p>
            </motion.section>
          )}

          {/* Role & Team */}
          <motion.section
            id="role"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle title="Rôle & équipe" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">Mon rôle</h4>
                <p className="text-text-secondary mb-3 md:mb-4 text-sm md:text-base">{project.role}</p>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed">{project.collaboration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">Équipe projet</h4>
                <ul className="space-y-1.5 md:space-y-2">
                  {project.team.map((member: string, i: number) => (
                    <li key={i} className="text-text-secondary text-sm md:text-base">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Process */}
          <motion.section
            id="process"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle title="Process & étapes" />
            <div className="space-y-10 md:space-y-16">
              {project.process.map((step: any, index: number) => (
                <div key={step.step}>
                  <div className={`grid ${step.image ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-2xl'} gap-4 md:gap-10 items-start`}>
                    {/* Left: Content */}
                    <div className={`${step.image && index % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base md:text-lg shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-text-secondary mb-3 md:mb-4 text-sm md:text-base">{step.summary}</p>

                      <div className="bg-card rounded-lg p-4 md:p-5 space-y-3 md:space-y-4 border border-border/50">
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1.5 md:mb-2">Activités</h4>
                          <ul className="space-y-1 md:space-y-1.5">
                            {step.activities.map((activity: string, i: number) => (
                              <li key={i} className="text-xs md:text-sm text-text-secondary flex items-start gap-2">
                                <span className="text-primary">→</span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-foreground mb-1.5 md:mb-2">Livrables</h4>
                          <p className="text-xs md:text-sm text-text-secondary">{step.deliverables}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Image - only shown if image exists */}
                    {step.image && (
                      <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300" />
                          <img
                            src={step.image}
                            alt={step.imageCaption || step.title}
                            className="relative w-full aspect-[4/3] object-cover rounded-xl shadow-soft group-hover:shadow-elevated transition-shadow duration-300"
                          />
                          {step.imageCaption && (
                            <p className="mt-3 text-sm text-text-tertiary text-center italic">{step.imageCaption}</p>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section
            id="resultats"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle title="Résultats & impact" />

            {/* Before/After Visual Comparison */}
            {project.beforeAfterImages && (
              <div className="mb-8 md:mb-12">
                <h4 className="font-semibold text-foreground mb-4 md:mb-6 text-center text-sm md:text-base">Comparaison avant / après</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Before */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 px-2 md:px-3 py-1 bg-red-500/90 text-white text-xs md:text-sm font-medium rounded-full">
                      Avant
                    </div>
                    <img
                      src={project.beforeAfterImages.before.src}
                      alt={project.beforeAfterImages.before.alt}
                      className="w-full aspect-[4/3] object-cover rounded-lg md:rounded-xl border-2 border-red-200 shadow-soft"
                    />
                    <p className="mt-2 text-xs md:text-sm text-text-tertiary text-center">
                      {project.beforeAfterImages.before.caption}
                    </p>
                  </motion.div>

                  {/* After */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 px-2 md:px-3 py-1 bg-green-500/90 text-white text-xs md:text-sm font-medium rounded-full">
                      Après
                    </div>
                    <img
                      src={project.beforeAfterImages.after.src}
                      alt={project.beforeAfterImages.after.alt}
                      className="w-full aspect-[4/3] object-cover rounded-lg md:rounded-xl border-2 border-green-200 shadow-soft"
                    />
                    <p className="mt-2 text-xs md:text-sm text-text-tertiary text-center">
                      {project.beforeAfterImages.after.caption}
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Impact Metrics - Hero Display */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground text-base md:text-lg">Métriques d'impact</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {project.results.quantitative.map((result: any, i: number) => {
                  const isPositive = result.change.includes('+') || result.change.includes('-') && (result.metric.toLowerCase().includes('temps') || result.metric.toLowerCase().includes('erreur') || result.metric.toLowerCase().includes('abandon') || result.metric.toLowerCase().includes('ticket'));
                  const isNegativeGood = result.change.includes('-') && (result.metric.toLowerCase().includes('temps') || result.metric.toLowerCase().includes('erreur') || result.metric.toLowerCase().includes('abandon') || result.metric.toLowerCase().includes('ticket'));
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="relative bg-gradient-to-br from-card to-card/80 rounded-xl md:rounded-2xl p-5 md:p-8 border border-primary/20 shadow-soft hover:shadow-elevated hover:border-primary/40 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Background accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                      
                      {/* Metric label */}
                      <p className="text-sm md:text-base font-medium text-foreground mb-4 relative z-10">{result.metric}</p>
                      
                      {/* Change indicator - Hero element */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${isNegativeGood || result.change.includes('+') ? 'bg-green-500/15' : 'bg-primary/15'}`}>
                          {isNegativeGood ? (
                            <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                          ) : (
                            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          )}
                        </div>
                        <span className={`text-2xl md:text-4xl font-bold ${isNegativeGood || result.change.includes('+') ? 'text-green-600' : 'text-primary'}`}>
                          {result.change}
                        </span>
                      </div>
                      
                      {/* Before/After comparison */}
                      <div className="flex items-center gap-3 text-sm md:text-base relative z-10">
                        <div className="flex flex-col">
                          <span className="text-xs text-text-tertiary uppercase tracking-wide">Avant</span>
                          <span className="text-text-secondary line-through">{result.before}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs text-text-tertiary uppercase tracking-wide">Après</span>
                          <span className="font-semibold text-foreground">{result.after}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Qualitative Results - Testimonials style */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Quote className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground text-base md:text-lg">Retours qualitatifs</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {project.results.qualitative.map((item: string, i: number) => {
                  const isQuote = item.includes('"');
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className={`p-4 md:p-5 rounded-xl ${isQuote ? 'bg-primary/5 border-l-4 border-primary' : 'bg-card border border-border/50'}`}
                    >
                      {isQuote ? (
                        <p className="text-text-secondary italic text-sm md:text-base leading-relaxed">{item}</p>
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                          <p className="text-text-secondary text-sm md:text-base">{item}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Learnings - Insight cards */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h4 className="font-semibold text-foreground text-base md:text-lg">Enseignements clés</h4>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl md:rounded-2xl p-5 md:p-8 border border-amber-200/50 dark:border-amber-800/30">
                <div className="space-y-4 md:space-y-5">
                  {project.results.learnings.map((item: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.3 }}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                        <span className="text-amber-600 font-bold text-sm md:text-base">{i + 1}</span>
                      </div>
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed pt-1">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Summary */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-primary-light rounded-lg md:rounded-xl p-5 md:p-8"
          >
            <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">En 30 secondes</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {project.summary.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 md:gap-3 text-text-secondary text-sm md:text-base">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 pt-8 md:pt-12 border-t border-border">
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link to="/projets">
                <ArrowLeft className="w-4 h-4" />
                Voir d'autres projets
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full sm:w-auto">
              <Link to="/contact">
                Discuter d'un projet similaire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
