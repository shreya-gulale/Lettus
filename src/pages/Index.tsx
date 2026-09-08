import Hero from "@/components/Hero";
import DaysFlavours from "@/components/DaysFlavours";
import About from "@/components/About";
import Subscription from "@/components/Subscription";
import Menu from "@/components/Menu";
import BlogPreview from "@/components/BlogPreview";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <DaysFlavours />
      <About />
      <div id="subscription">
        <Subscription />
      </div>
      <div id="menu">
        <Menu />
      </div>
      <BlogPreview />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <CartButton />
    </div>
  );
};

export default Index;
