import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = React.PropsWithChildren<{
  id?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  y?: number;
}>;

const ease = [0.22, 1, 0.36, 1] as const;

export default function MotionSection({
  id,
  as = "section",
  className = "",
  delay = 0,
  y = 24,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const Comp: any = motion[as] ?? motion.section;

  return (
    <Comp
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } },
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}
