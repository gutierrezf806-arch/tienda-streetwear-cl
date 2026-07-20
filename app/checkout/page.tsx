"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header.jsx";
import { useCart } from "../hooks/useCart.js";

const SHIPPING = 2500;

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

function formatCLP(value: number) {
  return `$${Math.round(value).toLocaleString("es-CL")}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal } = useCart() as {
    cartItems: CartItem[];
    getCartTotal: () => number;
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Checkout - Tu Marca Streetwear";
  }, []);

  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING;

  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          shipping: SHIPPING,
          back_urls: {
            success: `${window.location.origin}/checkout/success`,
            failure: `${window.location.origin}/checkout/failure`,
            pending: `${window.location.origin}/checkout/pending`,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.preferenceLink;
      } else {
        alert("Error en pago");
      }
    } catch (error) {
      console.error(error);
      alert("Error en pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-lg font-medium text-brand-cream/80">
                Tu carrito está vacío
              </p>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-full bg-brand-gold px-6 py-2.5 font-display text-sm uppercase text-brand-black transition-colors hover:bg-brand-red hover:text-brand-cream"
              >
                Ir al catálogo
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row">
              <section className="flex flex-col gap-6 lg:w-[70%]">
                <h1 className="font-display text-3xl uppercase tracking-tight text-brand-cream">
                  Checkout
                </h1>

                <ul className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <li
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex flex-col gap-4 rounded-lg border border-brand-charcoal/40 bg-brand-surface p-4 sm:flex-row sm:items-center"
                    >
                      <div className="h-24 w-24 shrink-0 rounded-md bg-brand-charcoal/30" />

                      <div className="flex flex-1 flex-col gap-1">
                        <p className="font-semibold text-brand-cream">{item.name}</p>
                        <p className="text-sm text-brand-cream/60">
                          Talla: {item.size} · Color: {item.color}
                        </p>
                        <p className="text-sm text-brand-cream/70">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-brand-cream">
                        {formatCLP(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className="flex flex-col gap-4 rounded-lg border border-brand-charcoal/40 bg-brand-surface p-6 lg:w-[30%]">
                <h2 className="font-display text-lg uppercase text-brand-cream">
                  Resumen del Pedido
                </h2>

                <div className="flex flex-col gap-2 text-sm text-brand-cream/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCLP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{formatCLP(SHIPPING)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-charcoal/40 pt-4">
                  <span className="text-base font-bold text-brand-cream">Total</span>
                  <span className="text-2xl font-extrabold text-brand-gold">
                    {formatCLP(total)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="mt-2 w-full rounded-full bg-brand-gold px-4 py-3 font-display text-sm uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-red hover:text-brand-cream disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Redirigiendo..." : "Ir a Mercado Pago"}
                </button>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
