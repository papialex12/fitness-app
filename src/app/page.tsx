import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
          MasterMind Fitness
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Hyper-personalized fat loss programming driven by scientific data and your unique physiology.
        </p>
        
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 transition font-medium">
            Start Onboarding
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-700 hover:bg-gray-900 transition font-medium">
            Documentation
          </button>
        </div>
      </main>
      
      <footer className="absolute bottom-8 text-sm text-gray-500">
        POWERED BY ANTIGRAVITY & NOTEBOOKLM
      </footer>
    </div>
  );
}
