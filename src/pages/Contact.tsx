import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { SectionTitle } from "@/components/ui/section-title";

const contactChannels = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "Connectons-nous et échangeons sur vos projets",
    href: "https://www.linkedin.com/in/raphael-morais-leal-860434170/",
    isExternal: true,
  },
  {
    icon: Mail,
    label: "Email",
    description: "raphaelmorais.design@gmail.com",
    href: "mailto:raphaelmorais.design@gmail.com",
    isExternal: false,
  },
];

export default function Contact() {
  return (
    <PageLayout>
      <section className="py-section-mobile md:py-section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <SectionTitle 
                title="Me contacter" 
                subtitle="Mon profil vous plaît ou vous intrigue ? Contactez moi."
                align="center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid gap-4 md:gap-6"
            >
              {contactChannels.map((channel, index) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.isExternal ? "_blank" : undefined}
                  rel={channel.isExternal ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="group flex items-center gap-4 md:gap-6 p-4 md:p-8 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-250 ease-in-out"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-250 ease-in-out">
                    <channel.icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-250 ease-in-out" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-250 ease-in-out">
                      {channel.label}
                    </h3>
                    <p className="text-sm md:text-base text-text-secondary break-all md:break-normal">
                      {channel.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
