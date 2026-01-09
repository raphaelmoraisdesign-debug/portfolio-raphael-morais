import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Building2, ChevronDown } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { SectionTitle } from "@/components/ui/section-title";

// Import project images
import bnpOmnicanaliteHero from "@/assets/projects/bnp-omnicanalite-hero.jpg";
import bnpSouscriptionHero from "@/assets/projects/bnp-souscription-hero.jpg";
import eneHero from "@/assets/projects/ene-hero.jpg";
import polluxVoxalyHero from "@/assets/projects/pollux-voxaly-hero.jpg";

// Tool logos data
const toolLogos = {
  bnpPF: [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
    { name: "Maze", logo: "https://asset.brandfetch.io/idvpELmzNc/idpWT7XIDK.svg" },
    { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  ],
  ene: [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
    { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
  ],
  voxaly: [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
    { name: "Teams", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg" },
  ],
};

// Project data for all 4 real projects
const projectsData: Record<string, any> = {
  "bnp-omnicanalite-b2c": {
    title: "Omnicanalité B2C",
    subtitle: "Interface vendeur omnicanale pour les conseillers crédit Cetelem",
    heroImage: bnpOmnicanaliteHero,
    challengeBusiness: "Unifier l'expérience vendeur sur tous les canaux pour améliorer l'efficacité commerciale et la satisfaction client.",
    client: "BNP Paribas Personal Finance",
    sector: "Banque / Crédit",
    audienceCible: "Conseillers crédit en agence et à distance",
    statCle: "Leader européen du crédit · Cetelem",
    role: "Product Designer",
    duration: "8 mois",
    year: "2024",
    tools: toolLogos.bnpPF,
    gallery: [],
    context: "Les conseillers crédit Cetelem utilisaient plusieurs outils non connectés pour gérer les dossiers clients, créant des frictions et des erreurs de saisie. L'objectif était de créer une interface unifiée omnicanale.",
    objectives: [
      { text: "Réduire le temps de traitement dossier", metric: "-40%" },
      { text: "Améliorer la satisfaction conseiller", metric: "NPS +20pts" },
      { text: "Unifier les canaux de vente", metric: "1 interface" }
    ],
    team: [
      "1 Product Owner",
      "2 Product Designers",
      "3 Développeurs front-end",
      "1 Lead Tech"
    ],
    collaboration: "Travail en squad agile avec des sprints de 2 semaines. Collaboration étroite avec les équipes métier crédit et les conseillers terrain.",
    process: [
      {
        step: "01",
        title: "Discovery & Research",
        summary: "Compréhension du contexte métier et des pain points des conseillers.",
        activities: [
          "Observation terrain en agence Cetelem",
          "Entretiens avec 15 conseillers crédit",
          "Analyse des outils existants",
          "Mapping des parcours vendeur actuels"
        ],
        deliverables: "Personas conseillers, parcours utilisateur AS-IS, liste des pain points priorisés"
      },
      {
        step: "02",
        title: "Conception & Idéation",
        summary: "Co-conception de la solution avec les équipes métier.",
        activities: [
          "Ateliers d'idéation avec les conseillers",
          "Conception des wireframes",
          "Définition du design system",
          "Prototypage interactif"
        ],
        deliverables: "Wireframes validés, prototype Figma, composants design system"
      },
      {
        step: "03",
        title: "Tests & Validation",
        summary: "Validation de la solution avec des utilisateurs réels.",
        activities: [
          "Tests utilisateurs en agence",
          "Itérations sur les retours",
          "Validation métier et conformité"
        ],
        deliverables: "Maquettes finales, documentation UX"
      },
      {
        step: "04",
        title: "Delivery & Suivi",
        summary: "Accompagnement des équipes de développement.",
        activities: [
          "Handover développeurs",
          "Support pendant l'implémentation",
          "QA design"
        ],
        deliverables: "Specs techniques, design tokens"
      }
    ],
    results: {
      quantitative: [
        { metric: "Temps traitement", before: "25 min", after: "15 min", change: "-40%" },
        { metric: "Erreurs de saisie", before: "12%", after: "4%", change: "-67%" },
        { metric: "Satisfaction conseiller", before: "+18", after: "+42", change: "+24pts" }
      ],
      qualitative: [
        "\"Enfin un outil qui correspond à notre façon de travailler\" - Conseiller Cetelem",
        "Adoption rapide par les équipes terrain",
        "Réduction significative des appels au support"
      ],
      learnings: [
        "L'importance de l'observation terrain pour comprendre les vrais besoins",
        "La co-conception avec les utilisateurs finaux garantit l'adoption",
        "Un design system robuste accélère les développements futurs"
      ]
    },
    summary: [
      "Problème : Outils fragmentés causant inefficacité et frustration",
      "Action : Interface omnicanale unifiée co-conçue avec les conseillers",
      "Impact : -40% temps de traitement, +24pts satisfaction"
    ]
  },

  "bnp-souscription": {
    title: "Parcours Souscription",
    subtitle: "Refonte du parcours de souscription crédit en ligne Cetelem",
    heroImage: bnpSouscriptionHero,
    challengeBusiness: "Réduire le taux d'abandon sur le parcours de souscription crédit tout en respectant les contraintes réglementaires bancaires.",
    client: "BNP Paribas Personal Finance",
    sector: "Banque / Crédit",
    audienceCible: "Particuliers 25-55 ans",
    statCle: "Leader européen du crédit · Cetelem",
    role: "Product Designer",
    duration: "6 mois",
    year: "2024",
    tools: toolLogos.bnpPF,
    gallery: [],
    context: "Le parcours de souscription crédit existant affichait un taux d'abandon élevé. Les utilisateurs se plaignaient de la complexité des formulaires et du manque de visibilité sur l'avancement.",
    objectives: [
      { text: "Réduire le taux d'abandon", metric: "-30%" },
      { text: "Améliorer le taux de conversion", metric: "+25%" },
      { text: "Réduire le temps de complétion", metric: "-50%" }
    ],
    team: [
      "1 Product Owner",
      "2 Product Designers",
      "2 Développeurs front-end",
      "1 Data Analyst"
    ],
    collaboration: "Méthodologie Lean UX avec des cycles de découverte et livraison en continu. Tests utilisateurs réguliers via Maze.",
    process: [
      {
        step: "01",
        title: "Research & Analyse",
        summary: "Analyse approfondie des données et comportements utilisateurs.",
        activities: [
          "Analyse des données analytics (funnel, heatmaps)",
          "Entretiens utilisateurs",
          "Audit UX du parcours existant",
          "Benchmark concurrentiel"
        ],
        deliverables: "Rapport de recherche, personas, parcours utilisateur"
      },
      {
        step: "02",
        title: "Ateliers & Idéation",
        summary: "Co-conception avec les stakeholders.",
        activities: [
          "Atelier Crazy 8",
          "Priorisation des solutions",
          "Wireframes collaboratifs"
        ],
        deliverables: "Concepts validés, userflow cible"
      },
      {
        step: "03",
        title: "Prototypage & UI",
        summary: "Conception des interfaces haute fidélité.",
        activities: [
          "Design UI responsive",
          "Prototypage interactif Figma",
          "Micro-interactions"
        ],
        deliverables: "Prototype interactif, UI Kit"
      },
      {
        step: "04",
        title: "Tests utilisateurs",
        summary: "Validation via tests modérés et non-modérés.",
        activities: [
          "Tests Maze (quantitatif)",
          "Tests modérés (qualitatif)",
          "Itérations"
        ],
        deliverables: "Rapport de tests, maquettes finales"
      },
      {
        step: "05",
        title: "Handover",
        summary: "Transmission aux équipes de développement.",
        activities: [
          "Documentation Figma",
          "Specs développeurs",
          "QA design"
        ],
        deliverables: "Documentation complète, composants prêts"
      }
    ],
    results: {
      quantitative: [
        { metric: "Taux d'abandon", before: "68%", after: "42%", change: "-26pts" },
        { metric: "Temps complétion", before: "12 min", after: "6 min", change: "-50%" },
        { metric: "Clarté perçue", before: "65%", after: "89%", change: "+24pts" }
      ],
      qualitative: [
        "\"Le parcours est beaucoup plus clair maintenant\" - Utilisateur test",
        "Validation positive de l'équipe conformité",
        "Retours positifs des équipes support client"
      ],
      learnings: [
        "Le progressive disclosure est essentiel pour les formulaires complexes",
        "Les micro-interactions rassurent l'utilisateur sur sa progression",
        "Tester tôt et souvent avec de vrais utilisateurs"
      ]
    },
    summary: [
      "Problème : Taux d'abandon élevé sur le parcours de souscription",
      "Action : Simplification et clarification du parcours via UX research et tests",
      "Impact : -26pts d'abandon, -50% temps de complétion"
    ]
  },

  "ene-plateforme-educative": {
    title: "ENE - Espace Numérique Éducatif",
    subtitle: "Plateforme éducative numérique pour les collèges",
    heroImage: eneHero,
    challengeBusiness: "Créer une plateforme unifiée pour connecter élèves, parents et enseignants autour des services éducatifs départementaux.",
    client: "JUNVA SAS",
    sector: "Éducation",
    audienceCible: "Élèves, parents et enseignants de collèges",
    statCle: "Plateforme multi-départements",
    role: "UX/UI Designer",
    duration: "4 mois",
    year: "2023",
    tools: toolLogos.ene,
    gallery: [],
    context: "Les départements souhaitaient proposer un espace numérique unifié pour accéder aux services éducatifs : emplois du temps, notes, communication, ressources pédagogiques.",
    objectives: [
      { text: "Centraliser les services éducatifs", metric: "1 plateforme" },
      { text: "Améliorer l'adoption parents", metric: "+60%" },
      { text: "Réduire les demandes support", metric: "-40%" }
    ],
    team: [
      "1 Chef de projet",
      "1 UX/UI Designer",
      "2 Développeurs",
      "1 Intégrateur"
    ],
    collaboration: "Méthodologie centrée utilisateur avec des ateliers de co-conception impliquant représentants d'élèves, parents d'élèves et enseignants.",
    process: [
      {
        step: "01",
        title: "Recherche utilisateur",
        summary: "Compréhension des besoins des différents profils.",
        activities: [
          "Création de personas (élève, parent, enseignant)",
          "Entretiens avec les parties prenantes",
          "Analyse des solutions existantes"
        ],
        deliverables: "3 personas détaillés, carte des besoins"
      },
      {
        step: "02",
        title: "Architecture & Wireframes",
        summary: "Structuration de l'information et navigation.",
        activities: [
          "Architecture de l'information",
          "Wireframes des écrans clés",
          "Tests de navigation"
        ],
        deliverables: "Arborescence, wireframes validés"
      },
      {
        step: "03",
        title: "Design UI",
        summary: "Conception visuelle accessible et inclusive.",
        activities: [
          "Charte graphique adaptée",
          "Composants UI accessibles",
          "Maquettes responsive"
        ],
        deliverables: "UI Kit, maquettes finales"
      },
      {
        step: "04",
        title: "Tests & Livraison",
        summary: "Validation et documentation.",
        activities: [
          "Tests avec élèves et parents",
          "Corrections d'accessibilité",
          "Documentation technique"
        ],
        deliverables: "Plateforme validée, documentation"
      }
    ],
    results: {
      quantitative: [
        { metric: "Adoption parents", before: "35%", after: "78%", change: "+43pts" },
        { metric: "Satisfaction utilisateur", before: "58%", after: "84%", change: "+26pts" },
        { metric: "Tickets support", before: "200/mois", after: "80/mois", change: "-60%" }
      ],
      qualitative: [
        "\"Enfin une interface intuitive pour suivre la scolarité\" - Parent d'élève",
        "Forte adoption par les établissements pilotes",
        "Accessibilité RGAA niveau AA atteinte"
      ],
      learnings: [
        "Concevoir pour l'accessibilité bénéficie à tous les utilisateurs",
        "Les personas contrastés aident à prioriser les fonctionnalités",
        "La simplicité est clé pour des utilisateurs aux niveaux de maturité digitale variés"
      ]
    },
    summary: [
      "Problème : Services éducatifs fragmentés et difficiles d'accès",
      "Action : Plateforme unifiée conçue avec les utilisateurs finaux",
      "Impact : +43pts adoption parents, -60% demandes support"
    ]
  },

  "pollux-voxaly": {
    title: "POLLUX - Vote Électronique",
    subtitle: "Refonte de la plateforme de vote électronique professionnel",
    heroImage: polluxVoxalyHero,
    challengeBusiness: "Moderniser et sécuriser l'expérience de vote électronique pour les élections professionnelles d'entreprise.",
    client: "Docaposte / Voxaly",
    sector: "Services / Vote électronique",
    audienceCible: "Salariés votants et administrateurs RH",
    statCle: "Leader français du vote électronique",
    role: "UX/UI Designer",
    duration: "5 mois",
    year: "2023",
    tools: toolLogos.voxaly,
    gallery: [],
    context: "La plateforme de vote existante était perçue comme austère et peu intuitive. L'objectif était de moderniser l'expérience tout en renforçant la confiance et la sécurité perçue.",
    objectives: [
      { text: "Améliorer le taux de participation", metric: "+15%" },
      { text: "Réduire les erreurs de vote", metric: "-80%" },
      { text: "Augmenter la confiance perçue", metric: "+30pts" }
    ],
    team: [
      "1 Product Owner",
      "1 UX/UI Designer",
      "2 Développeurs",
      "1 Expert sécurité"
    ],
    collaboration: "Travail en collaboration étroite avec les équipes sécurité et conformité. Ateliers avec des DRH et représentants syndicaux.",
    process: [
      {
        step: "01",
        title: "Audit & Benchmark",
        summary: "Analyse de l'existant et des meilleures pratiques.",
        activities: [
          "Audit UX de la plateforme actuelle",
          "Benchmark solutions de vote",
          "Analyse des retours utilisateurs"
        ],
        deliverables: "Rapport d'audit, recommandations"
      },
      {
        step: "02",
        title: "Ateliers d'idéation",
        summary: "Co-conception avec les parties prenantes.",
        activities: [
          "Ateliers avec administrateurs RH",
          "Parcours de vote simplifié",
          "Conception des étapes clés"
        ],
        deliverables: "Userflow validé, wireframes"
      },
      {
        step: "03",
        title: "Design & Prototypage",
        summary: "Conception visuelle inspirant confiance.",
        activities: [
          "Design épuré et institutionnel",
          "Micro-interactions de confirmation",
          "Accessibilité renforcée"
        ],
        deliverables: "Prototype interactif, UI Kit"
      },
      {
        step: "04",
        title: "Tests & Validation",
        summary: "Validation sécurité et utilisabilité.",
        activities: [
          "Tests utilisateurs",
          "Audit accessibilité",
          "Validation sécurité"
        ],
        deliverables: "Maquettes finales certifiées"
      }
    ],
    results: {
      quantitative: [
        { metric: "Taux participation", before: "62%", after: "78%", change: "+16pts" },
        { metric: "Erreurs de vote", before: "5%", after: "0.8%", change: "-84%" },
        { metric: "Confiance perçue", before: "68%", after: "91%", change: "+23pts" }
      ],
      qualitative: [
        "\"Le nouveau parcours est rassurant et professionnel\" - DRH",
        "Certification sécurité obtenue",
        "Accessibilité RGAA niveau AA"
      ],
      learnings: [
        "La confiance se construit par la clarté et la transparence",
        "Les micro-interactions de confirmation réduisent l'anxiété",
        "L'accessibilité est cruciale pour garantir l'égalité de participation"
      ]
    },
    summary: [
      "Problème : Plateforme de vote perçue comme austère et peu fiable",
      "Action : Refonte UX/UI axée sur la confiance et la simplicité",
      "Impact : +16pts participation, -84% erreurs, +23pts confiance"
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

          {/* GALERIE VISUELS PROJET */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SectionTitle title="Aperçu du projet" />
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {project.gallery.map((image: { src: string; alt: string; caption: string }, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-250"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {image.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-sm text-text-tertiary mt-4 italic">
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
            <div className="space-y-16">
              {project.process.map((step: any, index: number) => (
                <div key={step.step} className="relative">
                  {/* Timeline connector */}
                  {index < project.process.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary to-border hidden md:block" />
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* Left: Content */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-text-secondary mb-4">{step.summary}</p>
                      
                      <div className="bg-card rounded-lg p-5 space-y-4 border border-border/50">
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
                    
                    {/* Right: Image placeholder */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      {step.image ? (
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
                            <p className="mt-3 text-sm text-text-tertiary text-center italic">
                              {step.imageCaption}
                            </p>
                          )}
                        </motion.div>
                      ) : (
                        <div className="w-full aspect-[4/3] rounded-xl bg-card border-2 border-dashed border-border flex items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                              <span className="text-2xl">🖼️</span>
                            </div>
                            <p className="text-sm text-text-tertiary">
                              Emplacement visuel
                            </p>
                            <p className="text-xs text-text-tertiary mt-1">
                              Écran, photo, schéma...
                            </p>
                          </div>
                        </div>
                      )}
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

            {/* Before/After Visual Comparison */}
            {project.beforeAfterImages && (
              <div className="mb-12">
                <h4 className="font-semibold text-foreground mb-6 text-center">Comparaison avant / après</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500/90 text-white text-sm font-medium rounded-full">
                      Avant
                    </div>
                    <img
                      src={project.beforeAfterImages.before.src}
                      alt={project.beforeAfterImages.before.alt}
                      className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-red-200 shadow-soft"
                    />
                    <p className="mt-2 text-sm text-text-tertiary text-center">
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
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full">
                      Après
                    </div>
                    <img
                      src={project.beforeAfterImages.after.src}
                      alt={project.beforeAfterImages.after.alt}
                      className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-green-200 shadow-soft"
                    />
                    <p className="mt-2 text-sm text-text-tertiary text-center">
                      {project.beforeAfterImages.after.caption}
                    </p>
                  </motion.div>
                </div>
              </div>
            )}
            
            {/* Quantitative */}
            <div className="mb-10">
              <h4 className="font-semibold text-foreground mb-4">Résultats quantitatifs</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {project.results.quantitative.map((result: any, i: number) => (
                  <div key={i} className="bg-card rounded-xl p-6 text-center border border-border/50 hover:border-primary/30 transition-colors duration-250">
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
