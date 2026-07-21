import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const EMAIL = "cl.urban.shop.25@gmail.com";

export default function ContactoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-brand-black text-brand-cream">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-cream sm:text-4xl">
            Contacto
          </h1>

          <p className="mt-6 max-w-xl text-base text-brand-cream/70 sm:text-lg">
            ¿Tienes dudas, sugerencias o quieres saber más sobre nuestros productos?
            Escríbenos y te respondemos a la brevedad.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 break-all text-lg font-semibold text-brand-gold underline decoration-brand-gold/40 underline-offset-4 transition-colors hover:text-brand-red sm:text-xl"
          >
            {EMAIL}
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
