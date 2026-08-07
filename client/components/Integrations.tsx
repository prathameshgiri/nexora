import { motion, Variants } from "framer-motion";
import { CreditCard, Smartphone, Apple, Wallet } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Integrations() {
  const icons = [CreditCard, Smartphone, Apple, Wallet];
  
  return (
    <section className="py-24 relative z-10 bg-[#020604] border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10b981]/10 rounded-full blur-[80px] transform-gpu pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Works with everything you use</h2>
          <p className="text-lg text-[#94b3a8] max-w-2xl mx-auto mb-16">Connects seamlessly with 10,000+ financial institutions, Apple Pay, Google Pay, and major credit cards.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {icons.map((Icon, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#0a110e] border-2 border-[#10b981]/20 flex items-center justify-center text-white/50 hover:text-[#10b981] hover:border-[#10b981]/50 hover:bg-[#10b981]/10 transition-all duration-300 shadow-xl"
              >
                <Icon size={40} strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
