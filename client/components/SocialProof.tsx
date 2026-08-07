import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function SocialProof() {
  const companies = ["TechCrunch", "Forbes", "Bloomberg", "Wired", "The Verge"];

  return (
    <section className="py-12 border-b border-white/5 relative z-10 bg-[#020604]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center text-sm font-semibold text-[#94b3a8] tracking-widest uppercase mb-8">
          Trusted by innovative teams worldwide
        </motion.p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {companies.map((company, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold text-white/40 hover:text-[#10b981] transition-colors duration-300 cursor-default">
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
