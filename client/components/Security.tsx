import { motion, Variants } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Security() {
  return (
    <section className="py-24 relative z-10 bg-[#031f18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">Bank-grade security. <br/>Your data is yours.</h2>
            <p className="mt-6 text-lg text-[#94b3a8] leading-relaxed">
              We employ state-of-the-art AES-256 encryption. Our connections are strictly read-only, meaning we can never move your money. Your financial data is securely anonymized and never sold to third parties.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { icon: Lock, text: "AES-256 Bit Encryption" },
                { icon: ShieldCheck, text: "Read-only bank connections" },
                { icon: Fingerprint, text: "Biometric authentication support" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                    <item.icon size={24} />
                  </div>
                  <span className="text-white font-semibold text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#3b82f6] blur-[80px] transform-gpu opacity-20 rounded-full"></div>
            <div className="bg-[#021a14] border border-white/10 rounded-[3rem] p-12 relative z-10 shadow-2xl flex items-center justify-center min-h-[400px]">
               <ShieldCheck size={120} className="text-[#10b981] drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" strokeWidth={1} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
