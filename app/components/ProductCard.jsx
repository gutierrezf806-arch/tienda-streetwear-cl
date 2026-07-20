"use client";

import Link from "next/link";

function formatCLP(price) {
  return `$${Math.round(price).toLocaleString("es-CL")}`;
}

export default function ProductCard({ slug, image, name, description, price, category }) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-brand-charcoal/40 bg-brand-surface transition-colors hover:border-brand-gold/60"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-brand-charcoal/30">
        {category && (
          <span className="absolute left-3 top-3 rounded bg-brand-black/80 px-2 py-1 text-xs uppercase text-brand-gold">
            {category}
          </span>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-brand-cream/50">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display text-lg uppercase text-brand-cream">
            {name}
          </h3>
          <p className="truncate text-xs text-brand-cream/60 sm:text-sm">
            {description}
          </p>
        </div>

        <p className="font-sans text-lg font-bold text-brand-gold">
          {formatCLP(price)}
        </p>
      </div>
    </Link>
  );
}
