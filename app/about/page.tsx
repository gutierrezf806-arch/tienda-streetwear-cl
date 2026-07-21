import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-cream sm:text-4xl">
            Underground Elegante
          </h1>

          <p className="mt-6 text-base leading-relaxed text-brand-cream/70 sm:text-lg">
            Somos una marca de streetwear chilena que combina la actitud de la calle
            con un estilo cuidado y elegante. Cada prenda está pensada para quienes
            viven la cultura urbana sin dejar de lado el detalle y la calidad.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-brand-charcoal/40 bg-brand-surface p-6">
              <h2 className="font-display text-xl uppercase text-brand-gold">
                Urban Code
              </h2>
              <p className="mt-2 text-sm text-brand-cream/70">Streetwear urbano.</p>
            </div>

            <div className="rounded-lg border border-brand-charcoal/40 bg-brand-surface p-6">
              <h2 className="font-display text-xl uppercase text-brand-gold">
                No Limits
              </h2>
              <p className="mt-2 text-sm text-brand-cream/70">Ropa gym / deportiva.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
