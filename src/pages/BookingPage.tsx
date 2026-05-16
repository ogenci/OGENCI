import { motion } from "framer-motion";
import Cal from "@calcom/embed-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative">
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full text-[10px] font-mono mb-8 uppercase tracking-widest text-muted-foreground bg-background/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Strategy · Discovery · ROI
            </div>
            
            <h1 className="text-5xl md:text-[84px] font-display font-bold leading-[1.02] tracking-tighter mb-8 text-foreground">
              Ready to <em className="italic font-normal text-primary">dominate</em> your market?
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed max-w-2xl font-bold">
              Stop guessing. Start growing. Select a time below for a high-impact, no-nonsense strategy audit. We'll diagnose your digital infrastructure and map the exact blueprint required to scale your business globally.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto border border-border rounded-3xl overflow-hidden bg-card min-h-[700px] shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] pointer-events-none" />
            <Cal
              namespace="lets-talk"
              calLink="ogenci/lets-talk"
              style={{ width: "100%", height: "100%", minHeight: "700px" }}
              config={{ layout: "month_view" }}
            />
          </motion.div>
          
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-12">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Next available slots: Q3 2026
            </div>
            <div>
              GMT +0 · Accra, Ghana · Worldwide
            </div>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
