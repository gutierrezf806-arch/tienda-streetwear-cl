"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductCard from "./components/ProductCard.jsx";

const CATEGORIES = ["Todos", "Urban Code", "No Limits"];

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  size: string;
  color: string;
  image: string;
  category: string;
  slug: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="font-display text-3xl uppercase tracking-tight text-brand-cream sm:text-4xl">
              Nuestro Catálogo
            </h1>
            <p className="text-base text-brand-cream/70">
              Descubre nuestras polerones y poleras
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2 font-display text-sm uppercase tracking-wide transition-colors ${
                  selectedCategory === category
                    ? "border-brand-gold bg-brand-gold text-brand-black"
                    : "border-brand-charcoal text-brand-cream/70 hover:border-brand-gold hover:text-brand-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3">
            {loading ? (
              <p className="text-brand-cream/70">Cargando productos...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-brand-cream/70">No hay productos</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  description={product.description}
                  price={parseInt(product.price)}
                  image={product.image}
                  category={product.category}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
