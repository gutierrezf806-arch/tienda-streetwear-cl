"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import { useCart } from "../../hooks/useCart.js";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Negro", "Blanco", "Azul", "Rojo"];

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
  rating: string;
  reviews_count: string;
  material: string;
  care_instruction: string;
};

function formatCLP(value: number) {
  return `$${Math.round(value).toLocaleString("es-CL")}`;
}

function renderStars(rating: number) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return "⭐".repeat(fullStars);
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isAdded, setIsAdded] = useState(false);

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

  const product = products.find((item) => item.slug === slug);
  const relatedProducts = product
    ? products
        .filter((item) => item.category === product.category && item.slug !== product.slug)
        .slice(0, 3)
    : [];

  function handleAddToCart() {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: parseInt(product.price),
      size: selectedSize,
      color: selectedColor,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <p className="py-24 text-center text-zinc-600 dark:text-zinc-400">
              Cargando...
            </p>
          ) : !product ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Producto no encontrado
              </p>
              <Link
                href="/"
                className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-500"
              >
                Volver al catálogo
              </Link>
            </div>
          ) : (
            <>
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
                  Home
                </Link>
                <span>/</span>
                <span>{product.category}</span>
                <span>/</span>
                <span className="text-zinc-900 dark:text-zinc-50">{product.name}</span>
              </nav>

              <div className="flex flex-col gap-10 lg:flex-row">
                <div className="lg:w-[60%]">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:w-[40%]">
                  <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                    {product.name}
                  </h1>

                  {product.rating && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {renderStars(parseFloat(product.rating))} {product.rating}
                      {product.reviews_count && ` (${product.reviews_count} reviews)`}
                    </p>
                  )}

                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {formatCLP(parseInt(product.price))}
                  </p>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">Talla</span>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                      >
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">Color</span>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                      >
                        {colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors ${
                        isAdded
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-orange-600 hover:bg-orange-500"
                      }`}
                    >
                      {isAdded ? "¡Agregado!" : "Agregar al Carrito"}
                    </button>

                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="flex-1 rounded-full border border-zinc-300 px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Volver
                    </button>
                  </div>

                  {(product.material || product.care_instruction) && (
                    <div className="mt-4 flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
                        Material &amp; Care
                      </h2>
                      {product.material && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Material:{" "}
                          </span>
                          {product.material}
                        </p>
                      )}
                      {product.care_instruction && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Care Instructions:{" "}
                          </span>
                          {product.care_instruction}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {relatedProducts.length > 0 && (
                <section className="mt-16">
                  <h2 className="mb-6 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                    You might also like
                  </h2>
                  <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3">
                    {relatedProducts.map((related) => (
                      <ProductCard
                        key={related.id}
                        slug={related.slug}
                        name={related.name}
                        description={related.description}
                        price={parseInt(related.price)}
                        image={related.image}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
