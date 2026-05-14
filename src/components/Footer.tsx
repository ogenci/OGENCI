import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 pt-16 pb-10 text-[#0a0a0a]" style={{ backgroundColor: "#eae5d9" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 max-w-[1600px] mx-auto">
        <div className="lg:col-span-2">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight mb-4 block">
            OGENCI<span className="text-primary">.</span>
          </Link>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/70 leading-relaxed mb-6 max-w-xs">
            A premier global digital agency rooted in Africa. We build high-converting digital ecosystems, run ROI-driven ad campaigns, and deploy AI systems that scale businesses worldwide.
          </p>
          <button
            data-cal-namespace="lets-talk"
            data-cal-link="ogenci/lets-talk"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
          >
            Let's Talk <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {[
          {
            title: "Services",
            links: [
              { name: "Global Web Design", href: "/#services" },
              { name: "Paid Ads & ROI", href: "/#services" },
              { name: "AI Integrations", href: "/#services" },
              { name: "Growth Strategy", href: "/#services" },
              { name: "Performance SEO", href: "/#services" }
            ],
          },
          {
            title: "Company",
            links: [
              { name: "About OGENCI", href: "/#why" },
              { name: "Our Work", href: "/#work" },
              { name: "Case Studies", href: "/#work" },
              { name: "Process", href: "/#process" },
              { name: "Blog", href: "/#work" }
            ],
          },
          {
            title: "Connect",
            links: [
              { name: "hello@ogenci.com", href: "mailto:hello@ogenci.com" },
              { name: "WhatsApp", href: "https://wa.me/233263460173", target: "_blank" },
              { name: "LinkedIn", href: "#", target: "_blank" },
              { name: "Instagram", href: "#", target: "_blank" },
              { name: "Twitter / X", href: "#", target: "_blank" }
            ],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#0a0a0a]/50 mb-6 font-semibold">{title}</h5>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.name}>
                  <a 
                    href={l.href} 
                    target={l.target}
                    rel={l.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#0a0a0a] hover:text-primary transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="py-8 md:py-16 w-full overflow-hidden max-w-[1600px] mx-auto">
        <div className="flex justify-between items-baseline w-full select-none" style={{ fontSize: "clamp(6rem, 20vw, 28rem)", lineHeight: 0.75 }}>
          <span className="font-display font-black text-[#0a0a0a]">O</span>
          <span className="font-display font-black text-[#0a0a0a]">G</span>
          <span className="font-serif italic font-medium" style={{ color: "hsl(77, 100%, 38%)" }}>E</span>
          <span className="font-serif italic font-medium" style={{ color: "hsl(77, 100%, 38%)" }}>N</span>
          <span className="font-serif italic font-medium" style={{ color: "hsl(77, 100%, 38%)" }}>C</span>
          <span className="font-serif italic font-medium" style={{ color: "hsl(77, 100%, 38%)" }}>I</span>
          <span className="font-display font-black text-[#0a0a0a]">.</span>
        </div>
      </div>

      <div className="border-t border-[#0a0a0a]/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#0a0a0a]/60 max-w-[1600px] mx-auto">
        <span>© OGENCI Digital Agency 2026 · Global HQ: Accra, Ghana · All rights reserved</span>
        <span className="hidden md:block">Web Design · Paid Ads · AI Integrations · Serving Worldwide</span>
        <img src="/favicon.svg" alt="OGENCI" className="w-5 h-5 object-contain" />
      </div>
    </footer>
  );
}
