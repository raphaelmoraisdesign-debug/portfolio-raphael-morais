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
    id: "bouchera-rbatchi",
    name: "Bouchera R'batchi",
    role: "Chef de projet IT",
    company: "BNP Paribas Personal Finance",
    avatarInitials: "BR",
    text: "J'ai collaboré avec Raphaël pendant un an et demi. Raphaël est quelqu'un de positif, fiable et avec qui il est très agréable de travailler au quotidien. J'ai une grande confiance en lui, aussi bien sur la qualité de son travail que sur sa capacité à faire avancer les sujets. Il est force de proposition sur les sujets UX/UI et cherche toujours à proposer des solutions pertinentes pour le produit. Il collabore très bien avec l'ensemble des équipes, aussi bien business que tech, ce qui rend le travail fluide et efficace. Je recommande vivement Raphaël pour tout poste UX/UI où l'esprit d'équipe, la proactivité et la qualité de réflexion sont des éléments clés !"
  }
];
