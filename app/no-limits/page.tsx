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

export default function NoLimitsPage() {
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

  const noLimitsProducts = products.filter(
    (product) => product.category === "No Limits"
  );

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              NO LIMITS
            </h1>
            <p className="text-lg font-semibold text-orange-600">
              Train with attitude. Identity guaranteed.
            </p>
            <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              Gym collection. Motivational designs. Premium cotton for your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3">
            {loading ? (
              <p>Cargando productos...</p>
            ) : noLimitsProducts.length === 0 ? (
              <p>No hay productos</p>
            ) : (
              noLimitsProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  description={product.description}
                  price={parseInt(product.price)}
                  image={product.image}
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
