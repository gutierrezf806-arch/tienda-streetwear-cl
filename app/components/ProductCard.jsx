"use client";

import { useState } from "react";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Negro", "Blanco", "Azul", "Rojo"];

function formatCLP(price) {
  return `$${Math.round(price).toLocaleString("es-CL")}`;
}

export default function ProductCard({ image, name, description, price }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-square w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
            {name}
          </h3>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            {description}
          </p>
        </div>

        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          {formatCLP(price)}
        </p>

        <div className="grid grid-cols-2 gap-2">
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

        <button
          type="button"
          className="mt-1 w-full rounded-full bg-orange-600 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-500"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
