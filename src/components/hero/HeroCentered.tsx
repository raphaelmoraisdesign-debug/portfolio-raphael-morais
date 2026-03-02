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
  return <section className="relative py-section-mobile md:py-section overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      <div className="absolute inset-0 pattern-dots opacity-40" />
      
      {/* Gradient orbs for visual interest */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative">
        <motion.div className="flex flex-col items-center text-center" initial="initial" animate="animate" variants={stagger}>
          {/* Photo with floating tags */}
          <div className="relative w-full max-w-lg mb-8 md:mb-12">
            {/* Decorative ring with gradient */}
            <motion.div 
              className="absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, hsl(244 76% 59% / 0.2), hsl(330 85% 70% / 0.2))',
                padding: '2px'
              }}
              initial={{
                opacity: 0,
                rotate: -180,
                scale: 0.8
              }} 
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1
              }} 
              transition={{
                duration: 1.2,
                ease: "easeOut"
              }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>
            
            {/* Photo container */}
            <motion.div className="relative mx-auto w-56 h-56 md:w-72 md:h-72" variants={fadeInScale}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent-secondary/20 blur-2xl scale-125" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card shadow-glow">
                <img src={profilePhoto} alt="Photo de profil" className="w-full h-full object-cover object-top" />
              </div>
              
              {/* Status badge */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-elevated"
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9
                }} 
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }} 
                transition={{
                  delay: 0.8,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Disponible</span>
              </motion.div>
            </motion.div>

            {/* Floating skill tags - Desktop only */}
            <div className="hidden md:block">
              {skillTags.map((tag, index) => <motion.div key={tag.label} className={`absolute ${tag.position}`} custom={index} initial="initial" animate="animate" variants={tagVariants}>
                  <span className="px-4 py-2 text-sm font-medium bg-card/90 backdrop-blur-sm border border-border/50 rounded-full shadow-soft hover:border-primary/40 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 cursor-default whitespace-nowrap">
                    {tag.label}
                  </span>
                </motion.div>)}
            </div>
          </div>

          {/* Title with gradient accent */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-hero font-display font-bold text-foreground leading-tight mb-4 md:mb-6">
            Product Designer <span className="text-gradient">Senior</span>
          </motion.h1>

          {/* Subtitle with styled keywords */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 md:mb-10 leading-relaxed">
            J'aide les équipes produit à lancer des expériences digitales 
            <span className="text-foreground font-semibold"> utiles</span>, 
            <span className="text-foreground font-semibold"> utilisables</span> et 
            <span className="text-foreground font-semibold"> désirables</span>.
          </motion.p>

          {/* Mobile skill tags */}
          <motion.div className="flex flex-wrap justify-center gap-2 mb-8 md:hidden" variants={fadeInUp}>
            {skillTags.map(tag => <span key={tag.label} className="px-3 py-1.5 text-sm font-medium bg-card border border-border rounded-full shadow-soft">
                {tag.label}
              </span>)}
          </motion.div>

          {/* CTAs with enhanced styling */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="hero" className="group glow-primary">
              <Link to="/projets">
                Voir mes projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover:border-primary/50">
              <Link to="/contact">Me contacter</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
}