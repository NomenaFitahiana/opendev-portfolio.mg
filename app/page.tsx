import { Header, HeroSection, Process, Projects, Testimonials, FAQSection, CallToAction, Footer } from "@/components/landing";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Process />
        <Projects />
        {/* <TechStack /> */}
        <Testimonials />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
