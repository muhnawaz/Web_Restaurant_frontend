import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-amber-400">About Us</h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2 items-center">
        <img
          src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?cs=srgb&dl=pexels-reneterp-1581384.jpg&fm=jpg"
          alt="Spices and ingredients"
          className="h-72 w-full rounded-2xl object-cover border border-white/10"
          loading="lazy"
        />

        <div>
          <p className="text-white/80 leading-relaxed">
            Welcome to <span className="font-semibold text-white">AKIR Restaurant</span> —
            rooted in Vijayawada’s vibrant food culture. We celebrate Andhra
            traditions with seasonal produce, heirloom recipes, and modern
            technique. From tangy <em>gongura</em> to fragrant biryanis, every plate
            tells a story of home.
          </p>

          <ul className="mt-6 space-y-2 text-white/80">
            <li>• Slow-cooked gravies, fire-kissed grills, fresh dosas</li>
            <li>• Hand-pounded masalas, stone-ground chutneys</li>
            <li>• Locally sourced ingredients, warm hospitality</li>
          </ul>

          <Link
            to="/reserve"
            className="mt-8 inline-flex h-12 w-[220px] items-center justify-center rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-semibold hover:brightness-110"
          >
            Book a Table
          </Link>
        </div>
      </div>
    </section>
  );
}
