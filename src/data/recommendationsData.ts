export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarInitials: string;
}

export const recommendations: Recommendation[] = [
  {
    id: "leonard-menut",
    name: "Léonard Menut",
    role: "Head of Design",
    company: "BNP Paribas Personal Finance",
    avatarInitials: "LM",
    text: "J'ai eu l'occasion de travailler avec Raphaël au sein de l'équipe design. Il n'hésite pas à partager ses idées et à donner son avis, ce qui enrichit les échanges et les réflexions collectives. Très apprécié par les PM et PO avec qui il travaillait au quotidien, il sait s'intégrer efficacement aux équipes et contribuer de manière constructive aux projets."
  },
  {
    id: "carole-fuhrmann",
    name: "Carole Fuhrmann",
    role: "Senior Product Designer",
    company: "5 DEGRÉS",
    avatarInitials: "CF",
    text: "J'ai le plaisir de collaborer avec Raphaël à la fois chez 5 Degrés notre ESN et dans ma mission chez BNP Personal Finance. Toujours souriant, bienveillant et de bonne humeur, il apporte une énergie très positive à l'équipe, ce qui crée un climat de travail agréable et détendu. Son regard utilisateur est juste, et il a une belle capacité à simplifier les problèmes complexes pour les rendre accessibles. Il sait trouver les solutions efficaces sans se perdre dans l'inutile — ce qui rend ses livrables clairs, pertinents et pragmatiques. Travailler avec lui, c'est allier professionnalisme et bonne ambiance, un combo rare et précieux !"
  },
  {
    id: "anthony-rodriguez",
    name: "Anthony Rodriguez",
    role: "Product Designer",
    company: "BNPP Personal Finance",
    avatarInitials: "AR",
    text: "J'ai eu le plaisir de collaborer avec Raphaël durant plus d'un an chez Cetelem (BNPP Personal Finance), sur plusieurs projets liés à l'amélioration des parcours de Souscription notamment. Son expertise en UX Design et son approche centrée utilisateur ont eu un réel impact sur la qualité de nos solutions. Nous avons animé plusieurs ateliers d'idéation ensemble afin d'écouter les besoins métier et transformer les idées en parcours efficaces et intuitifs ! Travailler à ses côtés a été très enrichissant, c'était un véritable plaisir tant humainement que professionnellement ✨ Je recommande vivement Raphaël pour tout projet nécessitant rigueur, créativité, sens de l'écoute et pour la bonne humeur qu'il apportera !"
  },
  {
    id: "bouchra-benkhelifa",
    name: "Bouchra Benkhelifa",
    role: "Lead Product Manager",
    company: "Chaze",
    avatarInitials: "BB",
    text: "Raphaël est un designer talentueux avec une forte capacité à transformer des idées complexes en interfaces simples et intuitives. J'ai eu le plaisir de travailler avec lui sur plusieurs projets chez Chaze, et son professionnalisme ainsi que sa rigueur créative ont toujours été au rendez-vous. Il possède une excellente compréhension des enjeux UX et sait parfaitement collaborer avec les équipes produit et tech pour livrer des solutions de haute qualité. Je le recommande vivement à toute équipe cherchant un Product Designer passionné et efficace."
  }
];
