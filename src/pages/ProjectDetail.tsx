import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Building2, ChevronDown } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { SectionTitle } from "@/components/ui/section-title";

// Tool logos data
const toolLogos: Record<string, { name: string; logo: string }[]> = {
  default: [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
    { name: "Maze", logo: "https://asset.brandfetch.io/idvpELmzNc/idpWT7XIDK.svg" },
    { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  ]
};

// Sample project data
const projectsData: Record<string, any> = {
  "refonte-credit-en-ligne": {
    title: "Refonte parcours crédit",
    subtitle: "Refonte complète du parcours de souscription crédit en ligne",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    challengeBusiness: "Réduire de 50% le taux d'abandon sur le parcours crédit mobile tout en respectant les contraintes réglementaires.",
    client: "Crédit Mutuel",
    sector: "Banque",
    audienceCible: "Particuliers 25-45 ans",
    statCle: "Grande banque française · 30M+ clients",
    role: "Lead Product Designer",
    duration: "6 mois",
    year: "2024",
    tools: toolLogos.default,
    clientDescription: "Crédit Mutuel est l'une des principales banques françaises, avec plus de 30 millions de clients. Leur objectif : digitaliser leurs parcours tout en maintenant la relation de proximité.",
    context: "Le parcours de souscription crédit existant affichait un taux d'abandon de 72% sur mobile. Les utilisateurs se plaignaient de la complexité des formulaires et du manque de visibilité sur l'avancement.",
    problem: "Comment réduire significativement le taux d'abandon tout en respectant les contraintes réglementaires du secteur bancaire ?",
    objectives: [
      { text: "Réduire le taux d'abandon", metric: "-27pts conversion" },
      { text: "Améliorer la satisfaction", metric: "NPS +26pts" },
      { text: "Accélérer le parcours", metric: "Temps -53%" }
    ],
    team: [
      "1 Product Owner",
      "2 Développeurs front-end",
      "1 Développeur back-end",
      "1 Data Analyst"
    ],
    collaboration: "Travail en cycles de 2 semaines, avec découverte en continu et livraison incrémentale. Collaboration étroite avec l'équipe conformité pour valider chaque itération.",
    process: [
      {
        step: "01",
        title: "Recherche & compréhension",
        summary: "Immersion complète dans les pain points utilisateurs et les contraintes métier.",
        activities: [
          "12 entretiens utilisateurs avec prospects et clients",
          "Analyse des données analytics (funnel, heatmaps, session recordings)",
          "Audit UX du parcours existant",
          "Benchmark concurrentiel (5 banques en ligne)"
        ],
        deliverables: "3 personas, carte d'empathie, parcours utilisateur actuel avec pain points identifiés"
      },
      {
        step: "02",
        title: "Définition & cadrage",
        summary: "Priorisation des opportunités et définition de la vision produit.",
        activities: [
          "Atelier de priorisation avec les stakeholders (impact/effort)",
          "Formulation des hypothèses de design",
          "Définition des KPIs cibles",
          "Création de la vision produit"
        ],
        deliverables: "Problem statement, roadmap Q1-Q2, hypothèses à valider"
      },
      {
        step: "03",
        title: "Conception & prototypage",
        summary: "Itérations rapides pour converger vers une solution validée.",
        activities: [
          "Sketching et wireframes lo-fi",
          "Prototypes haute-fidélité sur Figma",
          "Contribution au design system de la banque",
          "3 sessions de revue avec les stakeholders"
        ],
        deliverables: "Prototype interactif complet, composants design system, documentation"
      },
      {
        step: "04",
        title: "Tests & itérations",
        summary: "Validation des hypothèses par des tests utilisateurs réels.",
        activities: [
          "5 tests utilisateurs modérés",
          "Test A/B sur le header du formulaire",
          "Itérations basées sur les retours",
          "Validation accessibilité RGAA"
        ],
        deliverables: "Rapport de tests, recommandations d'amélioration, version finale du design"
      },
      {
        step: "05",
        title: "Handover & delivery",
        summary: "Accompagnement des équipes pour une implémentation fidèle.",
        activities: [
          "Documentation Figma exhaustive",
          "Sessions de handover avec les développeurs",
          "Support continu pendant le développement",
          "QA design sur les environnements de test"
        ],
        deliverables: "Specs développeurs, design tokens, guide d'implémentation"
      }
    ],
    results: {
      quantitative: [
        { metric: "Taux d'abandon", before: "72%", after: "45%", change: "-27pts" },
        { metric: "Temps complétion", before: "15 min", after: "7 min", change: "-53%" },
        { metric: "NPS parcours", before: "+12", after: "+38", change: "+26pts" }
      ],
      qualitative: [
        "\"Le nouveau parcours est beaucoup plus fluide\" - Retour utilisateur test",
        "Équipe conformité satisfaite de la clarté des informations légales",
        "Adoption par les autres équipes produit du design system enrichi"
      ],
      learnings: [
        "L'importance de tester très tôt avec des utilisateurs réels dans un contexte réglementé",
        "La valeur d'impliquer la conformité dès la phase de conception",
        "Le progressive disclosure est clé pour les formulaires complexes"
      ]
    },
    summary: [
      "Problème : 72% d'abandon sur le parcours crédit mobile",
      "Action : Refonte complète basée sur la recherche utilisateur et les tests itératifs",
      "Impact : -27pts d'abandon, -53% de temps de complétion, +26pts NPS"
    ]
  }
};

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
  transition: { duration: 0.5 }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

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

      {/* HERO SECTION - Full-width banner */}
      <header className="relative min-h-[70vh] bg-gradient-to-br from-background via-background to-[hsl(230,100%,97%)] overflow-hidden">
        <div className="container h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] py-12 lg:py-0">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <Link 
                to="/projets" 
                className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-250 ease-in-out mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux projets
              </Link>

              <h1 className="text-4xl md:text-[56px] font-display font-bold text-foreground leading-tight mb-4">
                {project.title}
              </h1>
              <h2 className="text-xl md:text-[28px] font-medium text-text-secondary mb-6">
                {project.subtitle}
              </h2>

              {/* Tags badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Tag variant="primary" className="bg-primary text-primary-foreground">
                  {project.role}
                </Tag>
                <Tag variant="primary" className="bg-primary text-primary-foreground">
                  {project.duration}
                </Tag>
                <Tag variant="primary" className="bg-primary text-primary-foreground">
                  {project.year}
                </Tag>
              </div>

              {/* Challenge business */}
              <p className="text-lg md:text-xl italic text-primary font-medium">
                "{project.challengeBusiness}"
              </p>
            </motion.div>

            {/* Right side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3" />
                <img
                  src={project.heroImage}
                  alt={`${project.title} - Aperçu`}
                  className="relative w-full h-auto rounded-2xl shadow-elevated object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Sticky bottom hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a 
            href="#info" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-dark transition-colors duration-250 ease-in-out shadow-soft hover:shadow-elevated"
          >
            Aller au process
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
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
            <div className="bg-card rounded-2xl border border-primary/20 shadow-soft p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Column 1 - À propos du client */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {project.client}
                    </h3>
                  </div>
                  <div className="space-y-2 text-text-secondary">
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Secteur :</span> {project.sector}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Audience :</span> {project.audienceCible}
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-primary font-medium bg-primary/5 rounded-lg px-3 py-2 inline-block">
                      {project.statCle}
                    </p>
                  </div>
                </div>

                {/* Column 2 - Contexte & Problème */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      Problème business
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {project.context}
                  </p>
                  <div className="space-y-3 pt-2">
                    {project.objectives.map((obj: { text: string; metric: string }, i: number) => (
                      <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0">
                        <span className="text-text-secondary">{obj.text}</span>
                        <span className="font-semibold text-primary whitespace-nowrap">{obj.metric}</span>
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
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {project.tools.map((tool: { name: string; logo: string }, i: number) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border border-border shadow-soft flex items-center justify-center group-hover:shadow-elevated group-hover:border-primary/30 transition-all duration-250 ease-in-out">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tool.name}&background=1E1AFD&color=fff`;
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-text-secondary group-hover:text-primary transition-colors duration-250">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Role & Team */}
          <motion.section
            id="role"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle title="Rôle & équipe" />
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Mon rôle</h4>
                <p className="text-text-secondary mb-4">{project.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.collaboration}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Équipe projet</h4>
                <ul className="space-y-2">
                  {project.team.map((member: string, i: number) => (
                    <li key={i} className="text-text-secondary">{member}</li>
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
            <div className="space-y-12">
              {project.process.map((step: any, index: number) => (
                <div key={step.step} className="relative pl-8 border-l-2 border-border">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Étape {step.step}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mt-1">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary mt-2">{step.summary}</p>
                  </div>
                  <div className="bg-card rounded-lg p-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Activités</h4>
                      <ul className="space-y-1.5">
                        {step.activities.map((activity: string, i: number) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-primary">→</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Livrables</h4>
                      <p className="text-sm text-text-secondary">{step.deliverables}</p>
                    </div>
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
            
            {/* Quantitative */}
            <div className="mb-10">
              <h4 className="font-semibold text-foreground mb-4">Résultats quantitatifs</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {project.results.quantitative.map((result: any, i: number) => (
                  <div key={i} className="bg-card rounded-xl p-6 text-center">
                    <p className="text-sm text-text-secondary mb-2">{result.metric}</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-text-tertiary line-through">{result.before}</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="text-2xl font-bold text-foreground">{result.after}</span>
                    </div>
                    <span className="text-primary font-semibold">{result.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative */}
            <div className="mb-10">
              <h4 className="font-semibold text-foreground mb-4">Résultats qualitatifs</h4>
              <ul className="space-y-3">
                {project.results.qualitative.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learnings */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Enseignements clés</h4>
              <ul className="space-y-3">
                {project.results.learnings.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <span className="text-accent">💡</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Summary */}
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-primary-light rounded-xl p-8"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              En 30 secondes
            </h3>
            <ul className="space-y-2">
              {project.summary.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-border">
            <Button asChild variant="outline">
              <Link to="/projets">
                <ArrowLeft className="w-4 h-4" />
                Voir d'autres projets
              </Link>
            </Button>
            <Button asChild>
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
