export default function SideRails() {
  return (
    <>
      {/* Side Rails */}
      <div className="fixed top-0 left-0 h-screen w-10 hidden xl:flex flex-col items-center justify-center pointer-events-none z-40">
        <p className="text-[9px] tracking-[0.22em] uppercase font-mono text-muted-foreground rotate-180 whitespace-nowrap" style={{ writingMode: "vertical-rl" }}>
          Web Design · Paid Ads · AI · SEO · Accra
        </p>
      </div>
      <div className="fixed top-0 right-0 h-screen w-10 hidden xl:flex flex-col items-center justify-center pointer-events-none z-40">
        <p className="text-[9px] tracking-[0.22em] uppercase font-mono text-muted-foreground rotate-180 whitespace-nowrap" style={{ writingMode: "vertical-rl" }}>
          OGENCI — Digital Agency · Ghana · Pan-African
        </p>
      </div>
    </>
  );
}
