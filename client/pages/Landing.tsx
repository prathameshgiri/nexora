import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle2, ChevronRight, CircleDollarSign, LayoutDashboard, Lock, PieChart, ShieldCheck, Sparkles, Star, Target, Zap, XCircle, Fingerprint, ChevronDown, Smartphone, Apple, Bot, Menu, X, Wallet, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Hero3DScene } from "../components/Hero3DScene";
import Tilt from "react-parallax-tilt";
import { SocialProof } from "../components/SocialProof";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Security } from "../components/Security";
import { FAQ } from "../components/FAQ";
import { Integrations } from "../components/Integrations";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#047857] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        <CircleDollarSign size={24} strokeWidth={2.5} />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-white">
        Nexora<span className="text-[#10b981]">.</span>
      </span>
    </div>
  );
}

export default function Landing() {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050908] text-[#d1e0dc] selection:bg-[#10b981] selection:text-white font-sans">

      {/* 1. Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "bg-[#050908]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-semibold text-[#8ba89f] hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-[#8ba89f] hover:text-white transition">How it Works</a>
            <a href="#testimonials" className="text-sm font-semibold text-[#8ba89f] hover:text-white transition">Reviews</a>
            <a href="#pricing" className="text-sm font-semibold text-[#8ba89f] hover:text-white transition">Pricing</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {!loading && user ? (
              <Link to="/dashboard" className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs sm:text-sm sm:px-5 font-bold text-white backdrop-blur-md transition border border-white/10">
                <LayoutDashboard size={18} strokeWidth={2.5} /> <span className="hidden sm:inline">Go to </span>Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden text-sm font-bold text-[#8ba89f] hover:text-white sm:block transition">Log in</Link>
                <Link to="/login?mode=signup" className="rounded-xl bg-[#10b981] hover:bg-[#059669] px-4 py-2.5 text-xs sm:text-sm sm:px-5 font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition border border-[#34d399]/20">Sign up free</Link>
              </>
            )}

            <button
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white transition hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a110f] border-t border-white/5 shadow-2xl p-4 flex flex-col gap-2">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-white/5 transition">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-white/5 transition">How it Works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-white/5 transition">Reviews</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-white/5 transition">Pricing</a>
            {!user && (
              <div className="border-t border-white/5 pt-4 mt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-3 text-center text-sm font-bold text-[#10b981] rounded-xl border border-[#10b981]/30 hover:bg-[#10b981]/10 transition">Log In</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <main>
        {/* 2. Hero Section with 3D Scene */}
        <section className="relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex items-center justify-center">
          <Hero3DScene />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center pointer-events-none"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 backdrop-blur-md px-4 py-1.5 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.15)] pointer-events-auto">
              <Sparkles size={14} strokeWidth={2.5} className="text-[#34d399]" />
              <span className="text-xs font-bold text-[#a7f3d0]">Nexora AI 2.0 is now live</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
              Master your money with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#059669] drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">intelligent precision</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#94b3a8]">
              The smartest way to track expenses, manage salaries, and plan your financial future. Experience a dashboard that thinks ahead of your spending.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row pointer-events-auto">
              <Link to="/login?mode=signup" className="group flex h-14 items-center gap-2 rounded-xl bg-[#10b981] px-8 text-base font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all hover:-translate-y-1 hover:bg-[#059669] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                Get Started Now <ArrowRight size={18} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
              </Link>
              <a href="#features" className="flex h-14 items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 text-base font-bold text-white transition hover:border-[#10b981] hover:bg-white/10">
                Explore features
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-xs font-semibold text-[#5c7a70]">No credit card required · Free 14-day trial</motion.p>
          </motion.div>
        </section>

        {/* 3. Trusted By Logos */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="border-y border-white/5 bg-black/20 backdrop-blur-sm py-10 relative z-10"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
            <p className="text-sm font-semibold text-[#5c7a70] mb-6 tracking-widest uppercase">Trusted by employees from top companies</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40">
              {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map(brand => (
                <div key={brand} className="text-xl font-black tracking-widest text-white transition duration-500 hover:opacity-100 hover:text-[#10b981]">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4. Features Bento Box */}
        <section id="features" className="py-20 sm:py-32 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 rounded-full blur-[80px] transform-gpu pointer-events-none"></div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#10b981]">Everything you need</h2>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">A complete financial ecosystem</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 - Wide card */}
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1500} scale={1.02} className="md:col-span-2 relative group rounded-[2rem] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 bg-gradient-to-br from-[#0a110e] to-[#040907] p-8 sm:p-10 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#10b981]/20 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10b981]/20 text-[#10b981] mb-6 relative z-10 border border-[#10b981]/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Zap size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Smart AI Tracking</h3>
                <p className="text-[#94b3a8] text-lg leading-relaxed relative z-10 max-w-lg">
                  Our advanced AI engine automatically categorizes every transaction in real-time, learning from your habits to provide unparalleled accuracy.
                </p>
              </Tilt>

              {/* Feature 2 - Tall card */}
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1500} scale={1.02} className="relative group rounded-[2rem] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 bg-[#0a110e] p-8 sm:p-10 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#3b82f6]/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e293b] text-[#60a5fa] mb-6 border border-[#3b82f6]/20 relative z-10">
                  <FileText size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Salary Slips</h3>
                <p className="text-[#94b3a8] text-lg leading-relaxed relative z-10">
                  Upload and verify salary slips, keeping all records permanently archived and easily searchable.
                </p>
              </Tilt>

              {/* Feature 3 - Square card */}
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1500} scale={1.02} className="relative group rounded-[2rem] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 bg-[#0a110e] p-8 sm:p-10 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f59e0b]/5 to-transparent pointer-events-none"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#452003] text-[#fbbf24] mb-6 border border-[#f59e0b]/20 relative z-10">
                  <Target size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Goal Setting</h3>
                <p className="text-[#94b3a8] text-lg leading-relaxed relative z-10">
                  Set ambitious financial goals and let Nexora help you achieve them with milestone tracking.
                </p>
              </Tilt>

              {/* Feature 4 - Square card */}
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1500} scale={1.02} className="relative group rounded-[2rem] border-2 border-[#10b981]/20 hover:border-[#10b981]/50 bg-[#0a110e] p-8 sm:p-10 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 overflow-hidden">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2e1065] text-[#a78bfa] mb-6 border border-[#8b5cf6]/20 relative z-10">
                  <BarChart3 size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Deep Analytics</h3>
                <p className="text-[#94b3a8] text-lg leading-relaxed relative z-10">
                  Understand your spending patterns with beautiful, intuitive charts and weekly insights.
                </p>
              </Tilt>
            </motion.div>
          </div>
        </section>

        {/* 5. How it Works Section */}
        <section id="how-it-works" className="py-20 sm:py-32 bg-black/40 border-y border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">How Nexora works</h2>
              <p className="mt-4 text-lg text-[#94b3a8]">Three simple steps to achieve complete financial clarity.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3">
              {[
                { step: "01", title: "Connect & Import", desc: "Add your income sources and expenses. Upload your salary slips for an accurate baseline." },
                { step: "02", title: "Set Rules & Goals", desc: "Tell Nexora what you want to achieve. We'll set up automated budgets and savings targets." },
                { step: "03", title: "Watch Wealth Grow", desc: "Follow our AI recommendations, track your net worth, and reach financial freedom sooner." }
              ].map((item) => (
                <motion.div variants={fadeUp} key={item.step} className="relative group p-6 rounded-3xl border border-transparent hover:border-white/10 hover:bg-white/5 transition duration-500">
                  <div className="mb-6 text-7xl font-black text-white/5 transition duration-500 group-hover:text-[#10b981]/20 group-hover:-translate-y-2">{item.step}</div>
                  <h3 className="mb-4 text-xl font-extrabold text-white">{item.title}</h3>
                  <p className="text-[#8ba89f] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. Security Deep Dive */}
        <section className="py-20 sm:py-32 overflow-hidden relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 rounded-full blur-[80px] transform-gpu pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10b981]/20 text-[#34d399] mb-8 border border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Fingerprint size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl mb-6 leading-tight">Zero-knowledge<br />architecture.</h2>
              <p className="text-[#94b3a8] text-lg leading-relaxed mb-10">We use AES-256 bank-level encryption. We don't sell your data to third parties. We don't have access to your bank credentials.</p>
              <div className="space-y-6">
                {["Military-grade 256-bit encryption", "Biometric authentication ready", "Strictly no third-party data sharing"].map(s => (
                  <div key={s} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981]/20 border border-[#10b981]/30">
                      <ShieldCheck size={16} strokeWidth={2.5} className="text-[#34d399]" />
                    </div>
                    <span className="font-bold text-white tracking-wide">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#eab308]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="h-16 w-full rounded-xl bg-white/5 animate-pulse border border-white/5"></div>
                <div className="h-16 w-3/4 rounded-xl bg-white/5 animate-pulse border border-white/5"></div>
                <div className="h-20 w-full rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center flex-col gap-2 relative overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.2),transparent)] -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  <Lock size={20} className="text-[#34d399]" />
                  <span className="text-xs font-bold text-[#34d399] tracking-widest uppercase">Payload Encrypted</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. Pricing Section */}
        <section id="pricing" className="py-20 sm:py-32 relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Transparent pricing</h2>
              <p className="mt-4 text-lg text-[#94b3a8]">Choose the plan that fits your financial journey.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 lg:p-10 transition duration-500 hover:border-white/20 hover:bg-white/10">
                <h3 className="text-2xl font-extrabold text-white">Basic</h3>
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">₹0</span>
                  <span className="text-sm font-bold text-[#8ba89f]">/ forever</span>
                </div>
                <p className="text-sm text-[#94b3a8] mb-8 leading-relaxed">Perfect for students and individuals just starting to track.</p>
                <ul className="space-y-4 mb-10">
                  {["Track basic expenses & income", "Monthly budget limits", "Basic analytics", "1 user account"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-semibold text-[#d1e0dc]">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-[#34d399]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login?mode=signup" className="block w-full rounded-xl border border-white/20 bg-white/5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/10">Get Started</Link>
              </motion.div>

              {/* Pro Plan */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-[#10b981]/50 bg-[#10b981]/5 backdrop-blur-md p-8 lg:p-10 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative transform md:-translate-y-4">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#10b981] text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-900/50">Pro</div>
                <h3 className="text-2xl font-extrabold text-white">Pro</h3>
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">₹299</span>
                  <span className="text-sm font-bold text-[#8ba89f]">/ month</span>
                </div>
                <p className="text-sm text-[#94b3a8] mb-8 leading-relaxed">Advanced tools for serious financial growth and planning.</p>
                <ul className="space-y-4 mb-10">
                  {["Everything in Basic", "Unlimited Salary Slip Uploads", "AI Financial Coach & Recommendations", "Investment tracking", "Custom categories"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-semibold text-white">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-[#10b981]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login?mode=signup" className="block w-full rounded-xl bg-[#10b981] py-3.5 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:-translate-y-1 hover:bg-[#059669]">Upgrade to Pro</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 7a. Social Proof */}
        <SocialProof />

        {/* 7b. How It Works */}
        <HowItWorks />

        {/* 7c. Security */}
        <Security />

        {/* 7d. Testimonials */}
        <Testimonials />

        {/* 7e. Integrations */}
        <Integrations />

        {/* 7f. FAQ */}
        <FAQ />

        {/* 8. Final CTA */}
        <section className="relative z-10 border-t border-white/10 bg-gradient-to-r from-[#031f18] via-[#053d2f] to-[#031f18] overflow-hidden">
          {/* Glowing central orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#10b981]/10 rounded-full blur-[80px] transform-gpu pointer-events-none"></div>
          {/* Subtle grid pattern for premium tech feel */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwIDBMMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50"></div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 sm:py-20 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                  Ready to transform your financial life?
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-[#94b3a8] leading-relaxed mx-auto lg:mx-0">
                  Join thousands of users who have taken control of their money with Nexora. Sign up in seconds.
                </p>
              </div>
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#10b981] blur-[30px] opacity-40"></div>
                <Link to="/login?mode=signup" className="relative inline-flex h-14 items-center gap-3 rounded-xl bg-white px-8 text-base font-extrabold text-[#053d2f] shadow-xl transition-all hover:-translate-y-1 hover:bg-[#f0f9f5]">
                  Create free account <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12 relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <Logo />
          <p className="text-sm font-semibold text-[#5c7a70] text-center">© {new Date().getFullYear()} Nexora Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm font-bold text-[#8ba89f] hover:text-white transition">Privacy Policy</Link>
            <Link to="#" className="text-sm font-bold text-[#8ba89f] hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
