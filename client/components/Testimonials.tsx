import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Testimonials() {
  const reviews = [
    { name: "Neha Sharma", role: "Freelance Designer", text: "Nexora completely changed how I manage my unpredictable income. The AI tracking is flawless." },
    { name: "Prathamesh Giri", role: "Software Engineer", text: "The cleanest UI of any finance app I've used. Finally, something that feels premium and actually works." },
    { name: "Rahul Verma", role: "Small Business Owner", text: "I can finally see all my accounts in one place without the clutter. Worth every penny." }
  ];

  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-[#020604] to-[#031f18] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#10b981]/5 blur-[80px] transform-gpu rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Loved by thousands</h2>
          <p className="mt-4 text-lg text-[#94b3a8]">Don't just take our word for it.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-[#0a110e] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 rounded-[2rem] p-8 hover:bg-[#10b981]/5 hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              <div className="flex text-[#10b981] mb-6">
                {[...Array(5)].map((_, idx) => <Star key={idx} size={20} fill="currentColor" />)}
              </div>
              <p className="text-white text-lg mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#047857] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-[#94b3a8] text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
