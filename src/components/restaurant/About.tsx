// src/components/restaurant/About.tsx
import { motion } from "framer-motion";
// ❌ import { Button } from "@/components/ui/button";  // remove this

export function About() {
  return (
    <section id="about" className="py-24 bg-[#0c0f14]">
      <div className="mx-auto max-w-6xl px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Our Story of
            <span className="block text-amber-300">Culinary Passion</span>
          </h2>

          <p className="mt-6 text-white/70">
            Founded in 2008 by renowned Chef Alexandre Dubois, Élégance has become
            synonymous with gastronomic excellence. Our philosophy centers on the
            perfect harmony between traditional French techniques and innovative
            contemporary flavors.
          </p>

          <p className="mt-4 text-white/70">
            Every ingredient is carefully sourced from the finest purveyors, every
            technique refined through years of dedication, and every dish presented
            as a work of art. We believe dining should be an experience that
            engages all the senses.
          </p>

          {/* Stats row */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <div className="text-2xl font-bold text-amber-300">★★★</div>
              <div className="text-sm text-white/70 mt-1">Michelin Guide</div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <div className="text-2xl font-bold text-amber-300">95</div>
              <div className="text-sm text-white/70 mt-1">James Beard Award</div>
            </div>
          </div>

          {/* (buttons removed) */}
        </motion.div>

        {/* Right: Chef card (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-8 shadow-[var(--shadow-card)]"
        >
          <div className="w-16 h-16 rounded-full mx-auto bg-amber-300 text-black grid place-items-center font-bold">
            AD
          </div>
          <blockquote className="mt-6 text-center italic text-white/80">
            “Cooking is not just about feeding people. It’s about creating memories,
            emotions, and moments of pure joy.”
          </blockquote>

          <div className="mt-6 text-center">
            <div className="font-semibold text-amber-300">
              Chef Alexandre Dubois
            </div>
            <div className="text-xs text-white/60">
              Executive Chef & Owner
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-white/60">
            <li>• Le Cordon Bleu Graduate</li>
            <li>• Former Sous Chef at Le Bristol Paris</li>
            <li>• James Beard Award Winner 2019</li>
            <li>• Author of “Art of French Cuisine”</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
