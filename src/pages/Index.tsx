// src/pages/Index.tsx
import MotionSection from "@/components/motion/Section";
import { Hero } from "@/components/restaurant/Hero";
import { MenuSection } from "@/components/restaurant/MenuSection";
import { About } from "@/components/restaurant/About";
import { ReservationForm } from "@/components/restaurant/ReservationForm";
import { Contact } from "@/components/restaurant/Contact";

export default function Index() {
  return (
    <main className="min-h-screen bg-background">
      <MotionSection as="section" delay={0.00}><Hero /></MotionSection>
      <MotionSection as="section" delay={0.05}><MenuSection /></MotionSection>
      <MotionSection as="section" delay={0.05}><About /></MotionSection>
      <MotionSection as="section" delay={0.05}><ReservationForm /></MotionSection>
      <MotionSection as="section" delay={0.05}><Contact /></MotionSection>
    </main>
  );
}