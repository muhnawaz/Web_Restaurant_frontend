import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Strongly-typed, safe lazy import (no runtime errors if 3D module is missing)
const Scene3D = lazy<React.ComponentType<{ className?: string }>>(() =>
  import("../3d/Scene3D").then((mod: any) => ({
    // if there’s no default export, try named; else return a no-op component
    default: (mod.default ?? mod.Scene3D ?? ((_: { className?: string }) => null)) as React.ComponentType<{
      className?: string;
    }>,
  }))
);

const btn =
  "inline-flex h-12 w-[220px] items-center justify-center rounded-2xl text-base font-semibold";

export function Hero() {
  return (
    // Full viewport minus sticky navbar height (64px)
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-[#0c0f14]"
    >
      {/* Background image with Ken Burns (smooth zoom-out) */}
      <img
        src="/hero-restaurant.jpg"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-center kenburns-out"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Dim overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Optional 3D bubbles layer – pointer-events none so it never blocks clicks */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <Scene3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* Soft gold glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 z-10 h-96 w-96 rounded-full bg-yellow-200/10 blur-3xl" />

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white"
            >
              Authentic South Indian{" "}
              <span className="text-amber-300 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Flavors
              </span>{" "}
              Reimagined
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg text-white/80 leading-relaxed max-w-xl"
            >
              Traditional South Indian cuisine meets contemporary elegance—
              bringing ancient spices and time-honored recipes to modern tables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/reserve"
                className={`${btn} text-black bg-gradient-to-r from-amber-300 to-amber-500 shadow hover:brightness-110`}
              >
                Reserve Your Table
              </Link>
              <Link
                to="/menu"
                className={`${btn} text-white ring-1 ring-white/20 hover:ring-amber-300/60 bg-white/5`}
              >
                Explore Menu
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "★★★", label: "Michelin Stars" },
              { value: "50+", label: "Signature Dishes" },
              { value: "1000+", label: "Wine Selection" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-1">
                  {s.value}
                </div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wordmark (prevents header “AKIR” clipping issue and looks premium) */}
      <div
        className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 z-20 select-none"
        aria-hidden
      >
        <div className="text-center">
          <div
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.2em]
                       bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500
                       bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]
                       text-sheen"
          >
            AKIR
          </div>
          <div className="mt-1 text-xs md:text-sm tracking-[0.6em] text-white/70">
            RESTAURANT
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        aria-hidden
      >
        <div className="w-6 h-10 border-2 border-amber-300/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
