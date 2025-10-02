// src/pages/Gallery.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import MotionSection from "@/components/motion/Section";
import { fadeInUp, stagger, hoverLift } from "@/lib/motion";

type ImgItem = { src: string; alt: string };

const FALLBACK =
  "https://images.unsplash.com/photo-1551214012-84f95e060dee?auto=format&fit=crop&w=1200&q=60";

const IMAGES: ImgItem[] = [
  { src: "https://images.squarespace-cdn.com/content/v1/6672e6edcaff264369f010db/64ca4093-4a53-442f-b3e0-9cfbb29eed08/DearDaphni_GBonghi_Dec2024-49.jpg", alt: "Family Room" },
  { src: "https://qul.imgix.net/d92be616-d8d9-4e56-bf01-4b9f137887ed/521286_sld.jpg", alt: "Dining Place" },
  { src: "https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg", alt: "Couples Dining" },
  { src: "https://media.istockphoto.com/id/843610508/photo/interior-of-cozy-restaurant-loft-style.jpg?s=612x612&w=0&k=20&c=s_PVQJNzcilxKYpm3O-AxBMx4_om5G0TKuxUmiMl85Y=", alt: "Bar Dining" },
  { src: "https://images.unsplash.com/photo-1631615535272-1106aa1b3854?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D", alt: "Special Dining" },
  { src: "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?cs=srgb&dl=pexels-yente-van-eynde-1263034-2403392.jpg&fm=jpg", alt: "Serving" },
  { src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww", alt: "Chill ambience" },
  { src: "https://images.pexels.com/photos/2544830/pexels-photo-2544830.jpeg?cs=srgb&dl=pexels-reneterp-2544830.jpg&fm=jpg", alt: "Bar Server" },
  { src: "https://www.engelberg.ch/fileadmin/_processed_/1/c/csm_Restaurant_Risti_web_f22f67cbce.jpg", alt: "Outdoor seating" },
  { src: "https://media.istockphoto.com/id/1165081448/photo/cheers-to-friendship.jpg?s=612x612&w=0&k=20&c=C8B1O2qgD10scDys0QmwBOQwPtnE1COJ7a7B0jSm35E=", alt: "Gang parties" },
];

function GalleryCard({ item, i }: { item: ImgItem; i: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      variants={fadeInUp(i * 0.03, 12)}
      className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] relative group"
      {...hoverLift}
      tabIndex={0}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const el = e.currentTarget;
          if (el.src !== FALLBACK) el.src = FALLBACK;
          setLoaded(true);
        }}
        className={`w-full h-auto object-cover transition duration-500 will-change-transform
          ${loaded ? "blur-0 scale-100 opacity-100" : "blur-md scale-[1.03] opacity-80"}`}
        draggable={false}
      />

      {/* Hover caption */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm text-white/90 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-t from-black/50 to-transparent">
        {item.alt}
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <motion.h2 variants={fadeInUp(0)} className="text-4xl md:text-5xl font-extrabold text-amber-400">
        Gallery
      </motion.h2>
      <motion.p variants={fadeInUp(0.05)} className="mt-3 text-white/70">
        A glimpse into our kitchen and plates.
      </motion.p>

      {/* Masonry list with in-view stagger (your requested wrapper) */}
      <motion.div
        variants={stagger(0.06, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"
      >
        {IMAGES.map((img, i) => (
          <GalleryCard key={`${img.src}-${i}`} item={img} i={i} />
        ))}
      </motion.div>
    </MotionSection>
  );
}
