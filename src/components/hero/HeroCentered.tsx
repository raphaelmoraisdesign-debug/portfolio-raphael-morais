import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";
const skillTags = [{
  label: "UX Research",
  position: "top-0 left-1/4 -translate-x-1/2"
}, {
  label: "Product Design",
  position: "top-0 right-1/4 translate-x-1/2"
}, {
  label: "Design Systems",
  position: "top-1/4 left-0 -translate-y-1/2"
}, {
  label: "Prototypage",
  position: "top-1/4 right-0 -translate-y-1/2"
}, {
  label: "Facilitation",
  position: "bottom-1/4 left-0 translate-y-1/2"
}, {
  label: "UI Design",
  position: "bottom-1/4 right-0 translate-y-1/2"
}];
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.5
  }
};
const fadeInScale = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  transition: {
    duration: 0.6,
    ease: "easeOut"
  }
};
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
const tagVariants = {
  initial: {
    opacity: 0,
    scale: 0.5
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.5 + i * 0.08,
      ease: "easeOut" as const
    }
  })
};
export function HeroCentered() {
  return <section className="py-section-mobile md:py-section bg-gradient-to-b from-background to-card/30 overflow-hidden">
      <div className="container">
        <motion.div className="flex flex-col items-center text-center" initial="initial" animate="animate" variants={stagger}>
          {/* Photo with floating tags */}
          <div className="relative w-full max-w-lg mb-8 md:mb-12">
            {/* Decorative ring */}
            <motion.div className="absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-primary/20" initial={{
            opacity: 0,
            rotate: -180
          }} animate={{
            opacity: 1,
            rotate: 0
          }} transition={{
            duration: 1.2,
            ease: "easeOut"
          }} />
            
            {/* Photo container */}
            <motion.div className="relative mx-auto w-56 h-56 md:w-72 md:h-72" variants={fadeInScale}>
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card shadow-elegant">
                <img src={profilePhoto} alt="Photo de profil" className="w-full h-full object-cover object-top" />
              </div>
              
              {/* Status badge */}
              <motion.div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-soft" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8,
              duration: 0.4
            }}>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Disponible</span>
              </motion.div>
            </motion.div>

            {/* Floating skill tags - Desktop only */}
            <div className="hidden md:block">
              {skillTags.map((tag, index) => <motion.div key={tag.label} className={`absolute ${tag.position}`} custom={index} initial="initial" animate="animate" variants={tagVariants}>
                  <span className="px-3 py-1.5 text-sm font-medium bg-card border border-border rounded-full shadow-soft hover:border-primary/30 hover:shadow-md transition-all duration-250 cursor-default whitespace-nowrap">
                    {tag.label}
                  </span>
                </motion.div>)}
            </div>
          </div>

          {/* Title */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground leading-tight mb-4 md:mb-6">Product Designer confirmé
          <span className="text-primary"> & Consultant</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 md:mb-10 leading-relaxed">
            J'aide les équipes produit à lancer des expériences digitales 
            <span className="text-foreground font-medium"> utiles</span>, 
            <span className="text-foreground font-medium"> utilisables</span> et 
            <span className="text-foreground font-medium"> désirables</span>.
          </motion.p>

          {/* Mobile skill tags */}
          <motion.div className="flex flex-wrap justify-center gap-2 mb-8 md:hidden" variants={fadeInUp}>
            {skillTags.map(tag => <span key={tag.label} className="px-3 py-1.5 text-sm font-medium bg-card border border-border rounded-full">
                {tag.label}
              </span>)}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="hero">
              <Link to="/projets">
                Voir mes projets
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Me contacter</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
}