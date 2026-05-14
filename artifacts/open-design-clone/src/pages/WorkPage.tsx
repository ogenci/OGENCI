import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowUpRight, TrendingUp, Target } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideRails from "@/components/SideRails";

const caseStudies = {
  "jonmoore": {
    client: "Jonmoore International",
    tagline: "Moving the Impossible Across West Africa",
    industry: "Heavy Logistics",
    location: "Tema, Ghana",
    service: "Enterprise Redesign",
    year: "2026 (Concept)",
    challenge: "Jonmoore executes 600-ton cargo operations that nobody else will touch, but their legacy website (jonmoore.com.gh) failed to reflect their 25+ years of ISO-certified authority. The outdated UI/UX obscured their prestigious BigMove Excellence Awards and created friction for high-value enterprise clients trying to request complex quotes.",
    solution: "We architected a premium, editorial-style digital experience that translates their physical engineering precision into a digital interface. By introducing a streamlined, conversion-optimized 'Request a Quote' flow and emphasizing their pristine safety record (1.2M+ man-hours without incident), the platform is designed to instantly convert high-ticket B2B leads.",
    stats: [
      { label: "Proj. Lead Lift", value: "185%" },
      { label: "Est. Bounce Drop", value: "-42%" },
      { label: "Brand Trust", value: "10x" },
    ],
    quote: "Most logistics partners are great until something goes wrong. We needed a digital presence that screams absolute reliability before the client even speaks to us.",
    author: "Hilton John Mitchell",
    role: "Chief Executive Officer"
  },
  "isa-ghana": {
    client: "International School of Accra",
    tagline: "Redefining Premium Education in West Africa",
    industry: "Education",
    location: "Accra, Ghana",
    service: "Enterprise Redesign",
    year: "2025",
    challenge: "The International School of Accra provides world-class blended curricula (Cambridge & IB), but their previous digital presence did not reflect the prestige of their institution. The admissions flow was disjointed, and the platform struggled to clearly communicate their unique value proposition to high-net-worth parents and expatriates.",
    solution: "We executed a full-scale enterprise redesign, transforming the platform into an immersive, editorial-style experience. By implementing a seamless, conversion-optimized admissions funnel and high-fidelity visual storytelling, we positioned ISA as the undisputed leader in progressive education in Ghana.",
    stats: [
      { label: "Admissions Lift", value: "+125%" },
      { label: "Prospect Engagement", value: "3.2x" },
      { label: "Mobile Bounce Rate", value: "-60%" },
    ],
    quote: "OGENCI completely elevated our digital presence. The new platform immediately commands the prestige our curriculum delivers, drastically increasing qualified admissions inquiries.",
    author: "Admissions Director",
    role: "International School of Accra"
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function WorkPage() {
  const [, params] = useRoute("/work/:slug");
  const slug = params?.slug || "jonmoore";
  
  // For demonstration, fallback to jonmoore if not found
  const data = caseStudies[slug as keyof typeof caseStudies] || caseStudies["jonmoore"];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <SideRails />
      <Header />

      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        <main>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] opacity-80 z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        </motion.div>

        <div className="relative z-20 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-white/70 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Case Study · {data.client}
            </div>
            
            <h1 className="text-5xl md:text-[8vw] font-display font-bold leading-[0.95] tracking-tighter mb-8 max-w-4xl">
              {data.tagline}
            </h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-12 left-0 w-full px-6 flex justify-between items-end text-[10px] font-mono uppercase tracking-widest text-white/50 z-20 max-w-[1600px] mx-auto right-0"
        >
          <div className="flex flex-col gap-2">
            <span>Industry: <strong className="text-white">{data.industry}</strong></span>
            <span>Location: <strong className="text-white">{data.location}</strong></span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span>Services: <strong className="text-white">{data.service}</strong></span>
            <span>Year: <strong className="text-white">{data.year}</strong></span>
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="bg-background text-foreground relative z-30">
        
        {/* The Challenge & Solution */}
        <section className="px-6 py-32 border-b border-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            <div className="md:col-span-5 md:col-start-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
                  <Target className="w-4 h-4 text-primary" /> The Challenge
                </h3>
                <p className="text-2xl md:text-3xl font-display leading-[1.3] text-foreground">
                  {data.challenge}
                </p>
              </motion.div>
            </div>
            
            <div className="md:col-span-5 md:col-start-7">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
                  <ArrowUpRight className="w-4 h-4 text-primary" /> The Solution
                </h3>
                <p className="text-base font-mono leading-relaxed text-muted-foreground uppercase tracking-wider font-bold">
                  {data.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact / Stats Grid */}
        <section className="px-6 py-32 bg-[#f4f1ea] border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Business Impact</h2>
              <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">Measurable growth engineered for scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border shadow-xl">
              {data.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background p-16 flex flex-col items-center justify-center text-center group hover:bg-card transition-colors"
                >
                  <TrendingUp className="w-6 h-6 text-primary mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="text-6xl md:text-[84px] font-display font-bold tracking-tighter text-foreground mb-4" style={{ color: "hsl(77, 100%, 38%)" }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Showcase Placeholder */}
        <section className="py-32 px-6 overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
             <div className="flex flex-col md:flex-row gap-8">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 aspect-[4/3] bg-muted border border-border rounded-xl overflow-hidden relative group">
                 <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">Premium Visual Asset 01</span>
                 </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex-1 aspect-[4/5] bg-foreground text-background border border-border rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 font-bold">Mobile Experience Showcase</span>
                 </div>
               </motion.div>
             </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="px-6 py-32 bg-primary/5 border-y border-border">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold mb-12">Client Feedback</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-[1.2] tracking-tight mb-12 text-foreground">
                "{data.quote}"
              </h2>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display text-xl font-bold mb-2">
                  {data.author.charAt(0)}
                </div>
                <div className="font-bold">{data.author}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{data.role}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next Project / CTA */}
        <section className="px-6 py-40 flex flex-col items-center text-center relative overflow-hidden bg-[#0a0a0a] text-white">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[200px]" />
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-3xl">
            <h2 className="text-5xl md:text-[84px] font-display font-bold leading-none tracking-tight mb-8">
              Ready to <em className="italic font-normal text-primary">scale?</em>
            </h2>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-12 font-bold leading-relaxed max-w-xl mx-auto">
              Stop guessing. Start growing. Get a data-driven strategy custom-built for your business and the African market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit">
                <button className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono transition-transform hover:scale-105" style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}>
                  Book Your Free Audit <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/">
                <button className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 text-[10px] font-mono text-white border border-white/20 hover:bg-white/10 transition-colors">
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
