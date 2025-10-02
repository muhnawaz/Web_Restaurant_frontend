import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, stagger, hoverLift } from "@/lib/motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const link = "text-white/70 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded-md";

  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0c0f14]">
      {/* top grid */}
      <motion.div
        variants={stagger(0.08, 0.04)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        className="mx-auto max-w-6xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3"
      >
        {/* Brand & blurb */}
        <motion.div variants={fadeInUp(0)}>
          <div className="text-2xl md:text-3xl font-black tracking-[0.28em] bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            AKIR
          </div>
          <p className="mt-3 text-white/60 max-w-sm">
            South-Indian flavors, crafted with Andhra soul.
          </p>

          {/* socials (optional, subtle) */}
          <div className="mt-4 flex gap-2">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Facebook, label: "Facebook", href: "#" },
              { Icon: Twitter, label: "Twitter/X", href: "#" },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                {...hoverLift}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/70 hover:text-amber-300"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeInUp(0.05)}>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/reserve", label: "Reservations" },
              { to: "/about", label: "About" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
            ].map((item) => (
              <motion.li key={item.to} {...hoverLift}>
                <NavLink className={link} to={item.to}>
                  {item.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeInUp(0.1)}>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-white/70">
            Benz Circle, Eenadu office opposite, Vijayawada – 520010, AP
            <br /> Phone: 9391885317
            <br /> Email: akirrestaurants@gmail.com
          </p>
        </motion.div>
      </motion.div>

      {/* bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="border-t border-white/10 py-4 text-center text-xs text-white/50"
      >
        © {new Date().getFullYear()} AKIR Restaurant. All rights reserved.
      </motion.div>
    </footer>
  );
}
