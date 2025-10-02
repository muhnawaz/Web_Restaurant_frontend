import { Variants } from "framer-motion";
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = (delay = 0, y = 16): Variants => ({
  hidden: { opacity: 0, y },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

export const hoverLift = {
  whileHover: { y: -4, scale: 1.02, transition: { duration: 0.2 } },
  whileTap:   { scale: 0.98 },
};
