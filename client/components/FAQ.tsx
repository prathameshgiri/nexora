import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function FAQ() {
  const faqs = [
    { q: "Is my bank data secure?", a: "Yes. We use AES-256 encryption and read-only connections. We cannot move your money or make changes to your accounts." },
    { q: "Can I track cash transactions?", a: "Absolutely! You can manually add cash transactions or custom entries that aren't linked to a bank account." },
    { q: "How much does it cost?", a: "We offer a generous free tier that covers basic tracking. For advanced AI insights and unlimited accounts, our premium plan is $4.99/mo." },
    { q: "Can I export my data?", a: "Yes, you can export all your financial data to CSV or Excel at any time with a single click." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 bg-[#020604]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${openIdx === i ? 'bg-[#10b981]/10 border-[#10b981]/50' : 'bg-[#0a110e] border-[#10b981]/20 hover:border-[#10b981]/40 hover:bg-[#10b981]/5'}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`text-[#10b981] transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} size={24} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[#94b3a8] leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
