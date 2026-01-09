import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { SkillsRadarChart } from "@/components/skills/SkillsRadarChart";
import { ToolsSection } from "@/components/skills/ToolsSection";

export default function Skills() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 md:mb-6">
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
      <section className="py-12 md:py-16">
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

      {/* Tools Section */}
      <section className="py-12 md:py-16 bg-surface/50">
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
