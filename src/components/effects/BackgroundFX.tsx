import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundFX() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(241,196,15,0.08),transparent_60%)]" />
      {/* floating blobs */}
      <motion.div
        className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-6rem] right-[-4rem] h-[28rem] w-[28rem] rounded-full bg-indigo-400/10 blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
