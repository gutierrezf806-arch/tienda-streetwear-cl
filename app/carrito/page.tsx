"use client";

import Link from "next/link";
import Header from "../components/Header.jsx";
import { useCart } from "../hooks/useCart.js";

const SHIPPING = 2500;
const IVA_RATE = 0.19;

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

export default function CarritoPage() {
  const { cartItems, removeItem, updateQuantity, getCartTotal } = useCart() as {
    cartItems: CartItem[];
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getCartTotal: () => number;
  };

  const subtotal = getCartTotal();
  const iva = subtotal * IVA_RATE;
  const total = subtotal + SHIPPING + iva;

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Tu carrito está vacío
              </p>
              <Link
                href="/"
                className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-500"
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row">
              <section className="flex flex-col gap-6 lg:w-[70%]">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Tu Carrito
                </h1>

                <ul className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <li
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
                    >
                      <div className="h-24 w-24 shrink-0 rounded-md bg-zinc-200 dark:bg-zinc-800" />

                      <div className="flex flex-1 flex-col gap-1">
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                          {item.name}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Talla: {item.size} · Color: {item.color}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Precio unitario: {formatCLP(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                        <label className="flex items-center gap-2">
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            Cantidad
                          </span>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number(e.target.value))
                            }
                            className="w-16 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                          />
                        </label>

                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                          {formatCLP(item.price * item.quantity)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 lg:w-[30%]">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Resumen del Pedido
                </h2>

                <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCLP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{formatCLP(SHIPPING)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (19%)</span>
                    <span>{formatCLP(iva)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-red-600">
                    {formatCLP(total)}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-2 w-full rounded-full bg-orange-600 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-500"
                >
                  Ir a Checkout
                </button>

                <Link
                  href="/"
                  className="w-full rounded-full border border-zinc-300 px-4 py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Continuar Comprando
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
