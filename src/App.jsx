import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { ValueChain } from "./components/sections/ValueChain";
import { About } from "./components/sections/About";
import { Sectors } from "./components/sections/Sectors";
import { Projects } from "./components/sections/Projects";
import { Careers } from "./components/sections/Careers";
import { Footer } from "./components/sections/Footer";

export default function App() {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <ValueChain />
        <About />
        <Sectors />
        <Projects />
        <Careers />
      </main>
      <Footer />
      <h1>test</h1>
    </div>
  );
}
