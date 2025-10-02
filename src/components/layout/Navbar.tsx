// src/components/layout/Navbar.tsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { hoverLift } from "@/lib/motion";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const linkBase =
  "relative px-3 py-2 text-sm md:text-base transition-colors text-white/90 " +
  "hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-amber-400/60 rounded-md";

export default function Navbar() {
  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b border-white/10",
        // Fallback bg + blur when supported
        "bg-[#0e1116]/80 supports-[backdrop-filter]:backdrop-blur-md",
      ].join(" ")}
    >
      <nav
        role="navigation"
        aria-label="Primary"
        className={[
          "mx-auto max-w-6xl h-16",
          // regular padding + iOS safe-area insets (notch)
          "px-4 md:px-6",
          "pl-[max(1rem,env(safe-area-inset-left))]",
          "pr-[max(1rem,env(safe-area-inset-right))]",
          "flex items-center justify-between",
        ].join(" ")}
      >
        {/* Logo */}
        <motion.div {...hoverLift}>
          <NavLink
            to="/"
            aria-label="AKIR — Home"
            className="font-black tracking-widest select-none bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded-md"
          >
            <span className="text-2xl md:text-4xl leading-none">AKIR Restaurant</span>
          </NavLink>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <motion.div key={l.to} {...hoverLift}>
              <NavLink to={l.to} end={l.end as any} className={linkBase}>
                {({ isActive }) => (
                  <span className="relative inline-block">
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-1 right-1 -bottom-[2px] h-[2px] rounded-full bg-amber-400"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Reserve button */}
        <motion.div {...hoverLift}>
          <NavLink
            to="/reserve"
            className="ml-2 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            Reserve Table
          </NavLink>
        </motion.div>
      </nav>
    </header>
  );
}
