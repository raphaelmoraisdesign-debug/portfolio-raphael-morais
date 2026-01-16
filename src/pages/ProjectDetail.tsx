import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Building2, ChevronDown, Loader2, Quote } from "lucide-react";
import { ImpactCard } from "@/components/ui/impact-card";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { SectionTitle } from "@/components/ui/section-title";
import { useProjectWithFallback } from "@/hooks/useProjectsWithFallback";

// Section navigation items - MCAR structure
const sectionNav = [
  { id: "mission", label: "Mission" },
  { id: "constat", label: "Constat" },
  { id: "action", label: "Action" },
  { id: "resultats", label: "Résultat" },
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

      {/* Main Content - MCAR Structure */}
      <div className="container py-section-mobile md:py-section">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          
          {/* MISSION Section */}
          {project.mcar && (
            <motion.section
              id="mission"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">01</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Mission</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card">
                <p className="text-text-secondary leading-relaxed text-base md:text-lg">{project.mcar.mission}</p>
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-text-tertiary">
                    <span className="font-medium text-foreground">Rôle :</span> {project.role}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-tertiary">
                    <span className="font-medium text-foreground">Durée :</span> {project.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-tertiary">
                    <span className="font-medium text-foreground">Période :</span> {project.year}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* CONSTAT Section */}
          {project.mcar && (
            <motion.section
              id="constat"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-lg">02</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Constat</h2>
              </div>
              <div className="bg-card rounded-xl border border-amber-200 p-6 md:p-8 shadow-card">
                <div className="flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <p className="text-text-secondary leading-relaxed text-base md:text-lg">{project.mcar.constat}</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ACTION Section */}
          {project.mcar && (
            <motion.section
              id="action"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">03</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Action</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card mb-8">
                <p className="text-text-secondary leading-relaxed text-base md:text-lg">{project.mcar.action}</p>
              </div>

              {/* Process Steps */}
              {project.process && project.process.length > 0 && (
                <div className="space-y-8 md:space-y-12">
                  <h3 className="text-lg font-semibold text-foreground">Étapes du processus</h3>
                  {project.process.map((step: any, index: number) => (
                    <div key={step.step} className={`grid ${step.image ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4 md:gap-8 items-start`}>
                      <div className={`${step.image && index % 2 === 1 ? "md:order-2" : ""}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                          <h4 className="text-base md:text-lg font-semibold text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-text-secondary mb-3 text-sm">{step.summary}</p>
                        <div className="bg-accent-subtle rounded-lg p-4 space-y-3">
                          <div>
                            <h5 className="text-xs font-semibold text-foreground mb-1.5">Activités</h5>
                            <ul className="space-y-1">
                              {step.activities.map((activity: string, i: number) => (
                                <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                                  <span className="text-primary">→</span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-foreground mb-1">Livrables</h5>
                            <p className="text-xs text-text-secondary">{step.deliverables}</p>
                          </div>
                        </div>
                      </div>
                      {step.image && (
                        <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                          <img
                            src={step.image}
                            alt={step.imageCaption || step.title}
                            className="w-full aspect-video object-cover rounded-xl shadow-soft"
                          />
                          {step.imageCaption && (
                            <p className="mt-2 text-xs text-text-tertiary text-center italic">{step.imageCaption}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tools */}
              {project.tools && project.tools.length > 0 && (
                <div className="mt-10 text-center">
                  <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-4">Outils utilisés</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {project.tools.map((tool: { name: string; logo: string }, i: number) => (
                      <div key={tool.name} className="flex flex-col items-center gap-1.5">
                        <div className="w-12 h-12 rounded-full bg-card border border-border shadow-soft flex items-center justify-center">
                          <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-xs text-text-secondary">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}

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


          {/* RÉSULTAT Section - MCAR */}
          {project.mcar && (
            <motion.section
              id="resultats"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">04</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Résultat</h2>
              </div>
              
              {/* Narrative Block */}
              <div className="bg-card rounded-xl border border-emerald-200 p-6 md:p-8 shadow-card mb-10">
                <p className="text-text-secondary leading-relaxed text-base md:text-lg">{project.mcar.resultat}</p>
              </div>

              {/* Before/After Visual Comparison */}
              {project.beforeAfterImages && (
                <div className="mb-10">
                  <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-6">Comparaison avant / après</h4>
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
                        className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-red-200 shadow-soft"
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
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 px-2 md:px-3 py-1 bg-emerald-500/90 text-white text-xs md:text-sm font-medium rounded-full">
                        Après
                      </div>
                      <img
                        src={project.beforeAfterImages.after.src}
                        alt={project.beforeAfterImages.after.alt}
                        className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-emerald-200 shadow-soft"
                      />
                      <p className="mt-2 text-xs md:text-sm text-text-tertiary text-center">
                        {project.beforeAfterImages.after.caption}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Impact Metrics */}
              {project.results?.quantitative && project.results.quantitative.length > 0 && (
                <div className="mb-10">
                  <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-6">Métriques d'impact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.results.quantitative.map((result: any, i: number) => (
                      <ImpactCard
                        key={i}
                        metric={result.metric}
                        change={result.change}
                        before={result.before}
                        after={result.after}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Qualitative Results */}
              {project.results?.qualitative && project.results.qualitative.length > 0 && (
                <div className="mb-10">
                  <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-6">Retours qualitatifs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.qualitative.map((item: string, i: number) => {
                      const isQuote = item.includes('"');
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="bg-card rounded-xl p-5 border border-border shadow-card"
                        >
                          {isQuote ? (
                            <div className="flex gap-3">
                              <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <p className="text-text-secondary italic leading-relaxed">{item}</p>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                              <p className="text-text-secondary leading-relaxed">{item}</p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Learnings */}
              {project.results?.learnings && project.results.learnings.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-6">Enseignements clés</h4>
                  <div className="bg-accent-subtle rounded-xl p-6 md:p-8">
                    <div className="space-y-4">
                      {project.results.learnings.map((item: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="flex items-start gap-4"
                        >
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-primary font-semibold text-sm">{i + 1}</span>
                          </div>
                          <p className="text-text-secondary leading-relaxed pt-0.5">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* Summary */}
          {project.summary && project.summary.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-accent-subtle rounded-lg md:rounded-xl p-5 md:p-8"
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
          )}

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
