import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, CheckCircle2, ChevronRight, CircleDollarSign, LayoutDashboard, Lock, PieChart, ShieldCheck, Sparkles, Star, Target, TrendingUp, Wallet, Zap, XCircle, Fingerprint, ChevronDown, Smartphone, Apple, Bot, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f7a63] text-white shadow-lg shadow-emerald-900/20">
        <CircleDollarSign size={24} strokeWidth={2.5} />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-[#18352f]">
        Nexora<span className="text-[#1f9b78]">.</span>
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
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fcfb] text-[#18352f] selection:bg-[#1f9b78] selection:text-white">
      {/* 1. Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen ? "bg-white/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(24,53,47,0.04)] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-semibold text-[#4a635d] hover:text-[#1f9b78] transition">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-[#4a635d] hover:text-[#1f9b78] transition">How it Works</a>
            <a href="#testimonials" className="text-sm font-semibold text-[#4a635d] hover:text-[#1f9b78] transition">Reviews</a>
            <a href="#pricing" className="text-sm font-semibold text-[#4a635d] hover:text-[#1f9b78] transition">Pricing</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {!loading && user ? (
              <Link to="/dashboard" className="flex items-center gap-2 rounded-xl bg-[#1f7a63] px-4 py-2.5 text-xs sm:text-sm sm:px-5 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#196b56]">
                <LayoutDashboard size={18} strokeWidth={2.5} /> <span className="hidden sm:inline">Go to </span>Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden text-sm font-bold text-[#4a635d] hover:text-[#1f9b78] sm:block">Log in</Link>
                <Link to="/login?mode=signup" className="rounded-xl bg-[#1f7a63] px-4 py-2.5 text-xs sm:text-sm sm:px-5 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#196b56]">Sign up free</Link>
              </>
            )}

            <button 
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-[#f0f9f5] text-[#1f9b78] transition hover:bg-[#e3f4ee]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#eff5f2] shadow-2xl p-4 flex flex-col gap-2">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-[#112a25] rounded-xl hover:bg-[#f0f9f5] transition">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-[#112a25] rounded-xl hover:bg-[#f0f9f5] transition">How it Works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-[#112a25] rounded-xl hover:bg-[#f0f9f5] transition">Reviews</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-[#112a25] rounded-xl hover:bg-[#f0f9f5] transition">Pricing</a>
            {!user && (
              <div className="border-t border-[#eff5f2] pt-4 mt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-3 text-center text-sm font-bold text-[#1f9b78] rounded-xl border-2 border-[#1f9b78] hover:bg-[#f0f9f5] transition">Log In</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e3f4ee] via-white to-white"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2efe4] bg-[#f0f9f5] px-4 py-1.5 mb-8">
              <Sparkles size={14} strokeWidth={2.5} className="text-[#1f9b78]" />
              <span className="text-xs font-bold text-[#2a6d59]">Nexora AI 2.0 is now live</span>
            </div>
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-[#112a25] sm:text-5xl lg:text-7xl">
              Master your money with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1f9b78] to-[#125c46]">intelligent precision</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#597870]">
              The smartest way to track expenses, manage salaries, and plan your financial future. Experience a dashboard that thinks ahead of your spending.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/login?mode=signup" className="group flex h-12 sm:h-14 items-center gap-2 rounded-xl bg-[#1f7a63] px-6 sm:px-8 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-900/15 transition-all hover:-translate-y-1 hover:bg-[#16604d]">
                Get Started Now <ArrowRight size={18} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
              </Link>
              <Link to="#features" className="flex h-14 items-center gap-2 rounded-xl border-2 border-[#e1ece8] bg-white px-8 text-base font-bold text-[#3d5c54] transition hover:border-[#1f9b78] hover:text-[#1f9b78]">
                Explore features
              </Link>
            </div>
            <p className="mt-6 text-xs font-semibold text-[#8aaba1]">No credit card required · Free 14-day trial</p>
          </div>
        </section>

        {/* 3. Trusted By Logos */}
        <section className="border-y border-[#eff5f2] bg-white py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
            <p className="text-sm font-semibold text-[#83a298] mb-6">Trusted by employees from top companies</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 grayscale opacity-60">
              {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map(brand => (
                <div key={brand} className="text-xl font-black tracking-tighter text-[#18352f] transition duration-300 hover:grayscale-0 hover:opacity-100 hover:text-[#1f9b78]">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Dashboard Preview / Mockup Section */}
        <section className="relative px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="relative rounded-3xl border border-[#e2efe9] bg-white p-2 shadow-[0_20px_60px_-15px_rgba(24,53,47,0.15)] md:p-4">
              <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#1f9b78]/20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#78caaf]/30 blur-3xl"></div>
              <div className="overflow-hidden rounded-2xl border border-[#eff5f2] bg-[#fbfdfc] shadow-inner relative">
                {/* Simulated dashboard top bar */}
                <div className="flex items-center justify-between border-b border-[#eff5f2] bg-white/60 px-6 py-4 backdrop-blur-md">
                  <div className="flex gap-2"><div className="h-3 w-3 rounded-full bg-[#f2655a]"></div><div className="h-3 w-3 rounded-full bg-[#f7be38]"></div><div className="h-3 w-3 rounded-full bg-[#41ca58]"></div></div>
                  <div className="h-6 w-48 rounded-lg bg-[#f0f6f3]"></div>
                </div>
                {/* Simulated content */}
                <div className="p-6 md:p-10">
                  <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6 sm:flex-row">
                    <div className="flex-1 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f6f3]">
                      <p className="text-xs font-bold text-[#83a298]">Total Balance</p>
                      <p className="mt-2 text-3xl font-extrabold text-[#1f3832]">₹1,84,260</p>
                      <p className="mt-2 text-xs font-bold text-[#1f9b78]">+12.8% this month</p>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f6f3]">
                      <p className="text-xs font-bold text-[#83a298]">Monthly Expenses</p>
                      <p className="mt-2 text-3xl font-extrabold text-[#1f3832]">₹57,840</p>
                      <p className="mt-2 text-xs font-bold text-[#e6755c]">4.2% higher</p>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f6f3]">
                      <p className="text-xs font-bold text-[#83a298]">Savings Rate</p>
                      <p className="mt-2 text-3xl font-extrabold text-[#1f3832]">44.7%</p>
                      <p className="mt-2 text-xs font-bold text-[#1f9b78]">On track</p>
                    </div>
                  </div>
                  <div className="h-48 rounded-2xl border border-[#f0f6f3] bg-white p-5 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-[#83a298] uppercase tracking-wider">Income vs Expenses</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#1f9b78]"></div><span className="text-[10px] font-bold text-[#83a298]">INCOME</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#e6755c]"></div><span className="text-[10px] font-bold text-[#83a298]">EXPENSES</span></div>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 mt-2">
                      {[
                        { i: 60, e: 40 }, { i: 70, e: 50 }, { i: 65, e: 55 }, { i: 80, e: 45 },
                        { i: 90, e: 60 }, { i: 75, e: 50 }, { i: 85, e: 55 }, { i: 100, e: 70 }
                      ].map((data, idx) => (
                        <div key={idx} className="flex-1 flex gap-0.5 sm:gap-1 items-end h-full">
                          <div className="w-1/2 bg-[#1f9b78] rounded-t-sm transition-all duration-500 hover:brightness-110" style={{ height: `${data.i}%` }}></div>
                          <div className="w-1/2 bg-[#e6755c] rounded-t-sm transition-all duration-500 hover:brightness-110 opacity-90" style={{ height: `${data.e}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Problem vs Solution */}
        <section className="bg-[#f8fcfb] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl">Why switch to Nexora?</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#69887f]">Stop wrestling with messy spreadsheets and complex formulas.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              <div className="rounded-3xl border border-[#fbd5ce] bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf0ed] text-[#e6755c]"><XCircle size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-extrabold text-[#112a25]">Manual Spreadsheets</h3>
                </div>
                <ul className="space-y-4">
                  {[ "Manual data entry takes hours", "Formulas break easily", "No visual insights", "Hard to track on mobile" ].map(t => (
                    <li key={t} className="flex items-center gap-3 text-sm text-[#4a635d]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#e6755c]"></div> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border-2 border-[#1f9b78] bg-[#f0f9f5] p-8 shadow-lg shadow-emerald-900/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f9b78] text-white"><CheckCircle2 size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-extrabold text-[#112a25]">Nexora AI</h3>
                </div>
                <ul className="space-y-4">
                  {[ "Automated categorization", "Beautiful, instant dashboards", "Smart budget alerts", "Bank-level security" ].map(t => (
                    <li key={t} className="flex items-center gap-3 text-sm font-semibold text-[#1f3832]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#1f9b78]"></div> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#1f9b78]">Everything you need</h2>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl">A complete financial ecosystem</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Smart Tracking", desc: "Categorize transactions instantly with our AI engine.", icon: Zap },
                { title: "Salary Slips", desc: "Upload and verify salary slips, keeping all records in one place.", icon: Wallet },
                { title: "Budget Planner", desc: "Set strict limits and get warned before you overspend.", icon: PieChart },
                { title: "Goal Setting", desc: "Visual progress bars for your next car, house, or vacation.", icon: Target },
                { title: "Deep Analytics", desc: "Beautiful charts that make sense of your spending habits.", icon: BarChart3 },
                { title: "Bank-grade Security", desc: "End-to-end encryption to keep your financial data strictly yours.", icon: Lock },
              ].map((feat) => (
                <div key={feat.title} className="rounded-3xl border border-[#f0f5f3] bg-[#fafcfb] p-8 transition hover:shadow-xl hover:shadow-[#1f9b78]/5">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f4ef] text-[#1f9b78]">
                    <feat.icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold text-[#112a25]">{feat.title}</h3>
                  <p className="text-sm leading-relaxed text-[#69887f]">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. How it Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-[#112a25] text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How Nexora changes your life</h2>
              <p className="mt-4 text-lg text-[#8bb1a4]">Three simple steps to achieve complete financial clarity.</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3">
              {[
                { step: "01", title: "Connect & Import", desc: "Add your income sources and expenses. Upload your salary slips for an accurate baseline." },
                { step: "02", title: "Set Rules & Goals", desc: "Tell Nexora what you want to achieve. We'll set up automated budgets and savings targets." },
                { step: "03", title: "Watch Wealth Grow", desc: "Follow our AI recommendations, track your net worth, and reach financial freedom sooner." }
              ].map((item) => (
                <div key={item.step} className="relative group">
                  <div className="mb-6 text-6xl font-black text-[#1f473c] transition group-hover:text-[#1f9b78]">{item.step}</div>
                  <h3 className="mb-4 text-xl font-extrabold">{item.title}</h3>
                  <p className="text-[#a0c2b7] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Supported Integrations */}
        <section className="bg-white py-16 sm:py-24 border-b border-[#eff5f2]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
             <h2 className="text-2xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl mb-4">Works with your banks</h2>
             <p className="text-base sm:text-lg text-[#69887f] mb-8 sm:mb-12">Export from any major Indian bank and let our AI do the rest.</p>
             <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Yes Bank", "Paytm", "Google Pay"].map(bank => (
                  <div key={bank} className="rounded-xl border border-[#eff5f2] bg-[#f8fcfb] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#4a635d] shadow-sm hover:border-[#1f9b78] hover:text-[#1f9b78] transition">
                    {bank}
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 9. Stats / Social Proof */}
        <section className="py-14 sm:py-20 bg-[#1f9b78]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <p className="text-4xl font-extrabold sm:text-5xl">₹2B+</p>
                <p className="mt-2 text-sm font-bold text-[#aae3d1]">Expenses Tracked</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold sm:text-5xl">50k+</p>
                <p className="mt-2 text-sm font-bold text-[#aae3d1]">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold sm:text-5xl">99.9%</p>
                <p className="mt-2 text-sm font-bold text-[#aae3d1]">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold sm:text-5xl">4.9/5</p>
                <p className="mt-2 text-sm font-bold text-[#aae3d1]">App Store Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Security Deep Dive */}
        <section className="bg-[#112a25] py-16 sm:py-24 text-white overflow-hidden relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1f9b78]/10 rounded-full blur-3xl"></div>
           <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f9b78]/20 text-[#1f9b78] mb-6 border border-[#1f9b78]/30">
                  <Fingerprint size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl mb-4 sm:mb-6">Your data is strictly confidential.</h2>
                <p className="text-[#a0c2b7] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">We use AES-256 bank-level encryption. We don't sell your data to third parties. We don't have access to your bank credentials.</p>
                <div className="space-y-4">
                   {["256-bit encryption", "Biometric authentication ready", "No third-party data sharing"].map(s => (
                     <div key={s} className="flex items-center gap-3">
                        <ShieldCheck size={20} strokeWidth={2.5} className="text-[#1f9b78]" />
                        <span className="font-semibold">{s}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl">
                 <div className="flex flex-col gap-4">
                    <div className="h-16 w-full rounded-xl bg-white/10 animate-pulse"></div>
                    <div className="h-16 w-3/4 rounded-xl bg-white/10 animate-pulse"></div>
                    <div className="h-16 w-full rounded-xl bg-white/10 animate-pulse flex items-center justify-center text-xs font-bold text-[#1f9b78] tracking-widest uppercase">Encrypted Payload</div>
                 </div>
              </div>
           </div>
        </section>

        {/* 11. Testimonials */}
        <section id="testimonials" className="py-16 sm:py-24 bg-[#f8fcfb]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl mb-10 sm:mb-16">Loved by thousands</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { name: "Rahul Sharma", role: "Software Engineer", body: "Nexora's salary slip feature is a game-changer. I finally know exactly where every rupee of my paycheck goes." },
                { name: "Priya Patel", role: "Freelance Designer", body: "The UI is breathtaking. Managing my irregular income used to give me anxiety, but the budgeting tools here make it effortless." },
                { name: "Amit Verma", role: "Marketing Director", body: "I hit my emergency fund goal 3 months early thanks to the AI recommendations. Best financial app I've ever used." },
              ].map((t) => (
                <div key={t.name} className="rounded-3xl bg-white p-8 shadow-[0_5px_20px_rgba(24,53,47,0.04)]">
                  <div className="flex gap-1 mb-4 text-[#fbbf24]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} strokeWidth={2.5} fill="currentColor" />)}
                  </div>
                  <p className="text-[#4a635d] italic mb-6">"{t.body}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#1f9b78] text-white flex items-center justify-center font-bold text-sm">{t.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-extrabold text-[#112a25]">{t.name}</p>
                      <p className="text-xs font-semibold text-[#83a298]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl">Simple, transparent pricing</h2>
              <p className="mt-4 text-lg text-[#69887f]">Choose the plan that fits your financial journey.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-3xl border border-[#eff5f2] bg-[#fafcfb] p-8 lg:p-10">
                <h3 className="text-xl font-extrabold text-[#112a25]">Basic</h3>
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#112a25]">₹0</span>
                  <span className="text-sm font-bold text-[#83a298]">/ forever</span>
                </div>
                <p className="text-sm text-[#69887f] mb-8">Perfect for students and individuals just starting to track.</p>
                <ul className="space-y-4 mb-8">
                  {["Track basic expenses & income", "Monthly budget limits", "Basic analytics", "1 user account"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-semibold text-[#4a635d]">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-[#1f9b78]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login?mode=signup" className="block w-full rounded-xl border-2 border-[#1f9b78] py-3 text-center text-sm font-bold text-[#1f9b78] hover:bg-[#f2f9f6]">Get Started</Link>
              </div>
              {/* Pro Plan */}
              <div className="rounded-3xl border-2 border-[#1f9b78] bg-white p-8 lg:p-10 shadow-2xl shadow-emerald-900/10 relative transform md:-translate-y-4">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#1f9b78] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                <h3 className="text-xl font-extrabold text-[#112a25]">Pro</h3>
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#112a25]">₹299</span>
                  <span className="text-sm font-bold text-[#83a298]">/ month</span>
                </div>
                <p className="text-sm text-[#69887f] mb-8">Advanced tools for serious financial growth and planning.</p>
                <ul className="space-y-4 mb-8">
                  {["Everything in Basic", "Unlimited Salary Slip Uploads", "AI Financial Coach & Recommendations", "Investment tracking", "Custom categories"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-semibold text-[#4a635d]">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-[#1f9b78]" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login?mode=signup" className="block w-full rounded-xl bg-[#1f7a63] py-3 text-center text-sm font-bold text-white hover:bg-[#16604d]">Upgrade to Pro</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 13. FAQ Section */}
        <section className="bg-[#f8fcfb] py-16 sm:py-24 border-t border-[#eff5f2]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is Nexora totally free?", a: "The basic version is free forever. We offer a Pro plan for advanced AI recommendations and unlimited slip uploads." },
                { q: "Do you connect directly to my bank?", a: "No. We believe in privacy-first tracking. You upload your statements or add manual entries, keeping your credentials safe." },
                { q: "Can I export my data?", a: "Yes, you can export all your data to CSV or Excel at any time." },
                { q: "Is there a mobile app?", a: "Currently Nexora is a responsive web app. Native iOS and Android apps are in active development." }
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl border border-[#eff5f2] bg-white p-6 shadow-sm transition hover:shadow-md group">
                  <h3 className="text-lg font-extrabold text-[#112a25] flex justify-between items-center">
                    {faq.q} <ChevronDown size={18} strokeWidth={2.5} className="text-[#83a298] transition group-hover:text-[#1f9b78] shrink-0" />
                  </h3>
                  <p className="mt-3 text-sm text-[#69887f]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. Mobile App Callout */}
        <section className="bg-white py-16 sm:py-24">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#f0f9f5] text-[#1f9b78] mb-6">
                <Smartphone size={28} strokeWidth={2.5} className="sm:hidden" />
                <Smartphone size={32} strokeWidth={2.5} className="hidden sm:block" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#112a25] sm:text-4xl mb-4 sm:mb-6">Take your finances anywhere</h2>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#69887f] mb-8 sm:mb-10">Nexora is perfectly optimized for all screen sizes. Add expenses on the go with our lightning-fast mobile web interface.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <div className="rounded-xl border border-[#eff5f2] px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#112a25] flex items-center gap-3 cursor-pointer hover:border-[#1f9b78] transition w-full sm:w-auto justify-center">
                   <Apple size={24} strokeWidth={2.5} className="text-[#112a25]" /> Add to iOS Home Screen
                 </div>
                 <div className="rounded-xl border border-[#eff5f2] px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#112a25] flex items-center gap-3 cursor-pointer hover:border-[#1f9b78] transition w-full sm:w-auto justify-center">
                   <Bot size={24} strokeWidth={2.5} className="text-[#1f9b78]" /> Install Android PWA
                 </div>
              </div>
           </div>
        </section>

        {/* 15. Final CTA */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[1.5rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#112a25] to-[#1f4a3d] p-6 sm:p-12 text-center shadow-2xl md:p-20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
              <h2 className="relative z-10 mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                Ready to transform your financial life?
              </h2>
              <p className="relative z-10 mx-auto mt-4 sm:mt-6 max-w-xl text-[15px] sm:text-lg text-[#a7c5bc] leading-relaxed">
                Join thousands of users who have taken control of their money with Nexora. Sign up in seconds.
              </p>
              <div className="relative z-10 mt-8 sm:mt-10">
                <Link to="/login?mode=signup" className="inline-flex h-12 sm:h-14 items-center gap-2 rounded-xl bg-[#1f9b78] px-6 sm:px-8 text-sm sm:text-base font-bold text-white transition hover:-translate-y-1 hover:bg-[#1bb387]">
                  Create your free account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fcfb] py-10 sm:py-12 border-t border-[#eff5f2]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <Logo />
          <p className="text-xs sm:text-sm font-semibold text-[#83a298] text-center">© {new Date().getFullYear()} Nexora Technologies. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link to="#" className="text-xs sm:text-sm font-bold text-[#4a635d] hover:text-[#1f9b78]">Privacy Policy</Link>
            <Link to="#" className="text-xs sm:text-sm font-bold text-[#4a635d] hover:text-[#1f9b78]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
