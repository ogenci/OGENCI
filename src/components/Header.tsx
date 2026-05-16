import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navWidth = useTransform(scrollY, [0, 100], [isMobile ? "100%" : "100%", isMobile ? "100%" : "80%"]);
  const navPadding = useTransform(scrollY, [0, 100], [isMobile ? "0.5rem 0.5rem" : "0.8rem 0.75rem", "0.5rem 0.5rem"]);
  const navRadius = useTransform(scrollY, [0, 100], [isMobile ? "9999px" : "0px", "9999px"]);
  const navTop = useTransform(scrollY, [0, 100], [isMobile ? "12px" : "0px", isMobile ? "12px" : "16px"]);
  const navShadow = useTransform(scrollY, [0, 100], [isMobile ? "0 24px 48px -12px rgba(0,0,0,0.2)" : "none", "0 24px 48px -12px rgba(0,0,0,0.2)"]);
  const navBorder = useTransform(scrollY, [0, 100], [isMobile ? "hsl(var(--border) / 0.5)" : "hsl(var(--border) / 0)", "hsl(var(--border) / 0.5)"]);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      setIsMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative hidden md:block">
        <div className="border-b border-border py-2 px-6 flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>OGENCI · Rooted in Africa · Serving the World</span>
          <span className="hidden lg:block">Web Design · Paid Ads · AI Integrations · Global ROI</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Booking Q3 · 2026 · EN </span>
          </div>
        </div>
      </div>

      {/* Sticky Nav Wrapper */}
      <div className="sticky top-0 z-50 w-full max-w-[1600px] mx-auto px-6 xl:px-10 flex justify-center pointer-events-none">
        <motion.div
          style={{
            width: navWidth,
            borderRadius: navRadius,
            boxShadow: navShadow,
            borderColor: navBorder,
            padding: navPadding,
            top: navTop
          }}
          className="relative pointer-events-auto bg-background/80 backdrop-blur-xl border transition-colors"
        >
          <div className="w-full max-w-[1600px] mx-auto px-2">
            <nav className="flex items-center justify-between transition-all duration-300">
              <div className="flex items-center gap-4 group">
                <Link href="/" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src="/favicon.svg" alt="OGENCI Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex flex-col hidden md:flex">
                    <span className="text-xl font-display font-bold tracking-[0.3em] text-foreground uppercase leading-none mr-[-0.3em]">OGENCI</span>
                    <span className="text-[7px] font-mono text-muted-foreground uppercase tracking-[0.38em] leading-none mt-1.5 mr-[-0.38em]">Rooted in Africa · Built for the World</span>
                  </div>
                </Link>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                <Link href="/#services" onClick={(e) => handleNavClick("services", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Services <span className="text-[8px] opacity-50 mb-1">03</span>
                </Link>
                <Link href="/#pricing" onClick={(e) => handleNavClick("pricing", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Pricing <span className="text-[8px] opacity-50 mb-1">04</span>
                </Link>
                <Link href="/#process" onClick={(e) => handleNavClick("process", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Process <span className="text-[8px] opacity-50 mb-1">05</span>
                </Link>
                <Link href="/#work" onClick={(e) => handleNavClick("work", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-1">
                  Work <span className="text-[8px] opacity-50 mb-1">06</span>
                </Link>
                <Link href="/#contact" onClick={(e) => handleNavClick("contact", e)} className="px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all">
                  Contact <span className="text-[8px] opacity-50 mb-1">08</span>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/book">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 h-10 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                    style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
                  >
                    Let's Talk 
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.div>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </nav>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col px-6 py-8 md:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
                <span className="text-lg font-display font-bold tracking-widest text-foreground uppercase">OGENCI</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-muted/50 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-grow">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">Navigation</div>
              {[
                { name: "Services", id: "services", num: "03" },
                { name: "Pricing", id: "pricing", num: "04" },
                { name: "Process", id: "process", num: "05" },
                { name: "Work", id: "work", num: "06" },
                { name: "Contact", id: "contact", num: "08" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.id, e as any)}
                  className="w-fit px-4 py-2 rounded-full hover:bg-muted/50 hover:text-primary transition-all flex items-center gap-3 text-sm font-black uppercase tracking-[0.1em]"
                >
                  <span className="text-[10px] opacity-40 font-mono mb-0.5">{link.num}</span>
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-8 pb-8 border-t border-border pt-8">
              <div className="space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Get Started</div>
                <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-fit flex items-center justify-between px-8 h-11 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                    style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
                  >
                    Let's Talk
                    <ArrowUpRight className="w-4 h-4 ml-4" />
                  </motion.div>
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Socials</div>
                <div className="flex gap-10 text-xs font-mono font-bold uppercase tracking-[0.2em]">
                  <a href="https://wa.me/233263460173" target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a>
                  <a href="#" className="hover:text-primary">LinkedIn</a>
                  <a href="#" className="hover:text-primary">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
