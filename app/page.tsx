import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductCard from "./components/ProductCard.jsx";

const products = [
  {
    name: "Polera Urban Vibes",
    description: "Polera oversize de algodón con estampado urbano",
    price: 18990,
    image: "",
  },
  {
    name: "Polera Street Life",
    description: "Polera de corte relajado inspirada en la cultura urbana",
    price: 18990,
    image: "",
  },
  {
    name: "Polerón Classic Black",
    description: "Polerón con capucha en negro, algodón premium",
    price: 32990,
    image: "",
  },
  {
    name: "Polerón Bold Red",
    description: "Polerón con capucha en rojo, diseño llamativo",
    price: 32990,
    image: "",
  },
  {
    name: "Polera Minimalist",
    description: "Polera de diseño minimalista y corte clásico",
    price: 19990,
    image: "",
  },
  {
    name: "Polera Retro Style",
    description: "Polera con estampado retro y ajuste regular",
    price: 20990,
    image: "",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Nuestro Catálogo
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Descubre nuestras polerones y poleras
            </p>
          </div>

          <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
