import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function HowItWorks() {
  const steps = [
    { title: "Connect Accounts", desc: "Link your bank accounts securely in seconds using our encrypted gateway.", num: "01" },
    { title: "Smart Tracking", desc: "Our AI automatically categorizes your income and expenses in real time.", num: "02" },
    { title: "Grow Wealth", desc: "Get actionable insights and set goals to rapidly grow your net worth.", num: "03" }
  ];

  return (
    <section className="py-24 relative z-10 bg-[#020604]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">How Nexora Works</h2>
          <p className="mt-4 text-lg text-[#94b3a8]">Three simple steps to complete financial clarity.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div 
              variants={fadeUp} 
              key={idx} 
              className="bg-[#0a110e] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 rounded-[2rem] p-8 lg:p-10 hover:bg-gradient-to-b hover:from-[#10b981]/10 hover:to-transparent shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group"
            >
              {/* Top gradient highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Large faded number in background */}
              <div className="absolute -right-4 -top-8 text-[120px] font-black text-white/[0.03] group-hover:text-[#10b981]/10 transition-colors duration-500 pointer-events-none select-none">
                {step.num}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10b981]/20 text-[#10b981] font-bold text-xl border border-[#10b981]/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-500">
                  {step.num}
                </div>
                <h3 className="mb-4 text-2xl font-extrabold text-white tracking-tight">{step.title}</h3>
                <p className="text-[#94b3a8] text-lg leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
