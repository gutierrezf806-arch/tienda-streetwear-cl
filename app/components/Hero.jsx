import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-black px-6 py-24 text-center text-brand-cream">
      <div className="absolute left-0 top-0 w-full border-t border-dashed border-brand-charcoal/50" />

      <div className="relative flex flex-col items-center gap-4 sm:gap-6">
        <h1 className="max-w-3xl font-display uppercase leading-none tracking-tightest text-5xl md:text-7xl">
          <span className="block">Streetwear Urbano</span>
          <span className="block text-brand-gold">de Calidad</span>
        </h1>

        <p className="max-w-md font-sans text-sm text-brand-cream/70 sm:max-w-xl sm:text-lg">
          Descubre nuestra colección exclusiva diseñada para ti
        </p>

        <Link
          href="/catalogo"
          className="mt-2 rounded-full bg-brand-gold px-8 py-3 font-display text-sm uppercase text-brand-black transition-colors hover:bg-brand-red hover:text-brand-cream sm:px-10 sm:py-4 sm:text-base"
        >
          Explorar Catálogo
        </Link>

        <p className="text-xs text-brand-cream/60 sm:text-sm">
          Envío gratis en compras mayores a $50.000
        </p>
      </div>
    </section>
  );
}
