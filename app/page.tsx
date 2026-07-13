import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
