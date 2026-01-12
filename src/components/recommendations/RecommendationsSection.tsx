import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { recommendations } from "@/data/recommendationsData";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function RecommendationsSection() {
  return (
    <section className="py-section-mobile md:py-section bg-gradient-to-b from-background to-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle 
            title="Recommandations" 
            subtitle="Ce que mes collaborateurs disent de moi sur LinkedIn"
          />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          {recommendations.map((rec) => (
            <motion.div 
              key={rec.id}
              variants={fadeInUp}
              className="group bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-elevated transition-all duration-250 ease-in-out relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/30 transition-colors duration-250">
                <Quote className="w-8 h-8" />
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {rec.avatarInitials}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{rec.name}</h4>
                  <p className="text-sm text-text-secondary">{rec.role}</p>
                  <p className="text-xs text-text-tertiary">{rec.company}</p>
                </div>
              </div>

              {/* Recommendation text */}
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                "{rec.text}"
              </p>

              {/* LinkedIn badge */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span className="text-xs text-text-tertiary">Recommandation LinkedIn</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LinkedIn CTA */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <a 
            href="https://www.linkedin.com/in/raphael-morais-leal-860434170/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-250"
          >
            <Linkedin className="w-4 h-4" />
            Voir toutes les recommandations sur LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
