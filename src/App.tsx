import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { ValueChain } from "./components/sections/ValueChain";
import { About } from "./components/sections/About";
import { Sectors } from "./components/sections/Sectors";
import { Projects } from "./components/sections/Projects";
import { Careers } from "./components/sections/Careers";
import { Footer } from "./components/sections/Footer";
import { ModalRoot, useModal } from "./components/ui/modal-context";
import { ContactModal } from "./components/ui/contact-modal";
import { RolesModal } from "./components/ui/roles-modal";

function ActiveModal() {
  const { modal } = useModal();
  if (modal === "contact") return <ContactModal />;
  if (modal === "roles") return <RolesModal />;
  return null;
}

export default function App() {
  return (
    <ModalRoot>
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
      <ActiveModal />
    </ModalRoot>
  );
}
