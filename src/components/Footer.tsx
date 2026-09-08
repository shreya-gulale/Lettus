import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <img src={logo} alt="Lett-us Eat Healthy" className="h-20 w-auto" />
            <p className="text-sm opacity-90">Eat Fresh. Feel Great.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-100 transition-opacity">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('subscription')} className="hover:opacity-100 transition-opacity">
                  Subscription
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('menu')} className="hover:opacity-100 transition-opacity">
                  Menu
                </button>
              </li>
              <li>
                <a href="/blog" className="hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:opacity-100 transition-opacity">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Pune, India</li>
              <li>lettuseathealthy@gmail.com</li>
              <li>+91 82618 11035</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/8261811035" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/lett_us_eathealthy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90 space-y-2">
          <p className="text-base font-medium">Made fresh with love — Team Lett-Us Eat Healthy 🥗💚</p>
          <p>&copy; {new Date().getFullYear()} Lett-us Eat Healthy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
