import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// A) Local files in src/assets/menu/*
const signatureDish = "https://img-cdn.publive.online/fit-in/1200x675/hospibuz/media/post_attachments/wp-content/uploads/2023/08/5_MLA-Potnam-biryani.jpg";
const appetizers    = "https://img.freepik.com/premium-photo/south-indian-vegetarian-breakfast-idli-karam-podi-dosa-sambar-chutney-top-view_742418-360.jpg"
const wineCollection = "https://www.cookclickndevour.com/wp-content/uploads/2018/10/ginger-tea-recipe-3.jpg"

// If you prefer /public, use these instead and remove imports above:
// const signatureDish = "/menu/signature-dish. jpg";
// const appetizers = "/menu/appetizers.jpg";
// const wineCollection = "/menu/wine-collection.jpg";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop";

function MenuImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-elegant">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
        }}
        className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}

export function MenuSection() {
  const menuCategories = [
    {
      key: "signature", // used by /menu?cat=signature
      title: "Signature Dishes",
      description:
        "Our chef's masterpieces, crafted with authentic South Indian spices",
      image: signatureDish,
      items: [
        { name: "Malabar Fish Curry", price: "₹350", description: "Fresh catch in coconut curry with Kodampuli" },
        { name: "Potlam Biryani",     price: "₹400", description: "Fragrant basmati rice with tender mutton and saffron" },
        { name: "Chettinad Chicken",  price: "₹300", description: "Spicy Tamil specialty with roasted spices and curry leaves" },
      ],
    },
    {
      key: "starters",
      title: "Traditional Starters",
      description: "Authentic appetizers from the heart of South India",
      image: appetizers,
      items: [
        { name: "Medu Vada",        price: "₹60", description: "Crispy lentil donuts served with sambar and chutneys" },
        { name: "Koliwada Prawns",  price: "₹250", description: "Spicy battered prawns with curry leaf tempering" },
        { name: "Gunpowder Dosa",   price: "₹149", description: "Crispy dosa with spicy gun powder and ghee" },
      ],
    },
    {
      key: "beverages",
      title: "Beverages & Desserts",
      description: "Traditional drinks and sweet endings from South India",
      image: wineCollection,
      items: [
        { name: "Filter Coffee",       price: "₹150", description: "Authentic South Indian coffee in traditional tumbler" },
        { name: "Payasam",   price: "₹199", description: "Variety of traditional sweet puddings" },
        { name: "Prakasham Special Tea",   price: "₹80",  description: "Refreshing ginger-infused tea" },
      ],
    },
  ];

  return (
    <section id="menu" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Authentic South Indian
            <span className="block text-gold">Cuisine</span>
          </h2>
          <p className="text-xl text-muted-foreground font-elegant max-w-2xl mx-auto">
            Traditional recipes passed down through generations, prepared with authentic spices and time-honored techniques.
          </p>
        </motion.div>

        <div className="space-y-24">
          {menuCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <MenuImage src={category.image} alt={category.title} />
              </div>

              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div>
                  <h3 className="text-4xl font-display font-bold text-foreground mb-4">
                    {category.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-elegant">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-start p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:bg-card/70 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h4 className="text-xl font-display font-semibold text-foreground mb-2">
                          {item.name}
                        </h4>
                        <p className="text-muted-foreground font-elegant">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-2xl font-display font-bold text-gold ml-4">
                        {item.price}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Deep link to the full Menu page with correct tab/category */}
                <Link to={`/menu?cat=${category.key}`}>
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    View Full {category.title} Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
