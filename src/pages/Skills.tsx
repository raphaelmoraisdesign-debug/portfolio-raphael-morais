import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";
import { SkillsRadarChart } from "@/components/skills/SkillsRadarChart";
import { ToolsSection } from "@/components/skills/ToolsSection";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sections = [
  { id: "vue-densemble", label: "Vue d'ensemble" },
  { id: "outils", label: "Mes outils" },
  { id: "recommandations", label: "Recommandations" },
];

export default function Skills() {
  const activeSection = useActiveSection(sections.map((s) => s.id));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-section-mobile pb-l md:pt-section md:pb-5xl">
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
              Plus de 7 ans d'expérience en design produit m'ont permis de
              développer une expertise transverse, de la recherche utilisateur
              au design system, en passant par le management d'équipe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container">
          <ul className="flex gap-6 py-3 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative px-1 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                    activeSection === section.id
                      ? "text-primary after:w-full"
                      : "text-text-secondary hover:text-foreground after:w-0 hover:after:w-full"
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Radar Chart Section */}
      <section id="vue-densemble" className="py-section-mobile md:py-section scroll-mt-32">
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
      <section id="outils" className="py-section-mobile md:py-section bg-primary-light scroll-mt-32">
        <div className="container">
          <SectionTitle
            title="Mes outils"
            subtitle="Les outils que j'utilise au quotidien pour la recherche, le design et la collaboration."
          />
          <ToolsSection />
        </div>
      </section>

      {/* Recommendations Section */}
      <div id="recommandations" className="scroll-mt-32">
        <RecommendationsSection />
      </div>
    </PageLayout>
  );
}