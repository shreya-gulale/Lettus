import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
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
      <Ticker />
      <Hero />
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
