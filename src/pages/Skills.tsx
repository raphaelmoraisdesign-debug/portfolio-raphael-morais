import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { SkillsRadarChart } from "@/components/skills/SkillsRadarChart";
import { ExpertiseBlock } from "@/components/skills/ExpertiseBlock";
import { ToolsSection } from "@/components/skills/ToolsSection";

const expertiseData = [
  {
    id: "discovery",
    title: "Discovery & UX Research",
    description: "De l'observation terrain aux tests utilisateurs, j'accompagne les équipes dans la compréhension profonde des besoins utilisateurs et des opportunités business.",
    approach: "Je privilégie une approche mixte combinant données quantitatives et insights qualitatifs pour construire une vision claire du problème à résoudre.",
    examples: [
      "Conduite de 15 entretiens utilisateurs pour une banque en ligne",
      "Audit UX complet d'un tunnel de crédit avec recommandations priorisées",
      "Observation terrain en agence bancaire pendant 2 semaines"
    ]
  },
  {
    id: "strategic",
    title: "Strategic Design",
    description: "Je co-construis avec les stakeholders une vision produit alignée sur les objectifs business et les besoins utilisateurs identifiés.",
    approach: "En facilitant des ateliers de discovery et de priorisation, j'aide les équipes à converger vers des décisions produit éclairées.",
    examples: [
      "Animation d'un Design Sprint pour définir la V1 d'une app de gestion",
      "Co-définition de la roadmap produit avec le CPO et le CTO",
      "Matrice d'impact/effort pour prioriser les fonctionnalités clés"
    ]
  },
  {
    id: "methodology",
    title: "Méthodologie",
    description: "Design Thinking, Lean UX, Agilité : j'adapte les méthodologies au contexte de l'équipe et du projet pour maximiser la valeur livrée.",
    approach: "Je crois en une approche pragmatique qui combine le meilleur de chaque méthode plutôt qu'une application dogmatique d'un framework unique.",
    examples: [
      "Mise en place d'un process de discovery continue dans une équipe produit",
      "Formation des PO au Design Thinking",
      "Intégration du design dans les rituels agiles (sprint planning, review)"
    ]
  },
  {
    id: "ux",
    title: "UX Design",
    description: "De la facilitation d'ateliers à la création de wireframes, je structure l'expérience utilisateur de bout en bout.",
    approach: "Je m'appuie sur des parcours utilisateurs validés et des données pour concevoir des interfaces qui répondent aux vrais besoins.",
    examples: [
      "Refonte complète du parcours de souscription assurance",
      "Création d'experience maps pour 3 personas clés",
      "Animation de 20+ ateliers de co-conception avec les métiers"
    ]
  },
  {
    id: "lead",
    title: "Lead Design",
    description: "Je structure les équipes design, définis les process et rituels, et accompagne la montée en compétences des designers.",
    approach: "Un bon Lead Design crée les conditions pour que chaque designer puisse faire son meilleur travail tout en assurant la cohérence globale.",
    examples: [
      "Management d'une équipe de 4 designers produit",
      "Mise en place des design reviews hebdomadaires",
      "Création d'un programme de mentorat design"
    ]
  },
  {
    id: "ui",
    title: "UI Design & Design System",
    description: "Je conçois des interfaces élégantes et accessibles, et je structure les design systems pour assurer la cohérence et l'efficacité.",
    approach: "Un bon design system n'est pas qu'une bibliothèque de composants : c'est un langage partagé entre design et développement.",
    examples: [
      "Création d'un design system complet pour une fintech (100+ composants)",
      "Refonte de l'identité visuelle d'une app B2B",
      "Prototypage haute-fidélité avec micro-interactions"
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Skills() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Mes compétences
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Plus de 10 ans d'expérience en design produit m'ont permis de développer 
              une expertise transverse, de la recherche utilisateur au design system, 
              en passant par le management d'équipe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Radar Chart Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <SectionTitle
            title="Vue d'ensemble"
            subtitle="Un aperçu de mes domaines d'expertise et de mon niveau de maîtrise dans chacun."
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SkillsRadarChart />
          </motion.div>
        </div>
      </section>

      {/* Expertise Details Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionTitle
            title="Détail des expertises"
            subtitle="Ma manière d'aborder chaque domaine et des exemples concrets de missions réalisées."
          />
          <div className="grid gap-8 md:gap-12">
            {expertiseData.map((expertise, index) => (
              <motion.div
                key={expertise.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExpertiseBlock {...expertise} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <SectionTitle
            title="Mes outils"
            subtitle="Les outils que j'utilise au quotidien pour la recherche, le design et la collaboration."
          />
          <ToolsSection />
        </div>
      </section>
    </PageLayout>
  );
}
