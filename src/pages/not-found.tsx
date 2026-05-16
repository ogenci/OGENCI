import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <div className="xl:px-10 w-full max-w-[1600px] mx-auto relative flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center px-6 py-32">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-[120px] font-display font-black leading-none tracking-tighter text-primary">404</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Page Not Found</h2>
          <p className="text-white/50 font-mono text-xs uppercase tracking-[0.2em] leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
        </div>
        
        <div className="pt-8">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
        </main>
        <div className="bg-[#eae5d9] rounded-t-3xl overflow-hidden mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
