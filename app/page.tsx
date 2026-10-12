import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Fuse } from "@/components/fuse";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Fuse />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
