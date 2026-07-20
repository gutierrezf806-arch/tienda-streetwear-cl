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

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <p className="py-24 text-center text-brand-cream/70">Cargando...</p>
          ) : !product ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-lg font-medium text-brand-cream/80">
                Producto no encontrado
              </p>
              <Link
                href="/"
                className="rounded-full bg-brand-gold px-6 py-2.5 font-display text-sm uppercase text-brand-black transition-colors hover:bg-brand-red hover:text-brand-cream"
              >
                Volver al catálogo
              </Link>
            </div>
          ) : (
            <>
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-cream/60">
                <Link href="/" className="transition-colors hover:text-brand-gold">
                  Home
                </Link>
                <span>/</span>
                <span className="text-brand-gold">{product.category}</span>
                <span>/</span>
                <span className="text-brand-cream">{product.name}</span>
              </nav>

              <div className="flex flex-col gap-10 lg:flex-row">
                <div className="lg:w-[60%]">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-brand-charcoal/30">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-brand-cream/50">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:w-[40%]">
                  <h1 className="font-display text-2xl uppercase tracking-tight text-brand-cream sm:text-3xl">
                    {product.name}
                  </h1>

                  {product.rating && (
                    <p className="text-sm text-brand-cream/70">
                      {renderStars(parseFloat(product.rating))} {product.rating}
                      {product.reviews_count && ` (${product.reviews_count} reviews)`}
                    </p>
                  )}

                  <p className="font-sans text-2xl font-bold text-brand-gold">
                    {formatCLP(parseInt(product.price))}
                  </p>

                  <p className="text-sm text-brand-cream/70">{product.description}</p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="mb-2 block text-xs uppercase tracking-wide text-brand-cream/60">
                        Talla
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`flex h-8 w-8 items-center justify-center rounded border text-xs transition-colors ${
                              selectedSize === size
                                ? "border-brand-gold bg-brand-gold text-brand-black"
                                : "border-brand-charcoal text-brand-cream hover:border-brand-gold hover:text-brand-gold"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block text-xs uppercase tracking-wide text-brand-cream/60">
                        Color
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                              selectedColor === color
                                ? "border-brand-gold bg-brand-gold text-brand-black"
                                : "border-brand-charcoal text-brand-cream hover:border-brand-gold hover:text-brand-gold"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`flex-1 rounded border py-2 text-sm font-display uppercase tracking-wide transition-colors ${
                        isAdded
                          ? "border-brand-gold bg-brand-gold text-brand-black"
                          : "border-brand-red bg-transparent text-brand-red hover:bg-brand-red hover:text-brand-cream"
                      }`}
                    >
                      {isAdded ? "¡Agregado!" : "Agregar al Carrito"}
                    </button>

                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="flex-1 rounded border border-brand-charcoal py-2 text-sm font-display uppercase tracking-wide text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold"
                    >
                      Volver
                    </button>
                  </div>

                  {(product.material || product.care_instruction) && (
                    <div className="mt-4 flex flex-col gap-2 rounded-lg border border-brand-charcoal/40 bg-brand-surface p-4">
                      <h2 className="font-display text-sm uppercase tracking-wide text-brand-gold">
                        Material &amp; Care
                      </h2>
                      {product.material && (
                        <p className="text-sm text-brand-cream/70">
                          <span className="font-semibold text-brand-cream">Material: </span>
                          {product.material}
                        </p>
                      )}
                      {product.care_instruction && (
                        <p className="text-sm text-brand-cream/70">
                          <span className="font-semibold text-brand-cream">
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
                  <h2 className="mb-6 font-display text-xl uppercase tracking-tight text-brand-cream">
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
                        category={related.category}
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
