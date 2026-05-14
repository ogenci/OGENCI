import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  Globe, Megaphone, Bot, BarChart2,
  ArrowRight, ArrowUpRight, CheckCircle2
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideRails from "@/components/SideRails";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as any
    }
  }
};

const SectionRule = ({ num, title, page }: { num: string; title: string; page: string }) => (
  <div className="flex items-center justify-between border-t border-border py-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground w-full">
    <div className="flex gap-4">
      <span>{num}</span>
      <span>{title}</span>
    </div>
    <span>{page}</span>
  </div>
);

const africanCities = [
  "Accra, Ghana", "Lagos, Nigeria", "Nairobi, Kenya", "Cape Town, South Africa",
  "Kumasi, Ghana", "Abuja, Nigeria", "Dar es Salaam, Tanzania", "Kampala, Uganda",
  "Dakar, Senegal", "Lusaka, Zambia", "Johannesburg, South Africa", "Tamale, Ghana",
];

const testimonials = [
  {
    quote: "OGENCI redesigned our e-commerce site and our conversion rate jumped 340% in 60 days. They understand the Ghanaian market deeply.",
    name: "Ama Asante",
    role: "Founder, Kente and Co, Accra",
    initial: "A",
  },
  {
    quote: "Their Meta Ads campaigns cut our cost per lead by 60% while tripling our sales pipeline. Best investment we have made as a startup.",
    name: "Kofi Mensah",
    role: "CEO, BuildRight Ghana, Kumasi",
    initial: "K",
  },
  {
    quote: "The AI chatbot OGENCI built handles 70% of our customer queries automatically. Our support team can now focus on complex cases.",
    name: "Abena Owusu",
    role: "Operations Lead, AfriPay, Accra",
    initial: "A",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [pricingService, setPricingService] = useState('Web Design');

  const pricingPlans = {
    'Web Design': [
      { 
        name: 'Starter Site', price: '750', isMonthly: false,
        desc: 'Performance-optimized single-page landing site for maximum conversion.',
        features: ['UI/UX Strategy', 'Mobile-First Design', 'SEO Optimization', '1 Revision Round', '3-Day Delivery']
      },
      { 
        name: 'Growth Site', price: '1,800', isMonthly: false,
        desc: 'Full multi-page ecosystem with custom CMS and performance logic.',
        features: ['Full Design System', 'Custom CMS Setup', 'Conversion Copywriting', 'Speed Optimization', 'Priority Launch'],
        popular: true
      },
      { 
        name: 'Enterprise', price: '3,500', isMonthly: false,
        desc: 'High-scale e-commerce or custom web platform for global brands.',
        features: ['Full Funnel Arch.', 'Payment Gateway Int.', 'Advanced Analytics', 'Unlimited Revisions', '24/7 Tech Support']
      },
    ],
    'Paid Ads': [
      { 
        name: 'Single Channel', price: '500', isMonthly: true,
        desc: 'Focus on Meta or Google Ads to drive targeted traffic fast.',
        features: ['Single Platform Opt.', 'Ad Creative (3 sets)', 'Pixel/Tag Setup', 'Weekly Reporting', 'Budget Optimization']
      },
      { 
        name: 'Omnichannel', price: '1,200', isMonthly: true,
        desc: 'Integrated Meta + Google + TikTok strategy for massive reach.',
        features: ['Multi-Channel Funnel', 'Dynamic Creative', 'Full Attribution', 'Bi-Weekly Strategy', 'Audience Scaling'],
        popular: true
      },
      { 
        name: 'Performance Max', price: '2,500', isMonthly: true,
        desc: 'Full-funnel takeover with massive ad spend scale and precision.',
        features: ['Full Media Buying', 'High-Prod Creative', 'Competitor Hijacking', 'Daily Optimization', 'Dedicated Media Lead']
      },
    ],
    'AI Integrations': [
      { 
        name: 'AI Chatbot', price: '800', isMonthly: true,
        desc: '24/7 customer support and lead qualification for WhatsApp/Web.',
        features: ['Custom Training', 'Lead Qual Flow', 'WhatsApp/Web Int.', 'Analytics Dashboard', 'Monthly Retraining']
      },
      { 
        name: 'Automation Hub', price: '1,800', isMonthly: true,
        desc: 'End-to-end workflow and CRM automation for your sales team.',
        features: ['CRM Integration', 'Automated Follow-ups', 'Custom API Connect', 'Error Monitoring', 'Team AI Training'],
        popular: true
      },
      { 
        name: 'AI Lab', price: '3,800', isMonthly: true,
        desc: 'Custom AI model training and agent deployment for your enterprise.',
        features: ['Private Model Train', 'Custom Agent Dev', 'Workflow Overhaul', 'Legacy App Int.', '24/7 Dedicated Ops']
      },
    ]
  };
  const [activePill, setActivePill] = useState(0);

  return (
    <div className="relative min-h-screen bg-background text-foreground">

      <SideRails />

      <Header />

        <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">

        <main>

          {/* SEC 1: Hero */}
          <section id="top" className="py-24 px-6 flex flex-col items-center text-center overflow-hidden relative">
            {/* Background elements for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-5xl mx-auto flex flex-col items-center"
            >
              <motion.div
                variants={float}
                initial="initial"
                animate="animate"
                className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Digital Agency · Rooted in Africa · Built for the World
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tight mb-8 text-foreground max-w-4xl">
                Websites that <em className="italic font-normal text-primary">convert</em>, ads that <em className="italic font-normal text-primary">pay ROIs</em>, AI that <em className="italic font-normal text-primary">scales</em>.
              </h1>

              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed mb-12 max-w-2xl font-bold">
                Beautiful websites and expensive ads don't scale businesses—revenue does. OGENCI builds the high-converting digital infrastructure that turns your traffic into predictable, data-backed profit globally.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cal-namespace="lets-talk"
                  data-cal-link="ogenci/lets-talk"
                  data-cal-config='{"layout":"month_view"}'
                  className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] font-mono inline-flex items-center gap-3 shadow-[0_20px_50px_-15px_rgba(186,230,55,0.3)] cursor-pointer"
                  style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
                >
                  Let's Talk 
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
                <motion.a
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  href="#work"
                  className="px-8 py-4 rounded-full border border-border font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 text-[10px] font-mono text-foreground transition-colors"
                >
                  See Our Work 
                  <motion.span variants={{ initial: { x: 0 }, hover: { x: 5 } }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </div>




              <div className="mt-12 flex items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-background/50 backdrop-blur-sm px-4 py-2 border border-border rounded-full">
                <span>Strategy · Design · Ads · AI · Growth</span>
                <span className="opacity-30">|</span>
                <span>Rooted in Africa · Serving the World</span>
              </div>
            </motion.div>
          </section>

          {/* SEC 3: Why OGENCI */}
          <section id="why" className="px-6 pt-16 pb-32 bg-[#f4f1ea] border-y border-border/50">
            <div className="max-w-[1400px] mx-auto">
              <SectionRule num="II." title="Why OGENCI · Performance Marketing · Global Scale" page="002/008" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-xl"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-12">
                  Why OGENCI · 02
                </div>
                <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight mb-10 text-foreground">
                  We treat <em className="italic font-normal font-serif text-primary">your business</em> like a <em className="italic font-normal font-serif">growth partner</em>, not a billable hour.
                </h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed mb-10 font-bold">
                  Stop paying for <span className="text-primary">pretty pages</span> and vanity metrics. OGENCI replaces guesswork with <span className="text-primary">high-converting pipelines</span> engineered for global performance. We optimize every site, ad, and automation for international user behaviors and seamless scaling to lower your acquisition costs and maximize your revenue.
                </p>
                <motion.a 
                  initial="initial"
                  whileHover="hover"
                  href="#process" 
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-primary transition-all"
                >
                  See how we work 
                  <motion.span variants={{ initial: { x: 0 }, hover: { x: 5 } }}>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="rounded-[40px] overflow-hidden aspect-square shadow-2xl border border-white/20">
                  <img
                    src="/ogenci_digital_hub_collage.png"
                    alt="Digital Hub & Growth Engine"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Side Tag in Screenshot */}
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 hidden xl:block">
                   <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground whitespace-nowrap">
                     OGENCI · Digital Growth · 2026
                   </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

               {/* SEC 4: Services */}
          <section id="services" className="px-6 pt-24 pb-32 bg-card border-b border-border/50">
            <div className="max-w-[1400px] mx-auto">
              <SectionRule num="III." title="Services · Growth Pipelines · Performance Marketing" page="003/008" />

              <div className="mt-20 mb-24">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight text-foreground max-w-5xl"
                >
                  Everything needed to <em className="italic font-normal font-serif text-primary">dominate</em> digital markets <em className="italic font-normal font-serif">globally</em>.
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
                {[
                  {
                    num: "01",
                    tag: "Web Design",
                    title: "Conversion Architecture",
                    desc: "High-performance, conversion-first digital ecosystems engineered for global brands. We don't just build websites; we build predictable revenue machines that work anywhere.",
                    features: ["UI/UX Strategy", "Mobile-First Dev", "Speed Optimization", "Conversion Flow"]
                  },
                  {
                    num: "02",
                    tag: "Paid Ads",
                    title: "Performance Marketing",
                    desc: "Surgical Meta, Google, and TikTok ad campaigns that reach your ideal customer at the lowest cost. We focus exclusively on ROAS and pipeline value, not vanity metrics like 'likes' or 'shares'.",
                    features: ["Ad Creative", "Media Buying", "Funnel Building", "Data Attribution"]
                  },
                  {
                    num: "03",
                    tag: "AI Integrations",
                    title: "AI & Automation Lab",
                    desc: "Deploy custom AI agents that handle lead qualification, customer support, and sales follow-ups 24/7. Reclaim 40% of your team's time and ensure no lead ever goes cold again.",
                    features: ["AI Chatbots", "Workflow Automation", "CRM Integration", "Custom AI Agents"]
                  }
                ].map(({ num, tag, title, desc, features }) => (
                  <motion.div 
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-background p-10 flex flex-col justify-between group hover:bg-muted/30 transition-colors cursor-default"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-12">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary">{tag}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{num}</span>
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-6 text-foreground group-hover:text-primary transition-colors">{title}</h3>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground leading-relaxed mb-10">
                        {desc}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {features.map(f => (
                        <div key={f} className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SEC 5: Pricing */}
          <section id="pricing" className="px-6 pt-24 pb-32 bg-[#f4f1ea] border-y border-border/50">
            <div className="max-w-[1400px] mx-auto">
              <SectionRule num="IV." title="Pricing · Investment Packages · Growth Pipelines" page="004/008" />

              <div className="mt-20 mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight text-foreground max-w-3xl"
                >
                  Pricing built for <em className="italic font-normal font-serif text-primary">scale</em>, not for <em className="italic font-normal font-serif">billing hours</em>.
                </motion.h2>
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground pb-4 border-b border-border">
                  Monthly retainers · No hidden fees · Global Standards
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-20">
                {['Web Design', 'Paid Ads', 'AI Integrations'].map((service) => (
                  <button
                    key={service}
                    onClick={() => setPricingService(service)}
                    className={`px-8 py-3 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${pricingService === service ? 'bg-foreground text-background border-foreground shadow-lg' : 'bg-background text-foreground border-border hover:border-primary'}`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={pricingService}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
                >
                  {(pricingPlans[pricingService as keyof typeof pricingPlans] || []).map((plan) => (
                    <motion.div 
                      key={plan.name}
                      data-cursor="plan"
                      className={`relative p-10 flex flex-col justify-between border-2 transition-all duration-500 ${plan.popular ? 'bg-foreground text-background border-primary shadow-2xl scale-105 z-10' : 'bg-background text-foreground border-border hover:border-primary'}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-primary text-background rounded-full">
                          Most Popular
                        </div>
                      )}
                      <div>
                        <div className="mb-8">
                          <h3 className="text-xl font-display font-bold uppercase tracking-widest mb-2">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[24px] font-display font-light">$</span>
                            <span className="text-[64px] font-display font-bold tracking-tight">{plan.price}</span>
                            {plan.isMonthly && (
                              <span className="text-xs font-mono uppercase tracking-widest opacity-60">/mo</span>
                            )}
                          </div>
                        </div>
                        <p className={`text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed mb-10 ${plan.popular ? 'text-background/70' : 'text-muted-foreground'}`}>
                          {plan.desc}
                        </p>
                        <div className="space-y-4 mb-12">
                          {plan.features.map(f => (
                            <div key={f} className={`flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest border-t pt-4 ${plan.popular ? 'border-background/10' : 'border-border'}`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full cursor-not-allowed">
                        <button 
                          disabled
                          className={`w-full py-4 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] cursor-not-allowed ${
                            plan.popular 
                              ? 'bg-background/10 text-background/50' 
                              : 'bg-foreground/10 text-foreground/50'
                          }`}
                        >
                          Booked out for the month
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {pricingService === 'Web Design' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 p-8 border border-border bg-background flex flex-col md:flex-row items-center justify-between gap-8 rounded-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold mb-1">Optional Website Management</h4>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Keep your site fast, secure, and always updated.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-display">$</span>
                      <span className="text-4xl font-display font-bold">150</span>
                      <span className="text-[10px] font-mono text-muted-foreground">/MO</span>
                    </div>
                    <div className="cursor-not-allowed">
                      <button disabled className="px-8 py-3 bg-foreground/10 text-foreground/50 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] cursor-not-allowed">
                        Unavailable
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* SEC 6: Process */}
          <section id="process" className="px-6 pt-24 pb-32 border-t border-border">
            <SectionRule num="V." title="Our Process · Discovery · Strategy · Build · Launch" page="005/008" />

            <div className="mt-20 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight">
                From <em className="italic font-normal">brief</em> to breakthrough in four focused stages.
              </motion.h2>
              <div className="flex gap-6 max-w-sm">
                <span className="text-2xl font-light mt-[-4px]" style={{ color: "hsl(77, 100%, 38%)" }}>+</span>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed font-bold">
                  Every project follows our proven four-stage growth framework, research-first, data-validated, and built for a global audience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 mb-24 border-t border-l border-border">
              {[
                {
                  num: "01", title: "Discover",
                  desc: "Deep-dive into your business, audience, competitors, and market. We analyze your current digital presence and map the exact gaps holding your growth back.",
                  visual: (
                    <div className="bg-background border border-border rounded shadow-sm p-3 w-full text-[10px] font-mono space-y-1">
                      <div className="font-semibold" style={{ color: "hsl(77, 100%, 35%)" }}>Audience Research</div>
                      <div className="text-muted-foreground">Market Analysis</div>
                      <div className="text-muted-foreground">Global Market Analysis</div>
                      <div className="text-muted-foreground">Conversion Gap Mapping</div>
                    </div>
                  ),
                },
                {
                  num: "02", title: "Strategise",
                  desc: "We build a custom growth strategy with clear KPIs, channel mix, and budget allocation specific to your industry and global target market.",
                  visual: (
                    <div className="bg-background border border-border rounded shadow-sm p-3 w-full space-y-2">
                      <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "hsl(77, 100%, 80%)" }} />
                      <div className="h-2 w-full bg-border rounded-full" />
                      <div className="h-2 w-1/2 bg-border rounded-full" />
                      <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: "hsl(77, 100%, 60%)" }} />
                    </div>
                  ),
                },
                {
                  num: "03", title: "Build",
                  desc: "Execution: website development, ad creative production, AI integration, and SEO setup, all optimised for international conversion standards.",
                  visual: (
                    <div className="grid grid-cols-2 gap-1 w-full h-20">
                      <div className="bg-foreground rounded-sm" />
                      <div className="rounded-sm" style={{ backgroundColor: "hsl(77, 100%, 38%)" }} />
                      <div className="bg-card border border-border rounded-sm flex items-center justify-center">
                        <div className="w-3/4 h-1 bg-border rounded-full" />
                      </div>
                      <div className="bg-muted rounded-sm border border-border" />
                    </div>
                  ),
                },
                {
                  num: "04", title: "Launch and Scale",
                  desc: "Go live, monitor performance daily, optimise weekly. We provide transparent reporting dashboards and quarterly strategic reviews as your business grows.",
                  visual: (
                    <div className="bg-background border border-border rounded shadow-sm w-full h-20 flex flex-col overflow-hidden">
                      <div className="border-b border-border h-4 bg-muted flex items-center px-2 gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-border" />)}
                      </div>
                      <div className="flex-1 p-2 flex items-end gap-0.5">
                        {[30, 45, 40, 60, 55, 75, 70, 90].map((h, i) => (
                          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: "hsl(77, 100%, 38%)", opacity: 0.7 + i * 0.04 }} />
                        ))}
                      </div>
                    </div>
                  ),
                },
              ].map(({ num, title, desc, visual }) => (
                <div key={num} className="border-r border-b border-border p-6 sm:p-8 flex flex-col h-full bg-background hover:bg-card transition-colors group">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6 flex justify-between">
                    <span>{num}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                    {title} <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed mb-10 flex-grow font-bold">{desc}</p>
                  <div className="aspect-[4/3] bg-border/20 rounded-sm border border-border flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:8px_8px] opacity-[0.03]" />
                    {visual}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-border shrink-0" />
                <span>Research-first. Results-obsessed. Rooted in Africa. Built for the World.</span>
              </div>
              <button 
                data-cal-namespace="lets-talk"
                data-cal-link="ogenci/lets-talk"
                data-cal-config='{"layout":"month_view"}'
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Schedule your strategy call today
              </button>
            </div>
          </section>

          {/* SEC 7: Work / Dark */}
          <section id="work" className="dark bg-background text-foreground px-6 py-24">
            <SectionRule num="VI." title="Featured Work · Web Design · Ads · AI · 2024 / 2025" page="006/008" />

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8">Selected work</div>
                <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.05] tracking-tight mb-8">
                  Websites and campaigns that <em className="italic font-normal text-muted-foreground">move</em> the business needle.
                </h2>
                <button 
                  data-cal-namespace="lets-talk"
                  data-cal-link="ogenci/lets-talk"
                  data-cal-config='{"layout":"month_view"}'
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold border-b border-border pb-1 hover:text-muted-foreground transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  Let's Talk <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    tag: "Enterprise Redesign · 01 / 05", meta: "2026 · LOGISTICS · GHANA",
                    title: "Jonmoore",
                    desc: "Premium conceptual redesign for West Africa's leading heavy logistics provider. Optimized for high-ticket B2B quote conversions.",
                    bg: "#f3f4f6", text: "#0a0a0a",
                  },
                  {
                    tag: "Enterprise Redesign · 02 / 05", meta: "2025 · EDUCATION · GHANA",
                    title: "ISA Ghana",
                    desc: "Premium digital transformation for the International School of Accra. Streamlined admissions funnel and immersive visual storytelling.",
                    bg: "hsl(77, 100%, 38%)", text: "#0a0a0a",
                  },
                  {
                    tag: "Supply Chain Solutions · 03 / 05", meta: "2025 · LOGISTICS · GHANA",
                    title: "BJH Logistics",
                    desc: "Full-scale digital platform for a premium logistics firm. Integrated tracking, custom portal, and optimized booking flows.",
                    bg: "#0a0a0a", text: "#ffffff",
                    externalUrl: "https://bjh-logistics.vercel.app/"
                  },
                  {
                    tag: "Educational Branding · 04 / 05", meta: "2025 · EDUCATION · GHANA",
                    title: "Accra Grammar",
                    desc: "Complete digital identity and enrollment platform for one of Ghana's leading schools. Modern, accessible, and high-converting.",
                    bg: "#ffffff", text: "#0a0a0a",
                    externalUrl: "https://accra-grammar-school.vercel.app/"
                  },
                  {
                    tag: "K-12 Digital Platform · 05 / 05", meta: "2024 · EDUCATION · GHANA",
                    title: "Rich Jane School",
                    desc: "An immersive, community-focused website for a premier preschool and primary institution. Optimized for parent engagement.",
                    bg: "hsl(77, 100%, 38%)", text: "#0a0a0a",
                    externalUrl: "https://rich-jane-school.vercel.app/"
                  },
                  {
                    tag: "Digital Transformation · 2025", meta: "NON-PROFIT · GLOBAL",
                    title: "Wesleyan CM",
                    desc: "A unified global digital sanctuary for a multi-national ministry. High-bandwidth streaming and global donation systems.",
                    bg: "#0a0a0a", text: "#ffffff",
                    externalUrl: "https://wesleyancm.org/"
                  },
                ].map(({ tag, meta, title, desc, bg, text, externalUrl }) => (
                  externalUrl ? (
                    <a key={title} href={externalUrl} target="_blank" rel="noopener noreferrer" className="group cursor-pointer" data-cursor="view">
                      <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-xl border border-[hsl(var(--border))]" style={{ backgroundColor: bg, color: text }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{tag}</div>
                          <div className="text-4xl font-display font-bold italic">{title}</div>
                          <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-70 max-w-xs leading-relaxed">{desc}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        <div>{tag}</div>
                        <div>{meta}</div>
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground leading-relaxed max-w-sm">{desc}</p>
                    </a>
                  ) : (
                    <Link key={title} href={`/work/${title.toLowerCase().replace(/ /g, '-')}`}>
                      <div className="group cursor-pointer" data-cursor="view">
                        <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-xl border border-[hsl(var(--border))]" style={{ backgroundColor: bg, color: text }}>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 mb-4">{tag}</div>
                            <div className="text-4xl font-display font-bold italic">{title}</div>
                            <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-70 max-w-xs leading-relaxed">{desc}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-baseline mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                          <div>{tag}</div>
                          <div>{meta}</div>
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground leading-relaxed max-w-sm">{desc}</p>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="mt-16 flex justify-end gap-2">
              <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* SEC 8: Testimonials */}
          <section className="px-6 pt-24 pb-12">
            <SectionRule num="VII." title="Client Stories · Global Partnerships · ROI Driven" page="007/008" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-12">
                  Client stories · No. 06
                </div>

                <div className="relative min-h-[200px] mb-4">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="transition-all duration-700"
                      style={{ opacity: i === activeTab ? 1 : 0, position: i === activeTab ? "relative" : "absolute", top: 0 }}
                    >
                      <h2 className="text-3xl md:text-[42px] font-display font-bold leading-[1.1] tracking-tight mb-10 max-w-3xl">
                        "{t.quote}"
                      </h2>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-16 mt-4">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display text-xl font-bold">
                    {testimonials[activeTab].initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonials[activeTab].name}</div>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-1">{testimonials[activeTab].role}</div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ backgroundColor: i === activeTab ? "hsl(77, 100%, 38%)" : "#e5e7eb" }}
                      />
                    ))}
                  </div>
                </div>


                <button 
                  data-cal-namespace="lets-talk"
                  data-cal-link="ogenci/lets-talk"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold border-b border-border pb-1 hover:text-primary transition-colors mt-12 cursor-pointer"
                >
                  Let's Talk <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <div className="corner-marks p-6 h-full flex flex-col justify-center border border-border/50">
                  <div className="border border-border overflow-hidden">
                    <div className="p-8 flex flex-col justify-between bg-foreground text-background">
                      <div className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-8">Results snapshot · 2025</div>
                      <div className="space-y-5">
                        {[
                          { label: "Avg. Conversion Rate Lift", val: "+284%" },
                          { label: "Average ROAS (Paid Ads)", val: "3.8x" },
                          { label: "Queries Automated (AI)", val: "70%+" },
                          { label: "Client Retention Rate", val: "94%" },
                        ].map(({ label, val }) => (
                          <div key={label} className="flex justify-between items-baseline border-b border-background/10 pb-4">
                             <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-50">{label}</span>
                            <span className="text-xl font-display font-bold" style={{ color: "hsl(77, 100%, 50%)" }}>{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest opacity-30 mt-8">OGENCI Digital · Global HQ: Accra, Ghana</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SEC 9: CTA */}
          <section id="contact" className="px-6 pt-8 pb-32">
            <SectionRule num="VIII." title="Contact · Start Your Project · Ghana and Africa" page="008/008" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8">
                  Start a conversation · No. 07
                </div>
                <h2 className="text-5xl md:text-[68px] font-display font-bold leading-[1.02] tracking-tight mb-8">
                  Let's build something <em className="italic font-normal">open</em> and <em className="italic font-normal">unforgettable</em> together.
                </h2>
                  Ready to grow your business with a top-tier global digital agency? Whether you need a high-converting website, paid ad campaigns that actually deliver ROI, or AI systems that scale your operations, OGENCI is your partner for global digital growth.

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {[
                    "Premium Web Design & Strategy",
                    "Custom paid ads strategy",
                    "AI integration roadmap",
                    "No lock-in contracts",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(77, 100%, 38%)" }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                  <button
                    data-cal-namespace="lets-talk"
                    data-cal-link="ogenci/lets-talk"
                    data-cal-config='{"layout":"month_view"}'
                    className="px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] font-mono inline-flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                    style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a", boxShadow: "0 14px 26px -16px hsl(77, 100%, 38%)" }}
                  >
                    Let's Talk <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/233263460173"
                    target="_blank" rel="noreferrer noopener"
                    className="px-8 py-4 rounded-full border border-border font-bold uppercase tracking-[0.2em] text-[10px] font-mono hover:bg-card transition-colors inline-flex items-center gap-2 text-foreground"
                  >
                    WhatsApp us <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex flex-wrap gap-6">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Available for new projects
                  </span>
                  <span>hello@ogenci.com</span>
                  <span>5.6003 N · 0.1969 W · Accra</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <div className="corner-marks p-4 border border-border bg-card">
                  <div className="p-8 space-y-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Quick enquiry</div>
                    {[
                      { label: "Your name", placeholder: "Kwame Asante", type: "text" },
                      { label: "Business name", placeholder: "BuildRight Ghana Ltd", type: "text" },
                      { label: "Email address", placeholder: "kwame@yourcompany.com.gh", type: "email" },
                      { label: "Phone or WhatsApp", placeholder: "+233 XX XXX XXXX", type: "tel" },
                    ].map(({ label, placeholder, type }) => (
                      <div key={label}>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-gray-400 transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Service needed</label>
                      <div className="flex flex-wrap gap-2">
                        {["Web Design", "Paid Ads", "AI Integration", "Full Package"].map(s => (
                          <button key={s} className="px-3 py-1.5 rounded-full border border-border text-xs font-medium hover:border-gray-900 transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] font-mono hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "hsl(77, 100%, 38%)", color: "#0a0a0a" }}
                    >
                      Send Message
                    </button>
                    <p className="text-[10px] text-muted-foreground text-center font-mono">We reply within 2 hours on business days · Accra, GMT+0</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

      </div>
    </div>
  );
}
