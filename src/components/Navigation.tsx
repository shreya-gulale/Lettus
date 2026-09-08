import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: "Home", type: "route", path: "/" },
    { label: "Menu", type: "scroll", id: "menu" },
    { label: "Plans", type: "scroll", id: "subscription" },
    { label: "Blog", type: "route", path: "/blog" },
    { label: "Contact", type: "scroll", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img src={logo} alt="Lett-Us Eat Healthy" className="h-12 w-12" />
            <span className="font-display font-bold text-lg text-foreground hidden sm:inline">
              Lett-Us Eat Healthy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              item.type === "route" ? (
                <Link
                  key={item.path}
                  to={item.path!}
                  className={`font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col gap-2 px-4">
            {navigationItems.map((item) => (
              item.type === "route" ? (
                <Link
                  key={item.path}
                  to={item.path!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className="font-medium text-left px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
