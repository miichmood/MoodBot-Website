import { Nav, Marquee, Footer } from "./components/Chrome";
import { Hero, Features, LoopSection, Requirements, Setup } from "./components/SectionsA";
import { Armies, Recording, Docs, Faq, Contact } from "./components/SectionsB";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper font-body antialiased">
      {/* ambient background stack */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-war-grid" />
        <div
          className="absolute inset-x-0 top-0 h-[70vh]"
          style={{
            background:
              "radial-gradient(60% 55% at 72% 8%, rgba(111,227,154,0.09), transparent 70%), radial-gradient(45% 40% at 15% 0%, rgba(245,185,66,0.07), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[50vh]"
          style={{
            background: "radial-gradient(55% 60% at 50% 110%, rgba(228,110,219,0.05), transparent 70%)",
          }}
        />
        <div className="floaty absolute top-[18%] left-[4%] w-1.5 h-1.5 rounded-full bg-moss/40 hidden md:block" />
        <div className="floaty absolute top-[36%] right-[6%] w-1 h-1 rounded-full bg-gold/50 hidden md:block" style={{ animationDelay: "1.4s" }} />
        <div className="floaty absolute top-[64%] left-[10%] w-1 h-1 rounded-full bg-elixir/40 hidden md:block" style={{ animationDelay: "2.6s" }} />
      </div>
      <div className="noise-layer" />

      <Nav />

      <main className="relative">
        <Hero />
        <Marquee />
        <Features />
        <LoopSection />
        <Requirements />
        <Setup />
        <Armies />
        <Recording />
        <Docs />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
