// =========================================================
// FICHIER CENTRALISÉ DES PROJETS
// =========================================================
// Pour modifier un projet, éditez directement les données ci-dessous.
// Les changements seront automatiquement répercutés sur toutes les pages.
// =========================================================

// Import des images des projets
import bnpOmnicanaliteHero from "@/assets/projects/bnp-omnicanalite-siclid.png";
import bnpOmnicanaliteDiscovery from "@/assets/projects/bnp-omnicanalite-old-siclid.png";
import bnpOmnicanaliteConception from "@/assets/projects/bnp-omnicanalite-conception.png";
import bnpOmnicanaliteTest from "@/assets/projects/bnp-omnicanalite-test.png";
import bnpOmnicanaliteDelivery from "@/assets/projects/bnp-omnicanalite-delivery.png";
import bnpSouscriptionHero from "@/assets/projects/bnp-souscription-hero.png";
import eneHero from "@/assets/projects/ene-hero.jpg";
import polluxVoxalyHero from "@/assets/projects/pollux-voxaly-hero.jpg";

// =========================================================
// TYPES
// =========================================================

export interface Tool {
  name: string;
  logo: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  activities: string[];
  deliverables: string;
  image?: string;
  imageCaption?: string;
}

export interface Objective {
  text: string;
  metric: string;
}

export interface QuantitativeResult {
  metric: string;
  before: string;
  after: string;
  change: string;
}

export interface ProjectResults {
  quantitative: QuantitativeResult[];
  qualitative: string[];
  learnings: string[];
}

export interface BeforeAfterImage {
  src: string;
  alt: string;
  caption: string;
}

export interface BeforeAfterImages {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
}

export interface ProjectData {
  // Identifiant (utilisé dans l'URL)
  id: string;

  // Infos de base (affichées sur les cards)
  title: string;
  subtitle: string;
  client: string;
  sector: string;
  description: string;
  roles: string[];
  heroImage: string;

  // Mise en avant
  isFeatured?: boolean;

  // Détails projet
  challengeBusiness: string;
  audienceCible: string;
  statCle: string;
  role: string;
  duration: string;
  year: string;
  tools: Tool[];
  gallery: string[];
  context: string;
  objectives: Objective[];
  team: string[];
  collaboration: string;
  process: ProcessStep[];
  results: ProjectResults;
  beforeAfterImages?: BeforeAfterImages;
  summary: string[];
}

// =========================================================
// LOGOS DES OUTILS
// =========================================================

export const toolLogos = {
  figma: { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  miro: { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
  maze: { name: "Maze", logo: "https://asset.brandfetch.io/idvpELmzNc/idpWT7XIDK.svg" },
  jira: { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  notion: { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
  teams: {
    name: "Teams",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg",
  },
};

// =========================================================
// DONNÉES DES PROJETS
// =========================================================

export const projectsData: ProjectData[] = [
  // ---------------------------------------------------------
  // PROJET 1 : BNP Omnicanalité B2C
  // ---------------------------------------------------------
  {
    id: "bnp-omnicanalite-b2c",
    title: "Omnicanalité B2C",
    subtitle: "Interface vendeur omnicanale pour les conseillers crédit Cetelem",
    client: "BNP Paribas Personal Finance",
    sector: "Banque",
    description: "Conception d'une interface vendeur omnicanale pour les conseillers crédit Cetelem.",
    roles: ["Ux Discovery", "Delivery", "Cadrage"],
    heroImage: bnpOmnicanaliteHero,
    isFeatured: true,
    challengeBusiness:
      "Unifier l'expérience vendeur sur tous les canaux pour améliorer l'efficacité commerciale et la satisfaction client.",
    audienceCible: "Conseillers crédit en télévente",
    statCle: "Leader européen du crédit · Cetelem",
    role: "Product Designer",
    duration: "2 ans",
    year: "Janvier 2024 à Décembre 2025",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.maze, toolLogos.jira],
    gallery: [],
    context:
      "Les conseillers crédit Cetelem utilisaient plusieurs outils non connectés pour gérer les dossiers clients, créant des frictions et des erreurs de saisie. L'objectif était de créer une interface unifiée omnicanale.",
    objectives: [
      { text: "Réduire le temps de traitement dossier", metric: "-40%" },
      { text: "Améliorer la satisfaction conseiller", metric: "NPS +20pts" },
      { text: "Unifier les canaux de vente", metric: "1 outil centralisant tout les besoins" },
    ],
    team: ["1 Product Owner", "1 Product Designer", "3 Développeurs front-end", "1 Lead Tech"],
    collaboration:
      "Travail en squad agile avec des sprints de 2 semaines. Collaboration étroite avec les équipes métier crédit et les conseillers terrain.",
    process: [
      {
        step: "01",
        title: "Discovery & Research",
        summary: "Compréhension du contexte métier et des pain points des conseillers.",
        activities: [
          "Observation terrain avec des conseiller en télévente",
          "Entretiens avec 4 conseillers crédit",
          "Analyse des outils existants",
          "Mapping des parcours vendeur actuels",
        ],
        deliverables: "Personas conseillers, User-Flow, liste des pain points priorisés",
        image: bnpOmnicanaliteDiscovery,
        imageCaption: "Logiciel existant avant la refonte",
      },
      {
        step: "02",
        title: "Conception & Idéation",
        summary: "Co-conception de la solution avec les équipes métier.",
        activities: [
          "Ateliers d'idéation avec les conseillers",
          "Conception des wireframes",
          "Définition d'u nouveau design system dédié aux outils collaborateurs",
          "Prototypage interactif",
        ],
        deliverables: "Wireframes validés, prototype Figma, composants design system",
        image: bnpOmnicanaliteConception,
        imageCaption: "Interface de simulation et de comparateurs",
      },
      {
        step: "03",
        title: "Tests & Validation",
        summary: "Validation de la solution avec des utilisateurs réels.",
        activities: [
          "Tests utilisateurs sur MVP développé",
          "Itérations sur les retours",
          "Validation métier et conformité",
        ],
        deliverables: "Maquettes finales, documentation UX",
        image: bnpOmnicanaliteTest,
        imageCaption: "Formulaires de souscription testés avec les utilisateurs",
      },
      {
        step: "04",
        title: "Delivery & Suivi",
        summary: "Accompagnement des équipes de développement.",
        activities: ["Handover développeurs", "Support pendant l'implémentation", "Recette design"],
        deliverables: "Specs techniques, design tokens",
        image: bnpOmnicanaliteDelivery,
        imageCaption: "Comparaison avant/après de l'interface",
      },
    ],
    results: {
      quantitative: [
        { metric: "Temps traitement", before: "25 min", after: "15 min", change: "-40%" },
        { metric: "Erreurs de saisie", before: "12%", after: "4%", change: "-67%" },
        { metric: "Satisfaction conseiller", before: "+18", after: "+42", change: "+24pts" },
      ],
      qualitative: [
        '"Enfin un outil qui correspond à notre façon de travailler" - Conseiller Cetelem',
        "Adoption rapide par les équipes terrain",
        "Les nouveaux conseillés sont plus rapidment autonomes sur l'outils",
      ],
      learnings: [
        "L'importance de l'observation terrain pour comprendre les vrais besoins",
        "La co-conception avec les utilisateurs finaux garantit l'adoption",
        "Un design system robuste accélère les développements futurs",
      ],
    },
    summary: [
      "Problème : Outils fragmentés causant inefficacité et frustration",
      "Action : Interface omnicanale unifiée co-conçue avec les conseillers",
      "Impact : -40% temps de traitement, +24pts satisfaction",
    ],
  },

  // ---------------------------------------------------------
  // PROJET 2 : BNP Souscription
  // ---------------------------------------------------------
  {
    id: "bnp-souscription",
    title: "Parcours Souscription",
    subtitle: "Refonte du parcours de souscription crédit en ligne Cetelem",
    client: "BNP Paribas Personal Finance",
    sector: "Banque",
    description: "Refonte complète du parcours de souscription crédit en ligne pour augmenter la conversion.",
    roles: ["UX Research", "Product Design", "Tests utilisateurs"],
    heroImage: bnpSouscriptionHero,
    isFeatured: true,
    challengeBusiness:
      "Réduire le taux d'abandon sur le parcours de souscription crédit tout en respectant les contraintes réglementaires bancaires.",
    audienceCible: "Particuliers 25-55 ans",
    statCle: "Leader européen du crédit · Cetelem",
    role: "Product Designer",
    duration: "2 ans",
    year: "De janvier 2024 à Décembre 2025",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.maze, toolLogos.jira],
    gallery: [],
    context:
      "Le parcours de souscription crédit existant affichait un taux d'abandon élevé. Les utilisateurs se plaignaient de la complexité des formulaires et du manque de visibilité sur l'avancement.",
    objectives: [
      { text: "Réduire le taux d'abandon", metric: "-30%" },
      { text: "Améliorer le taux de conversion", metric: "+25%" },
      { text: "Réduire le temps de complétion", metric: "-50%" },
    ],
    team: [
      "1 Product Owner",
      "1 Product Designers",
      "2 Développeurs front-end",
      "1 Data Analyst",
      "1 Lead Design System",
    ],
    collaboration:
      "Méthodologie Lean UX avec des cycles de découverte et livraison en continu. Tests utilisateurs réguliers via UserTesting.",
    process: [
      {
        step: "01",
        title: "Research & Analyse",
        summary: "Analyse approfondie des données et comportements utilisateurs.",
        activities: [
          "Analyse des données analytics (funnel, heatmaps)",
          "Entretiens utilisateurs",
          "Audit UX du parcours existant",
          "Benchmark concurrentiel",
        ],
        deliverables: "Rapport de recherche, Audit UI/UX, parcours utilisateur",
      },
      {
        step: "02",
        title: "Ateliers & Idéation",
        summary: "Co-conception avec les stakeholders.",
        activities: ["Atelier Crazy 8", "Priorisation des solutions", "Wireframes collaboratifs"],
        deliverables: "Concepts validés, userflow cible",
      },
      {
        step: "03",
        title: "Prototypage & UI",
        summary: "Conception des interfaces haute fidélité.",
        activities: [
          "Design UI mobile first avec déclinaison desktop",
          "Prototypage interactif Figma",
          "Micro-interactions",
        ],
        deliverables: "Prototype interactif, Nouveaux composants Design System",
      },
      {
        step: "04",
        title: "Tests utilisateurs",
        summary: "Validation via tests modérés et non-modérés.",
        activities: ["Tests Maze (quantitatif)", "Tests modérés (qualitatif)", "Itérations"],
        deliverables: "Rapport de tests, maquettes finales",
      },
      {
        step: "05",
        title: "Handover",
        summary: "Transmission aux équipes de développement.",
        activities: ["Documentation Figma", "Specs développeurs", "QA design"],
        deliverables: "Documentation complète, composants prêts",
      },
    ],
    results: {
      quantitative: [
        { metric: "Taux d'abandon", before: "68%", after: "42%", change: "-26pts" },
        { metric: "Temps complétion", before: "12 min", after: "6 min", change: "-50%" },
        { metric: "Clarté perçue", before: "65%", after: "89%", change: "+24pts" },
      ],
      qualitative: [
        '"Le parcours est beaucoup plus clair maintenant" - Utilisateur test',
        "Validation positive de l'équipe conformité",
        "Retours positifs des équipes support client",
      ],
      learnings: [
        "Faire apparaître les champs progressivement est clé pour que les formulaires complexes restent faciles à comprendre et à remplir",
        "Les micro-interactions rassurent l'utilisateur sur sa progression",
        "Tester tôt et souvent avec de vrais utilisateurs",
      ],
    },
    summary: [
      "Problème : Taux d'abandon élevé sur le parcours de souscription",
      "Action : Simplification et clarification du parcours via UX research et tests",
      "Impact : -26pts d'abandon, -50% temps de complétion",
    ],
  },

  // ---------------------------------------------------------
  // PROJET 3 : ENE - Espace Numérique Éducatif
  // ---------------------------------------------------------
  {
    id: "ene-plateforme-educative",
    title: "ENE - Espace Numérique Éducatif",
    subtitle: "Plateforme éducative numérique pour les collèges",
    client: "Ministère de l'Education nationale",
    sector: "Éducation",
    description: "Conception d'une plateforme éducative numérique pour les collèges et départements.",
    roles: ["UX Design", "UI Design", "Ux researcher"],
    heroImage: eneHero,
    isFeatured: true,
    challengeBusiness:
      "Créer une plateforme unifiée pour connecter élèves, parents et enseignants autour des services éducatifs départementaux.",
    audienceCible: "Élèves, parents et enseignants de collèges",
    statCle: "Plateforme multi-départements",
    role: "UX/UI Designer",
    duration: "4 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.notion, toolLogos.miro],
    gallery: [],
    context:
      "L'état souhaite proposer un espace numérique unifié pour accéder aux services éducatifs : emplois du temps, notes, communication, ressources pédagogiques.",
    objectives: [
      { text: "Centraliser les services éducatifs", metric: "1 plateforme" },
      { text: "Améliorer l'adoption parents", metric: "+60%" },
      { text: "Adoption de la solution", metric: "12 départments intéréssés lors de l'appel d'offre" },
    ],
    team: ["1 Chef de projet", "1 UX/UI Designer", "2 Développeurs", "1 Intégrateur"],
    collaboration:
      "Méthodologie centrée utilisateur avec des ateliers de co-conception impliquant représentants d'élèves, parents d'élèves et enseignants.",
    process: [
      {
        step: "01",
        title: "Recherche utilisateur",
        summary: "Compréhension des besoins des différents profils.",
        activities: [
          "Création de personas (élève, parent, enseignant)",
          "Entretiens avec les parties prenantes",
          "Analyse des solutions existantes",
        ],
        deliverables: "4 personas détaillés, carte des besoins",
      },
      {
        step: "02",
        title: "Architecture & Wireframes",
        summary: "Structuration de l'information et navigation.",
        activities: ["Architecture de l'information", "Wireframes des écrans clés", "Tests de navigation"],
        deliverables: "Arborescence, wireframes validés",
      },
      {
        step: "03",
        title: "Design UI",
        summary: "Conception visuelle accessible et inclusive.",
        activities: ["Charte graphique adaptée", "Composants UI accessibles", "Maquettes responsive"],
        deliverables: "UI Kit, maquettes finales",
      },
      {
        step: "04",
        title: "Tests & Livraison",
        summary: "Validation et documentation.",
        activities: ["Tests avec élèves et parents", "Corrections d'accessibilité", "Documentation technique"],
        deliverables: "Plateforme validée, documentation",
      },
    ],
    results: {
      quantitative: [
        { metric: "Adoption parents", before: "35%", after: "78%", change: "+43pts" },
        { metric: "Satisfaction utilisateur", before: "58%", after: "84%", change: "+26pts" },
        { metric: "Tickets support", before: "200/mois", after: "80/mois", change: "-60%" },
      ],
      qualitative: [
        '"Enfin une interface intuitive pour suivre la scolarité" - Parent d\'élève',
        "Forte adoption par les établissements pilotes",
        "Accessibilité RGAA niveau AA atteinte",
      ],
      learnings: [
        "Concevoir pour l'accessibilité bénéficie à tous les utilisateurs",
        "Les personas contrastés aident à prioriser les fonctionnalités",
        "La simplicité est clé pour des utilisateurs aux niveaux de maturité digitale variés",
      ],
    },
    summary: [
      "Problème : Services éducatifs fragmentés et difficiles d'accès",
      "Action : Plateforme unifiée conçue avec les utilisateurs finaux",
      "Impact : +43pts adoption parents, -60% demandes support",
    ],
  },

  // ---------------------------------------------------------
  // PROJET 4 : POLLUX - Vote Électronique
  // ---------------------------------------------------------
  {
    id: "pollux-voxaly",
    title: "Voxaly - Vote Électronique",
    subtitle: "Refonte d'une plateforme d'Élections electronique CSE",
    client: "Docaposte / Voxaly",
    sector: "Services",
    description: "Refonte de l'expérience de vote électronique professionnel pour les élections d'entreprise.",
    roles: ["UX Research", "UI Design", "Animation d'ateliers"],
    heroImage: polluxVoxalyHero,
    challengeBusiness:
      "Moderniser et sécuriser l'expérience de vote électronique pour les élections professionnelles d'entreprise.",
    audienceCible: "Salariés votants et administrateurs RH",
    statCle: "Leader français du vote électronique",
    role: "UX/UI Designer",
    duration: "5 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.teams],
    gallery: [],
    context:
      "La plateforme de vote existante était perçue comme austère et peu intuitive. L'objectif était de moderniser l'expérience tout en renforçant la confiance et la sécurité perçue.",
    objectives: [
      { text: "Améliorer le taux de participation", metric: "+15%" },
      { text: "Réduire les erreurs de vote", metric: "-80%" },
      { text: "Augmenter la confiance perçue", metric: "+30pts" },
    ],
    team: ["1 Product Owner", "1 UX/UI Designer", "2 Développeurs", "1 Expert sécurité"],
    collaboration:
      "Travail en collaboration étroite avec les équipes sécurité et conformité. Ateliers avec des DRH et représentants syndicaux.",
    process: [
      {
        step: "01",
        title: "Audit & Benchmark",
        summary: "Analyse de l'existant et des meilleures pratiques.",
        activities: [
          "Audit UX de la plateforme actuelle",
          "Benchmark solutions de vote",
          "Analyse des retours utilisateurs",
        ],
        deliverables: "Rapport d'audit, recommandations",
      },
      {
        step: "02",
        title: "Ateliers d'idéation",
        summary: "Co-conception avec les parties prenantes.",
        activities: ["Ateliers avec administrateurs RH", "Parcours de vote simplifié", "Conception des étapes clés"],
        deliverables: "Userflow validé, wireframes",
      },
      {
        step: "03",
        title: "Design & Prototypage",
        summary: "Conception visuelle inspirant confiance.",
        activities: ["Design épuré et institutionnel", "Micro-interactions de confirmation", "Accessibilité renforcée"],
        deliverables: "Prototype interactif, UI Kit",
      },
      {
        step: "04",
        title: "Tests & Validation",
        summary: "Validation sécurité et utilisabilité.",
        activities: ["Tests utilisateurs", "Audit accessibilité", "Validation sécurité"],
        deliverables: "Maquettes finales certifiées",
      },
    ],
    results: {
      quantitative: [
        { metric: "Taux d'accéssibilité", before: "32%", after: "92%", change: "+60pts" },
        { metric: "Utilisateurs ayant besoin d'aide'", before: "5%", after: "0.8%", change: "-84%" },
        { metric: "Confiance perçue", before: "68%", after: "91%", change: "+23pts" },
      ],
      qualitative: [
        '"Le nouveau parcours est rassurant et professionnel" - DRH',
        "Certification sécurité obtenue",
        "Accessibilité RGAA niveau AAA",
      ],
      learnings: [
        "La confiance se construit par la clarté et la transparence",
        "Les micro-interactions de confirmation réduisent l'anxiété",
        "L'accessibilité est cruciale pour garantir l'égalité de participation",
      ],
    },
    summary: [
      "Problème : Plateforme de vote perçue comme austère et peu fiable",
      "Action : Refonte UX/UI axée sur la confiance et la simplicité",
      "Impact : +16pts d'accéssibilité, -84% SAV, +23pts confiance",
    ],
  },
];

// =========================================================
// FONCTIONS UTILITAIRES
// =========================================================

/**
 * Récupère un projet par son ID
 */
export function getProjectById(id: string): ProjectData | undefined {
  return projectsData.find((project) => project.id === id);
}

/**
 * Récupère tous les projets pour les cards (données simplifiées)
 */
export function getAllProjectsForCards() {
  return projectsData.map(({ id, title, client, sector, description, roles, heroImage }) => ({
    id,
    title,
    client,
    sector,
    description,
    roles,
    image: heroImage,
  }));
}

/**
 * Récupère les projets par secteur
 */
export function getProjectsBySector(sector: string) {
  if (sector === "Tous") return getAllProjectsForCards();
  return getAllProjectsForCards().filter((p) => p.sector === sector);
}

/**
 * Récupère tous les secteurs uniques
 */
export function getAllSectors(): string[] {
  const sectors = [...new Set(projectsData.map((p) => p.sector))];
  return ["Tous", ...sectors];
}

/**
 * Récupère les projets mis en avant (featured)
 */
export function getFeaturedProjects() {
  return projectsData
    .filter((p) => p.isFeatured)
    .map(({ id, title, client, sector, description, roles, heroImage }) => ({
      id,
      title,
      client,
      sector,
      description,
      roles,
      image: heroImage,
    }));
}
