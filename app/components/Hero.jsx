import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center gap-4 px-4 text-center sm:gap-6">
        <h1 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
          Streetwear Urbano de Calidad
        </h1>

        <p className="max-w-md text-sm text-white/80 sm:max-w-xl sm:text-lg">
          Descubre nuestra colección exclusiva diseñada para ti
        </p>

        <Link
          href="/catalogo"
          className="mt-2 rounded-full bg-orange-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-500 sm:px-10 sm:py-4 sm:text-base"
        >
          Explorar Catálogo
        </Link>

        <p className="text-xs text-white/60 sm:text-sm">
          Envío gratis en compras mayores a $50.000
        </p>
      </div>
    </section>
  );
}
