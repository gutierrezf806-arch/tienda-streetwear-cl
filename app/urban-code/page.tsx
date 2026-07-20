"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";

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

export default function UrbanCodePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  const urbanCodeProducts = products.filter(
    (product) => product.category === "Urban Code"
  );

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <h1 className="font-display text-3xl uppercase tracking-tight text-brand-cream sm:text-4xl">
              URBAN CODE
            </h1>
            <p className="text-lg font-semibold text-brand-gold">
              Comfortable. Elegant. Timeless.
            </p>
            <p className="max-w-2xl text-base text-brand-cream/70">
              Streetwear with underground essence. Premium cotton, timeless designs.
            </p>
          </div>

          <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3">
            {loading ? (
              <p className="text-brand-cream/70">Cargando productos...</p>
            ) : urbanCodeProducts.length === 0 ? (
              <p className="text-brand-cream/70">No hay productos</p>
            ) : (
              urbanCodeProducts.map((product) => (
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
