"use client";

import Link from "next/link";

function formatCLP(price) {
  return `$${Math.round(price).toLocaleString("es-CL")}`;
}

export default function ProductCard({ slug, image, name, description, price }) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
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

      <div className="flex flex-1 flex-col gap-2 p-4">
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
      </div>
    </Link>
  );
}
