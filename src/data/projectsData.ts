// =========================================================
// FICHIER CENTRALISÉ DES PROJETS
// =========================================================
// Pour modifier un projet, éditez directement les données ci-dessous.
// Les changements seront automatiquement répercutés sur toutes les pages.
// =========================================================

// Import des images des projets
import bnpOmnicanaliteHero from "@/assets/projects/bnp-omnicanalite-siclid.png";
import bnpOmnicanaliteDiscovery from "@/assets/projects/bnp-omnicanalite-old-siclid.png";
import bnpOmnicanaliteConception from "@/assets/projects/bnp-omnicanalite-desktop.png";
import bnpOmnicanaliteTest from "@/assets/projects/bnp-omnicanalite-test.png";
import bnpOmnicanaliteDelivery from "@/assets/projects/bnp-omnicanalite-delivery.png";
import bnpSouscriptionHero from "@/assets/projects/bnp-souscription-hero.png";
import eneHero from "@/assets/projects/ene-hero.png";
import polluxVoxalyHero from "@/assets/projects/pollux-voxaly-hero.png";
import gbsHero from "@/assets/projects/gbs-hero.png";
import grandEstHero from "@/assets/projects/grand-est-hero.png";
import docalflexHero from "@/assets/projects/docalflex-hero.png";

// Import des logos d'outils
import usertestingLogo from "@/assets/tools/usertesting-logo.svg";

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

// Structure MCAR narrative
export interface MCARContent {
  // MISSION : Synthèse du contexte et de l'objectif de la mission
  mission: string;
  // CONSTAT : Problématique rencontrée ou freins identifiés
  constat: string;
  // ACTION : Actions mises en place (méthodologie, livrables, leviers)
  action: string;
  // RÉSULTAT : Résumé synthétique de l'impact (les détails restent dans results)
  resultat: string;
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

  // Détails projet (meta)
  role: string;
  duration: string;
  year: string;
  tools: Tool[];
  team: string[];

  // MCAR - Structure narrative principale
  mcar: MCARContent;

  // Process détaillé (gardé pour la section dédiée)
  process: ProcessStep[];

  // Résultats détaillés
  results: ProjectResults;

  // Optionnels
  gallery: string[];
  beforeAfterImages?: BeforeAfterImages;

  // Legacy fields (conservés pour compatibilité)
  challengeBusiness?: string;
  audienceCible?: string;
  statCle?: string;
  context?: string;
  objectives?: { text: string; metric: string }[];
  collaboration?: string;
  summary?: string[];
}

// =========================================================
// LOGOS DES OUTILS
// =========================================================

export const toolLogos = {
  figma: { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  miro: { name: "Miro", logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png" },
  userTesting: { name: "User Testing", logo: usertestingLogo },
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
    role: "Product Designer",
    duration: "2 ans",
    year: "Janvier 2024 à Décembre 2025",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.userTesting, toolLogos.jira],
    team: ["1 Product Owner", "1 Product Designer", "3 Développeurs front-end", "1 Lead Tech"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "En tant que Product Designer au sein de l'équipe digitale Cetelem (BNP Paribas Personal Finance), j'ai été mandaté pour repenser l'outil utilisé par les conseillers crédit en télévente. Ma mission sur 2 ans : concevoir une interface vendeur omnicanale capable d'unifier les différents canaux de vente et d'améliorer significativement l'efficacité commerciale.",

      constat: "Les conseillers crédit jonglaient quotidiennement entre plusieurs outils non connectés pour gérer les dossiers clients. Cette fragmentation générait des frictions majeures : erreurs de saisie fréquentes (12%), temps de traitement allongé, et une frustration palpable des équipes terrain. L'absence de vision unifiée du parcours client nuisait directement à la qualité du service et à la satisfaction des conseillers (NPS à +18).",

      action: "J'ai déployé une approche centrée utilisateur en plusieurs phases. En discovery, j'ai mené des observations terrain avec les conseillers en télévente et réalisé des entretiens approfondis pour cartographier les parcours existants et identifier les pain points prioritaires. En conception, j'ai animé des ateliers d'idéation avec les équipes métier, créé un design system dédié aux outils collaborateurs, et conçu une interface entièrement optimisée pour une navigation clavier. Chaque itération a été validée par des tests utilisateurs sur MVP avant le développement final.",

      resultat: "La nouvelle interface a transformé le quotidien des conseillers : réduction de 40% du temps de traitement dossier, chute de 67% des erreurs de saisie, et un bond du NPS conseiller de +18 à +42. L'adoption a été immédiate, les nouveaux arrivants étant désormais opérationnels bien plus rapidement."
    },

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
          "Définition d'un nouveau design system dédié aux outils collaborateurs",
          "Prototypage interactif",
        ],
        deliverables: "Wireframes validés, prototype Figma, composants design system",
        image: bnpOmnicanaliteConception,
        imageCaption: "Vue de l'outil sur desktop, navigation entièrement pensée pour une utilisation au clavier",
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
        "Adoption rapide par les équipes terrain dès la première semaine",
        "Formation des nouveaux arrivants significativement accélérée",
      ],
      learnings: [
        "L'observation terrain est indispensable pour comprendre les vrais besoins au-delà du déclaratif",
        "La co-conception avec les utilisateurs finaux est la meilleure garantie d'adoption",
        "Un design system robuste accélère considérablement les développements futurs",
      ],
    },
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
    role: "Product Designer",
    duration: "2 ans",
    year: "Janvier 2024 à Décembre 2025",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.userTesting, toolLogos.jira],
    team: ["1 Product Owner", "1 Product Designer", "2 Développeurs front-end", "1 Data Analyst", "1 Lead Design System"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "Intégré à l'équipe produit Cetelem, j'ai été chargé de repenser intégralement le parcours de souscription crédit en ligne. L'enjeu : réduire drastiquement le taux d'abandon tout en respectant les contraintes réglementaires strictes du secteur bancaire. Une mission de 2 ans mêlant UX research, conception et tests utilisateurs continus.",

      constat: "Le parcours existant affichait un taux d'abandon alarmant de 68%. Les utilisateurs décrochaient face à des formulaires perçus comme complexes et interminables, sans visibilité sur leur progression. L'analyse des données analytics et les retours utilisateurs révélaient une confusion généralisée, alimentée par un vocabulaire technique et des étapes mal séquencées.",

      action: "J'ai adopté une méthodologie Lean UX avec des cycles de découverte et livraison en continu. En phase research, j'ai analysé les données du funnel, mené des entretiens utilisateurs et réalisé un audit UX complet du parcours existant. La conception s'est appuyée sur des ateliers d'idéation (Crazy 8), une approche mobile-first, et des micro-interactions rassurantes pour guider la progression. Chaque évolution a été validée via des tests modérés et non-modérés sur UserTesting.",

      resultat: "Le nouveau parcours a démontré son efficacité : le taux d'abandon a chuté de 68% à 42% (-26pts), le temps de complétion a été divisé par deux, et la clarté perçue est passée de 65% à 89%. L'équipe conformité a validé la solution sans réserve."
    },

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
        activities: ["Tests User Testing (quantitatif)", "Tests modérés (qualitatif)", "Itérations"],
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
        "Validation positive de l'équipe conformité dès la première revue",
        "Réduction notable des appels au support client",
      ],
      learnings: [
        "L'affichage progressif des champs est essentiel pour rendre les formulaires complexes accessibles",
        "Les micro-interactions rassurent l'utilisateur sur sa progression",
        "Tester tôt et régulièrement avec de vrais utilisateurs évite les erreurs coûteuses",
      ],
    },
  },

  // ---------------------------------------------------------
  // PROJET 3 : ENE - Espace Numérique Éducatif
  // ---------------------------------------------------------
  {
    id: "ene-plateforme-educative",
    title: "ENE - Espace Numérique Éducatif",
    subtitle: "Plateforme éducative numérique pour les collèges",
    client: "Ministère de l'Éducation nationale",
    sector: "Éducation",
    description: "Conception d'une plateforme éducative numérique pour les collèges et départements.",
    roles: ["UX Design", "UI Design", "UX Research"],
    heroImage: eneHero,
    isFeatured: true,
    role: "UX/UI Designer",
    duration: "4 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.notion, toolLogos.miro],
    team: ["1 Chef de projet", "1 UX/UI Designer", "2 Développeurs", "1 Intégrateur"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "Dans le cadre d'un appel d'offres pour l'Éducation nationale, j'ai conçu une plateforme unifiée permettant de connecter élèves, parents et enseignants autour des services éducatifs départementaux. L'objectif : proposer un espace numérique moderne centralisant emplois du temps, notes, communication et ressources pédagogiques.",

      constat: "Les services éducatifs numériques existants étaient fragmentés et difficiles d'accès. Les parents, souvent peu familiers avec les outils numériques, rencontraient des difficultés pour suivre la scolarité de leurs enfants. Le taux d'adoption parental stagnait à 35%, générant un volume important de sollicitations auprès des établissements.",

      action: "J'ai déployé une méthodologie centrée utilisateur impliquant les trois profils cibles. En phase recherche, j'ai créé des personas détaillés pour chaque audience (élève, parent, enseignant) et cartographié leurs besoins spécifiques. La conception a privilégié l'accessibilité (RGAA niveau AA) et la simplicité, avec des tests de navigation impliquant des utilisateurs aux niveaux de maturité digitale variés. L'interface a été pensée pour fonctionner aussi bien sur mobile que desktop.",

      resultat: "La plateforme a suscité l'intérêt de 12 départements lors de l'appel d'offres. Les tests pilotes ont montré une adoption parentale bondissant à 78% (+43pts), une satisfaction utilisateur à 84%, et une réduction de 60% des tickets support. L'accessibilité RGAA niveau AA a été validée."
    },

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
        "Forte adoption par les établissements pilotes dès le premier mois",
        "Accessibilité RGAA niveau AA certifiée",
      ],
      learnings: [
        "Concevoir pour l'accessibilité bénéficie à l'ensemble des utilisateurs",
        "Les personas contrastés permettent de prioriser efficacement les fonctionnalités",
        "La simplicité est cruciale pour des utilisateurs aux niveaux de maturité digitale variés",
      ],
    },
  },

  // ---------------------------------------------------------
  // PROJET 4 : POLLUX - Vote Électronique
  // ---------------------------------------------------------
  {
    id: "pollux-voxaly",
    title: "Voxaly - Vote Électronique",
    subtitle: "Refonte d'une plateforme d'élections électroniques CSE",
    client: "Docaposte / Voxaly",
    sector: "Services",
    description: "Refonte de l'expérience de vote électronique professionnel pour les élections d'entreprise.",
    roles: ["UX Research", "UI Design", "Animation d'ateliers"],
    heroImage: polluxVoxalyHero,
    role: "UX/UI Designer",
    duration: "5 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.teams],
    team: ["1 Product Owner", "1 UX/UI Designer", "2 Développeurs", "1 Expert sécurité"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "Voxaly, leader français du vote électronique (filiale Docaposte), m'a confié la refonte de sa plateforme d'élections professionnelles. En 5 mois, j'ai dû moderniser l'expérience de vote tout en renforçant la confiance et la sécurité perçue, deux éléments critiques pour ce type d'outil.",

      constat: "La plateforme existante était perçue comme austère et peu intuitive. Les utilisateurs exprimaient des doutes sur la fiabilité du processus, 5% d'entre eux ayant besoin d'assistance pour voter. Le taux d'accessibilité était insuffisant (32%), excluant de fait une partie des votants. La confiance perçue plafonnait à 68%.",

      action: "J'ai mené un audit UX complet et un benchmark des solutions de vote existantes. En collaboration étroite avec les équipes sécurité et conformité, j'ai animé des ateliers avec des DRH et représentants syndicaux pour co-concevoir le nouveau parcours. Le design s'est focalisé sur la transparence (chaque étape clairement expliquée), les micro-interactions de confirmation, et une accessibilité renforcée (RGAA AAA). Le prototype a été validé par des tests utilisateurs et un audit sécurité.",

      resultat: "La nouvelle plateforme a obtenu la certification sécurité et atteint le niveau RGAA AAA. Le taux d'accessibilité est passé de 32% à 92%, les demandes d'assistance ont chuté de 84%, et la confiance perçue a bondi à 91% (+23pts)."
    },

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
        { metric: "Taux d'accessibilité", before: "32%", after: "92%", change: "+60pts" },
        { metric: "Utilisateurs nécessitant aide", before: "5%", after: "0.8%", change: "-84%" },
        { metric: "Confiance perçue", before: "68%", after: "91%", change: "+23pts" },
      ],
      qualitative: [
        '"Le nouveau parcours est rassurant et professionnel" - DRH client',
        "Certification sécurité obtenue sans réserve",
        "Accessibilité RGAA niveau AAA validée",
      ],
      learnings: [
        "La confiance se construit par la clarté et la transparence à chaque étape",
        "Les micro-interactions de confirmation réduisent significativement l'anxiété",
        "L'accessibilité maximale est cruciale pour garantir l'égalité de participation",
      ],
    },
  },

  // ---------------------------------------------------------
  // PROJET 5 : ENGIE GBS - MyPortal RH
  // ---------------------------------------------------------
  {
    id: "engie-gbs-myportal",
    title: "MyPortal - Portail RH ENGIE",
    subtitle: "Point d'entrée unique pour les services RH ENGIE GBS",
    client: "ENGIE GBS",
    sector: "Énergie",
    description: "Conception d'un portail RH unifié pour digitaliser et centraliser les services RH des collaborateurs ENGIE.",
    roles: ["UX Design", "UI Design", "Cadrage"],
    heroImage: gbsHero,
    role: "Product Designer",
    duration: "6 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.jira],
    team: ["1 Product Owner", "1 Product Designer", "2 Développeurs", "1 Business Analyst"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "ENGIE GBS m'a mandaté pour concevoir MyPortal, un point d'entrée unique destiné aux 11 000 collaborateurs et 400+ clients internes. L'objectif sur 6 mois : digitaliser et centraliser l'ensemble des services RH (staffing, onboarding, paie, learning, data RH) au sein d'un portail facilitant le suivi et la traçabilité des demandes.",

      constat: "Les collaborateurs ENGIE devaient naviguer entre de multiples outils et canaux (emails, formulaires papier, applications diverses) pour leurs demandes RH. Cette fragmentation générait des délais de traitement longs (48h en moyenne), une absence de visibilité sur l'état des demandes, et une satisfaction utilisateur faible (62%). Les équipes RH étaient submergées de sollicitations par email.",

      action: "J'ai structuré le projet en phases de cadrage puis de conception. En discovery, j'ai animé des ateliers avec les parties prenantes des différentes BU ENGIE, mené des entretiens utilisateurs et cartographié les parcours existants. La conception UX s'est focalisée sur une architecture de l'information claire et un système de suivi des demandes en temps réel. L'UI a été alignée sur la charte ENGIE tout en modernisant les codes visuels. Des tests utilisateurs modérés ont permis d'itérer avant livraison.",

      resultat: "MyPortal a transformé l'expérience RH chez ENGIE GBS : temps de traitement divisé par deux (24h vs 48h), satisfaction utilisateur à 88% (+26pts), et une adoption de 78% dès les premiers mois. Les sollicitations par email ont drastiquement diminué."
    },

    process: [
      {
        step: "01",
        title: "Discovery & Cadrage",
        summary: "Compréhension des besoins des collaborateurs et des équipes RH.",
        activities: [
          "Ateliers de cadrage avec les parties prenantes",
          "Entretiens avec les utilisateurs cibles",
          "Mapping des parcours existants",
          "Analyse des points de friction",
        ],
        deliverables: "Personas, user journeys, backlog priorisé",
      },
      {
        step: "02",
        title: "Conception UX",
        summary: "Architecture de l'information et parcours utilisateur.",
        activities: [
          "Définition de l'architecture de l'information",
          "Wireframes des écrans clés",
          "Prototypage basse fidélité",
        ],
        deliverables: "Wireframes validés, arborescence",
      },
      {
        step: "03",
        title: "Design UI",
        summary: "Conception visuelle alignée sur la charte ENGIE.",
        activities: ["Design haute fidélité", "Composants design system", "Prototype interactif Figma"],
        deliverables: "Maquettes finales, UI Kit ENGIE",
      },
      {
        step: "04",
        title: "Tests & Itérations",
        summary: "Validation avec les utilisateurs finaux.",
        activities: ["Tests utilisateurs modérés", "Collecte des retours", "Itérations design"],
        deliverables: "Rapport de tests, maquettes itérées",
      },
    ],

    results: {
      quantitative: [
        { metric: "Temps traitement demandes", before: "48h", after: "24h", change: "-50%" },
        { metric: "Satisfaction utilisateur", before: "62%", after: "88%", change: "+26pts" },
        { metric: "Adoption du portail", before: "0%", after: "78%", change: "+78pts" },
      ],
      qualitative: [
        '"Enfin un outil simple pour gérer toutes mes demandes RH" - Collaborateur ENGIE',
        "Réduction significative des sollicitations par email",
        "Meilleure visibilité sur l'état des demandes en temps réel",
      ],
      learnings: [
        "Un point d'entrée unique réduit considérablement la charge cognitive",
        "La traçabilité des demandes en temps réel rassure les utilisateurs",
        "Un design cohérent avec la marque renforce l'adoption interne",
      ],
    },
  },

  // ---------------------------------------------------------
  // PROJET 6 : Génération #HDF - Carte Jeunes
  // ---------------------------------------------------------
  {
    id: "generation-hdf",
    title: "Génération #HDF - Carte Jeunes",
    subtitle: "Application de demande de carte jeunes pour la région Hauts-de-France",
    client: "Région Hauts-de-France",
    sector: "Services Publics",
    description: "Conception du parcours de demande de carte jeunes Génération #HDF pour les lycéens et étudiants.",
    roles: ["UX Research", "UI Design", "Tests utilisateurs"],
    heroImage: grandEstHero,
    role: "UX/UI Designer",
    duration: "4 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.userTesting, toolLogos.notion],
    team: ["1 Chef de projet", "1 UX/UI Designer", "2 Développeurs", "1 Chargé de communication"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "La Région Hauts-de-France (6M d'habitants) m'a sollicité pour moderniser le parcours de demande de carte jeunes Génération #HDF. L'objectif : simplifier l'accès à ce dispositif pour les 16-25 ans (lycéens, étudiants, apprentis) via une expérience mobile-first adaptée à leurs usages.",

      constat: "Le parcours existant affichait un taux de complétion de seulement 52%. Les jeunes utilisateurs, pourtant digital natives, abandonnaient face à un formulaire perçu comme trop long, mal adapté au mobile, et utilisant un vocabulaire administratif peu clair. Les erreurs de saisie atteignaient 23%, allongeant les délais de traitement.",

      action: "J'ai déployé une approche de co-conception avec le public cible. En recherche, j'ai mené des entretiens avec des lycéens et étudiants, créé des empathy maps et analysé le parcours existant. La conception s'est focalisée sur une refonte mobile-first du formulaire en étapes courtes, l'intégration de la capture photo directe, et l'adaptation du vocabulaire. Le design coloré et dynamique a été conçu pour correspondre aux codes visuels des jeunes. J'ai validé chaque itération par des tests avec 8 utilisateurs représentatifs.",

      resultat: "Le nouveau parcours a significativement amélioré les indicateurs : taux de complétion à 81% (+29pts), erreurs de saisie réduites à 8% (-65%), et temps de parcours divisé par deux. Les retours des jeunes testeurs ont été unanimement positifs sur la fluidité mobile."
    },

    process: [
      {
        step: "01",
        title: "Recherche utilisateur",
        summary: "Compréhension des attentes et freins des jeunes.",
        activities: [
          "Entretiens avec des lycéens et étudiants",
          "Empathy maps",
          "Analyse du parcours existant",
          "Benchmark applications jeunesse",
        ],
        deliverables: "Personas jeunes, carte d'empathie, points de friction",
      },
      {
        step: "02",
        title: "Conception du parcours",
        summary: "Simplification et modernisation du formulaire.",
        activities: [
          "Refonte du formulaire étape par étape",
          "Intégration de la capture photo",
          "Wireframes mobile-first",
        ],
        deliverables: "Wireframes validés, nouveau parcours simplifié",
      },
      {
        step: "03",
        title: "Design UI",
        summary: "Interface moderne et engageante pour les jeunes.",
        activities: ["Design coloré et dynamique", "Micro-interactions ludiques", "Accessibilité renforcée"],
        deliverables: "Maquettes finales, prototype interactif",
      },
      {
        step: "04",
        title: "Tests & Validation",
        summary: "Validation avec le public cible.",
        activities: [
          "Tests avec 8 utilisateurs (lycéens/étudiants)",
          "Restitution et recommandations",
          "Itérations finales",
        ],
        deliverables: "Rapport de tests, maquettes corrigées",
      },
    ],

    results: {
      quantitative: [
        { metric: "Taux de complétion", before: "52%", after: "81%", change: "+29pts" },
        { metric: "Erreurs de saisie", before: "23%", after: "8%", change: "-65%" },
        { metric: "Temps de complétion", before: "8 min", after: "4 min", change: "-50%" },
      ],
      qualitative: [
        '"C\'est beaucoup plus rapide et facile sur mobile" - Lycéen testeur',
        "Compréhension immédiate du processus après reformulation du vocabulaire",
        "La capture photo intégrée plébiscitée par les utilisateurs",
      ],
      learnings: [
        "Les jeunes attendent une expérience mobile native et fluide",
        "Le vocabulaire administratif doit être systématiquement adapté au public cible",
        "Les micro-interactions ludiques renforcent l'engagement des jeunes utilisateurs",
      ],
    },
  },

  // ---------------------------------------------------------
  // PROJET 7 : DOCALFLEX - Portail Services Généraux
  // ---------------------------------------------------------
  {
    id: "docalflex-services-generaux",
    title: "DOCALFLEX - Refonte et amélioration d'intranet",
    subtitle: "Portail de réservation avec cartographie 3D pour les espaces de travail",
    client: "Docaposte",
    sector: "Services",
    description: "Conception d'un portail de services généraux avec réservation de salles via cartographie 3D.",
    roles: ["UX Research", "UI Design", "Tests utilisateurs"],
    heroImage: docalflexHero,
    role: "UX Designer",
    duration: "5 mois",
    year: "2023",
    tools: [toolLogos.figma, toolLogos.miro, toolLogos.teams],
    team: ["1 Product Owner", "1 UX Designer", "1 UI Designer", "2 Développeurs front", "1 Développeur 3D"],
    gallery: [],

    // MCAR - Structure narrative
    mcar: {
      mission: "Dans un contexte de généralisation du flex office chez Docaposte, j'ai été mandaté pour concevoir DOCALFLEX, un portail permettant aux collaborateurs de réserver facilement salles, bureaux et places de parking. L'innovation clé : une cartographie 3D interactive pour se repérer rapidement dans les bâtiments.",

      constat: "La réservation d'espaces était un irritant quotidien pour les collaborateurs en flex office. Le processus prenait en moyenne 5 minutes, avec un taux de réussite de seulement 58%. Les utilisateurs se perdaient dans les bâtiments, les conflits de réservation étaient fréquents, et aucun outil ne permettait de visualiser concrètement les espaces disponibles.",

      action: "J'ai mené une recherche terrain sur 3 sites pilotes (Sophia Antipolis, Marseille, Ivry). Les interviews et observations ont permis de comprendre les pratiques de réservation et d'identifier les pain points prioritaires. La conception s'est articulée autour d'un parcours de réservation en 3 étapes maximum, intégrant une vue 3D interactive des bâtiments. J'ai travaillé en étroite collaboration avec le développeur 3D pour garantir une expérience fluide. Des tests utilisateurs sur application mobile ont validé la solution.",

      resultat: "DOCALFLEX a transformé l'expérience de réservation : taux de réussite à 72% (+14pts), temps de réservation réduit à 2 minutes (-60%), et une adoption massive de la carte 3D (81% des utilisateurs). Les collaborateurs ont unanimement salué l'innovation de la visualisation 3D."
    },

    process: [
      {
        step: "01",
        title: "Recherche terrain",
        summary: "Compréhension des usages de réservation actuels.",
        activities: [
          "Interviews utilisateurs sur 3 sites",
          "Observation des pratiques de réservation",
          "Analyse des outils existants",
        ],
        deliverables: "Synthèse research, pain points priorisés",
      },
      {
        step: "02",
        title: "Conception UX",
        summary: "Parcours de réservation simplifié.",
        activities: ["Wireframes papier", "Intégration de la vue 3D", "Prototypage du parcours de réservation"],
        deliverables: "Wireframes, prototype basse fidélité",
      },
      {
        step: "03",
        title: "Design UI & 3D",
        summary: "Interface intuitive avec cartographie interactive.",
        activities: [
          "Design de l'interface de réservation",
          "Intégration de la cartographie 3D",
          "Application mobile responsive",
        ],
        deliverables: "Maquettes finales, prototype interactif",
      },
      {
        step: "04",
        title: "Tests utilisateurs",
        summary: "Validation avec les collaborateurs des sites pilotes.",
        activities: [
          "Tests sur application mobile",
          "Collecte des retours quantitatifs et qualitatifs",
          "Itérations sur les points de friction",
        ],
        deliverables: "Rapport de tests, chiffres clés",
      },
    ],

    results: {
      quantitative: [
        { metric: "Taux de réussite réservation", before: "58%", after: "72%", change: "+14pts" },
        { metric: "Adoption carte 3D", before: "0%", after: "81%", change: "+81pts" },
        { metric: "Temps de réservation", before: "5 min", after: "2 min", change: "-60%" },
      ],
      qualitative: [
        '"Le plan 3D est un vrai plus pour se situer rapidement" - Collaborateur',
        '"Ça se fait en 2 minutes et très facilement" - Collaborateur site pilote',
        "La cartographie 3D jugée indispensable par la majorité des utilisateurs",
      ],
      learnings: [
        "La visualisation 3D améliore significativement l'orientation dans les espaces complexes",
        "L'expérience mobile est clé pour les réservations en situation de mobilité",
        "Un parcours de réservation efficace ne doit pas dépasser 3 étapes",
      ],
    },
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
 * Récupère les secteurs uniques
 */
export function getUniqueSectors(): string[] {
  const sectors = projectsData.map((p) => p.sector);
  return ["Tous", ...Array.from(new Set(sectors))];
}

/**
 * Récupère les projets mis en avant
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
