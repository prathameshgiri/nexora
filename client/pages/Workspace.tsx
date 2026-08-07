import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowDownRight, ArrowUpRight, BarChart3, Bell, CalendarDays, Check, ChevronDown, ChevronRight, CircleDollarSign, Copy, CreditCard, FileText, Filter, Goal, Home, LayoutDashboard, Menu, MoreHorizontal, PieChart, Plus, Minus, Search, Settings, ShieldCheck, Sparkles, Target, TrendingUp, Upload, UserRound, Wallet, X, Zap } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import CountUpRaw from "react-countup";
const CountUp = (CountUpRaw != null && typeof CountUpRaw === 'object' && 'default' in (CountUpRaw as any) ? (CountUpRaw as any).default : CountUpRaw) as any;
import { toast } from "sonner";
import { useAppData } from "../context/AppDataContext";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { AddGoalModal } from "../components/AddGoalModal";
import { AddInvestmentModal } from "../components/AddInvestmentModal";
import { AddSalarySlipModal } from "../components/AddSalarySlipModal";
import { AddCategoryModal } from "../components/AddCategoryModal";
const pageMeta: Record<string, { title: string; eyebrow: string; description: string; icon: typeof Wallet; action: string }> = {
  transactions: { title: "Transactions", eyebrow: "MONEY MOVEMENT", description: "Every income and expense, beautifully organized.", icon: ArrowDownRight, action: "Add transaction" },
  "budget-planner": { title: "Budget planner", eyebrow: "PLAN WITH PURPOSE", description: "Give every rupee a job before the month begins.", icon: PieChart, action: "" },
  goals: { title: "Financial goals", eyebrow: "YOUR NEXT CHAPTER", description: "Small steps today, bigger possibilities tomorrow.", icon: Target, action: "Add new goal" },
  "salary-slips": { title: "Salary slips", eyebrow: "INCOME RECORDS", description: "Your salary history, safely stored and always accessible.", icon: FileText, action: "Upload salary slip" },
  investments: { title: "Investments", eyebrow: "GROW YOUR WEALTH", description: "Track the money that is working while you sleep.", icon: TrendingUp, action: "Add investment" },
  "financial-health": { title: "Financial health", eyebrow: "YOUR MONEY WELLNESS", description: "A clear view of the habits shaping your financial future.", icon: ShieldCheck, action: "" },
  settings: { title: "Settings", eyebrow: "YOUR PREFERENCES", description: "Make Nexora feel exactly right for you.", icon: Settings, action: "Save changes" },
  "profile-settings": { title: "Profile settings", eyebrow: "YOUR PROFILE", description: "Keep your personal and salary details up to date.", icon: UserRound, action: "Save profile" },
  "privacy-security": { title: "Privacy & security", eyebrow: "STAY PROTECTED", description: "Manage your account security and privacy controls.", icon: ShieldCheck, action: "Review security" },
  "ai-coach": { title: "AI Coach", eyebrow: "ROLE-BASED ADVISOR", description: "Personalized financial guidance from your chosen AI persona.", icon: Sparkles, action: "New session" },
};

const nav = [
  ["Overview", "/", LayoutDashboard], ["Transactions", "/transactions", ArrowDownRight], ["Budget planner", "/budget-planner", PieChart], ["Goals", "/goals", Target], ["AI Coach", "/ai-coach", Sparkles], ["Salary slips", "/salary-slips", FileText], ["Investments", "/investments", TrendingUp], ["Financial health", "/financial-health", ShieldCheck],
] as const;
const cashFlow = [{ m: "Jan", income: 72, expense: 45 }, { m: "Feb", income: 78, expense: 50 }, { m: "Mar", income: 74, expense: 44 }, { m: "Apr", income: 83, expense: 55 }, { m: "May", income: 88, expense: 48 }, { m: "Jun", income: 91, expense: 52 }];
const categories = [{ name: "Housing", value: 18500, color: "#4eb894" }, { name: "Food & dining", value: 8500, color: "#f2a083" }, { name: "Transport", value: 5200, color: "#9a88da" }, { name: "Lifestyle", value: 4100, color: "#78aeca" }];
const rows = [{ name: "Apartment rent", type: "Housing", date: "Today, 9:42 AM", amount: "−₹18,500", icon: Home, tone: "coral" }, { name: "Salary credited", type: "Income", date: "Jul 01, 2024", amount: "+₹92,000", icon: Wallet, tone: "mint" }, { name: "Netflix subscription", type: "Entertainment", date: "Jun 30, 2024", amount: "−₹649", icon: CreditCard, tone: "lavender" }, { name: "Freelance project", type: "Additional income", date: "Jun 28, 2024", amount: "+₹12,500", icon: Zap, tone: "blue" }];

function Shell({ children, meta, onAction }: { children: React.ReactNode; meta: (typeof pageMeta)[string]; onAction?: () => void }) {
  const location = useLocation(); const [open, setOpen] = useState(false); const [menu, setMenu] = useState(false); const [coachOpen, setCoachOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background text-foreground"><aside className={`fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col border-r border-border bg-card px-5 py-6 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}><div className="flex items-center justify-between px-1"><Link to="/" className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f7a63] text-white"><CircleDollarSign size={21} /></div><span className="text-[15px] font-extrabold text-foreground">Nexora<span className="text-[#1f9b78]">.</span></span></Link><button className="lg:hidden" onClick={() => setOpen(false)}><X size={19} /></button></div><div className="mt-12"><p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-muted-foreground">Workspace</p><nav className="space-y-1">{nav.slice(0, 5).map(([label, href, Icon]) => <Link key={href} to={href} onClick={() => setOpen(false)} className={`nav-item ${location.pathname === href ? "active" : ""}`}><Icon size={17} />{label}{label === "Transactions" && <span className="ml-auto rounded-full bg-[#edf7f3] px-2 py-0.5 text-[10px] text-[#39856e] dark:bg-[#183a30] dark:text-[#5fd7b0]">24</span>}</Link>)}</nav></div><div className="mt-9"><p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-muted-foreground">Manage</p><nav className="space-y-1">{nav.slice(5).map(([label, href, Icon]) => <Link key={href} to={href} onClick={() => setOpen(false)} className={`nav-item ${location.pathname === href ? "active" : ""}`}><Icon size={17} />{label}</Link>)}</nav></div><button onClick={() => setCoachOpen(!coachOpen)} className="mt-auto w-full rounded-2xl bg-[#edf8f3] dark:bg-[#15342a] p-4 text-left transition hover:-translate-y-0.5 hover:bg-[#e2f5ec] dark:hover:bg-[#1a4034]"><Sparkles size={17} className="mb-3 text-[#237d65] dark:text-[#4eba94]" /><p className="text-[12px] font-bold text-foreground">Your AI coach is ready</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Three new recommendations waiting.</p><span className="mt-3 block text-[10px] font-extrabold text-[#2b9275] dark:text-[#42c5a0]">Open recommendations <ChevronRight className="ml-1 inline" size={13} /></span></button>{coachOpen && <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-border bg-card p-4 shadow-2xl lg:absolute lg:bottom-6 lg:left-[236px] lg:right-auto lg:w-72"><div className="flex items-start justify-between"><div><p className="text-[12px] font-extrabold text-foreground">Nexora AI coach</p><p className="mt-1 text-[10px] text-muted-foreground">Rule-based insights from your activity</p></div><button onClick={() => setCoachOpen(false)} className="text-muted-foreground"><X size={15} /></button></div><div className="mt-4 space-y-2.5">{["Your savings rate is above the 40% target.", "Set aside ₹1,500 more to reach your goal sooner.", "Review optional spending before your next bill cycle."].map((tip, index) => <div key={tip} className="flex gap-2 rounded-xl bg-muted p-2.5 text-[10px] font-semibold leading-relaxed text-foreground"><span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] text-primary">{index + 1}</span>{tip}</div>)}</div><button onClick={() => { setCoachOpen(false); navigate("/ai-coach"); }} className="mt-4 w-full rounded-xl bg-[#1f7a63] py-2.5 text-[10px] font-bold text-white">View full analysis</button></div>}</aside>{open && <button className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation" />}<main className="lg:pl-[220px]"><header className="flex h-[76px] items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-md sm:px-8"><div className="flex items-center gap-4"><button className="lg:hidden" onClick={() => setOpen(true)}><Menu size={21} /></button><div className="relative hidden sm:block"><Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} /><input className="h-9 w-56 rounded-xl bg-secondary pl-9 text-xs outline-none" placeholder="Search anything..." /></div><div className="hidden items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-[11px] font-semibold text-muted-foreground md:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#36b78e]" />All systems normal</div></div><div className="flex items-center gap-4"><Bell size={19} className="text-muted-foreground" /><div className="h-6 w-px bg-border" /><button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-2.5 hover:opacity-80 transition"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">{user?.fullName?.charAt(0) || "U"}</div><div className="hidden text-left sm:block"><p className="text-[11px] font-bold text-foreground">{user?.fullName || "User"}</p><p className="text-[10px] text-muted-foreground">Sign out</p></div><ChevronDown size={14} className="text-muted-foreground" /></button></div></header><div className="dashboard-content mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.17em] text-[#1f9b78]">{meta.eyebrow}</p><h1 className="flex items-center gap-3 text-[30px] font-extrabold tracking-[-.05em] text-foreground sm:text-[34px]"><meta.icon size={28} className="text-[#1f9b78]" />{meta.title}</h1><p className="mt-2 text-[13px] text-muted-foreground">{meta.description}</p></div>{meta.action && <button onClick={() => onAction ? onAction() : setMenu(!menu)} className="flex items-center gap-2 self-start rounded-xl bg-[#1f7a63] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 sm:self-auto"><Plus size={16} />{meta.action}</button>}</div><motion.div key={location.pathname} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>{children}</motion.div></div></main></div>;
}

function Section({ title, subtitle, children, className = "" }: { title: string; subtitle: string; children: React.ReactNode; className?: string }) { return <section className={`rounded-2xl border border-[#e6efeb] dark:border-border bg-white dark:bg-card p-5 shadow-[0_5px_25px_rgba(32,85,68,.035)] dark:shadow-none sm:p-6 overflow-hidden ${className}`}><div className="mb-5 flex items-start justify-between"><div><h2 className="text-[15px] font-extrabold text-foreground">{title}</h2><p className="mt-1 text-[11px] text-[#91a59f] dark:text-muted-foreground">{subtitle}</p></div><MoreHorizontal size={18} className="text-[#a2b4ae] dark:text-muted-foreground" /></div>{children}</section>; }
function Progress({ value, color = "#4eb894" }: { value: number; color?: string }) { return <div className="h-2 overflow-hidden rounded-full bg-[#edf4f0] dark:bg-secondary"><div className="progress-fill h-full rounded-full" style={{ width: `${value}%`, background: color }} /></div>; }

function Transactions() { 
  const { transactions, categories, cashFlow, removeTransaction } = useAppData();
  const [showAdd, setShowAdd] = useState(false);
  
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : "0.0";

  const iconMap: Record<string, any> = { Home, Wallet, CreditCard, Zap, TrendingUp, UserRound, ShieldCheck, PieChart, Target, FileText };

  return (
    <>
      <Shell meta={pageMeta.transactions} onAction={() => setShowAdd(true)}>
        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <Section title="Cash flow overview" subtitle="Income and expenses over the last six months">
            <ResponsiveContainer width="100%" height={235}>
              <AreaChart data={cashFlow}>
                <defs>
                  <linearGradient id="cash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4eb894" stopOpacity=".3" />
                    <stop offset="1" stopColor="#4eb894" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eef4f1" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9badA7" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9badA7" }} />
                <Tooltip />
                <Area dataKey="income" stroke="#299a7b" fill="url(#cash)" strokeWidth={2.5} />
                <Area dataKey="expense" stroke="#f29b82" fill="none" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Spending by category" subtitle="Where your money went this month">
            {categories.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <RePieChart>
                    <Pie data={categories} dataKey="value" innerRadius={53} outerRadius={76} paddingAngle={4}>
                      {categories.map((c) => <Cell key={c.name} fill={c.color} />)}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(c => 
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-[#78908a] dark:text-muted-foreground" key={c.name}>
                      <i className="h-2 w-2 rounded-full" style={{ background: c.color }} />{c.name}
                      <span className="ml-auto text-[#45675c] dark:text-foreground">₹{c.value.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No expenses yet</div>
            )}
          </Section>
        </div>
        <div className="mt-5">
          <Section title="Recent transactions" subtitle="Your latest money movements">
            <div className="space-y-3">
              {transactions.map(r => {
                const Icon = iconMap[r.iconName] || CircleDollarSign;
                return (
                  <div key={r.id} className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#f6faf8] dark:hover:bg-secondary">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${r.amount < 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-bold text-foreground">{r.name}</p>
                      <p className="mt-1 text-[10px] text-[#98aca5] dark:text-muted-foreground">{r.category} · {r.date}</p>
                    </div>
                    <p className={`text-[12px] font-extrabold ${r.amount > 0 ? "text-[#2b9b78] dark:text-[#42b38e]" : "text-[#426259] dark:text-foreground/80"}`}>
                      {r.amount > 0 ? "+" : "−"}₹<CountUp end={Math.abs(r.amount)} duration={1} separator="," />
                    </p>
                    <button onClick={() => removeTransaction(r.id)} className="ml-2 rounded-lg p-1.5 text-muted-foreground opacity-0 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 transition-opacity">
                      <X size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Section title="This month" subtitle="Total income">
            <p className="text-2xl font-extrabold text-foreground">₹<CountUp end={totalIncome} duration={1} separator="," /></p>
            <p className="mt-2 text-[11px] font-bold text-[#2b9b78] dark:text-[#42b38e]">+8.4% from June</p>
          </Section>
          <Section title="This month" subtitle="Total expenses">
            <p className="text-2xl font-extrabold text-foreground">₹<CountUp end={totalExpense} duration={1} separator="," /></p>
            <p className="mt-2 text-[11px] font-bold text-[#e58b72] dark:text-[#eb9c88]">+4.2% from June</p>
          </Section>
          <Section title="Savings rate" subtitle="Money kept this month">
            <p className="text-2xl font-extrabold text-foreground">{savingsRate}%</p>
            <Progress value={Number(savingsRate)} />
            <p className="mt-2 text-[10px] text-[#8ca29a] dark:text-muted-foreground">
              {Number(savingsRate) >= 40 ? "Above your 40% target" : "Below your 40% target"}
            </p>
          </Section>
        </div>
      </Shell>
      
      <AddTransactionModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}


const ROLE_CONFIG = {
  friendly: {
    name: "Aria",
    title: "Friendly Coach",
    color: "#1f9b78",
    darkColor: "#4eba94",
    bg: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/20",
    accent: "#1f7a63",
    avatar: "✦",
    greeting: "Hey there! I'm Aria, your personal financial coach. I've been looking at your recent activity — you're doing really well! Your savings rate is above target. What's on your mind today?",
    suggestions: [
      "How can I save more this month?",
      "Am I on track for my Emergency Fund?",
      "Any tips to reduce my expenses?",
      "How do I start investing?",
    ],
    replies: {
      save: "You're already doing great with 44.7% savings! Small wins: try a ₹500/week 'no-spend challenge' on weekdays. You saved ₹12,500 from freelance last month — try auto-transferring 20% of any bonus income directly to your Emergency Fund!",
      emergency: "You're 68% there — that's amazing! At your current pace, you'll hit ₹3,00,000 in about 6 weeks. Keep it up! 🎉",
      reduce: "I noticed you spent ₹649 on Netflix this month. Sharing a family plan could save you ~₹350/mo. Also, your dining spend seems a bit high — meal prepping even 2 days a week can save ₹1,500+!",
      invest: "Great question! Since you already have a growing Emergency Fund, maybe start with a small SIP — even ₹2,000/month in a Nifty 50 index fund is a solid start. You're doing well!",
      default: "That's a great question! Based on your current spending patterns, you're in a really healthy position. Your savings rate of 44.7% is well above the recommended 30%. Keep maintaining this momentum and you'll reach your MacBook Pro goal ahead of schedule!",
    },
  },
  strict: {
    name: "Rex",
    title: "Strict Advisor",
    color: "#dc6b3f",
    darkColor: "#f0926b",
    bg: "from-orange-500/10 to-red-500/5",
    border: "border-orange-500/20",
    accent: "#b85530",
    avatar: "⬡",
    greeting: "I'm Rex. I don't sugarcoat things. I've analyzed your data — your savings rate is acceptable, but there are inefficiencies. Your discretionary spending needs attention immediately. What do you want to address?",
    suggestions: [
      "Where am I wasting money?",
      "How do I reach goals faster?",
      "Am I being financially disciplined?",
      "What should I cut first?",
    ],
    replies: {
      save: "You spent ₹649 on Netflix last month. That's ₹7,788 per year — gone. If you're serious about the MacBook Pro goal, eliminate non-essentials immediately. Every rupee wasted is a day further from your goal. No compromises.",
      emergency: "68% completion after X months is not impressive enough. You should be saving a minimum of ₹10,000 per month toward this — non-negotiable. The rest of your spending must be restructured around this priority.",
      reduce: "Entertainment: ₹649. Lifestyle: ₹4,100. These are luxuries. Cut them in half, minimum. Redirect the savings into your goals. Comfort now means struggle later. Make the hard choice.",
      invest: "You haven't started investing yet? Every month you delay is compounded losses over time. Open a basic Nifty 50 SIP today — minimum ₹5,000/month. Stop overthinking and act.",
      default: "Your numbers show potential, but you're coasting. 44.7% savings rate is good, not great. To achieve financial independence, you need to push to 55%+ and eliminate all non-essential spending immediately.",
    },
  },
  analyst: {
    name: "Sigma",
    title: "Data Analyst",
    color: "#6b5fd4",
    darkColor: "#9a88dd",
    bg: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/20",
    accent: "#4d41a8",
    avatar: "∑",
    greeting: "Sigma initialized. Scanning financial profile... Savings rate: 44.7% (benchmark: 40% ✓). Expense ratio: 55.3%. 3 active goals detected. Emergency fund: 68% funded. Awaiting query.",
    suggestions: [
      "Run a savings rate analysis",
      "Forecast goal completion dates",
      "Analyze my spending patterns",
      "Show my investment projections",
    ],
    replies: {
      save: "Current savings rate: 44.7% (↑4.7% above 40% benchmark). Monthly surplus: ₹41,160. If allocated 100% to savings: goal completion accelerated by 2.3 months. Recommended: auto-invest ₹5,000/month via SIP to grow corpus at projected 12-14% CAGR.",
      emergency: "Emergency fund status: ₹2,04,000 / ₹3,00,000 (68%). Deficit: ₹96,000. At current savings velocity of ₹5,000/month toward this goal: ETA 19.2 weeks. Accelerating to ₹8,000/month: ETA 12 weeks. Recommend velocity increase.",
      reduce: "Expense breakdown — Housing: 45.1% | Food: 20.7% | Entertainment: 1.6% | Transport: 12.7% | Lifestyle: 10.0%. Entertainment and Lifestyle combined at 11.6% — above optimal 8% threshold. Reduction of ₹1,500 in Lifestyle would improve savings rate by 3.6%.",
      invest: "Investment corpus recommendation: Based on ₹41,160 monthly surplus, optimal allocation — Equity SIP: 60% (₹24,696) | Debt funds: 25% (₹10,290) | Gold: 15% (₹6,174). Projected 10Y corpus at 12% CAGR: ₹57.4L.",
      default: "Data analysis complete. Key metrics: Net income ₹1,04,500 | Expenses ₹57,840 | Savings ₹46,660 | Rate 44.67%. Anomaly detected: Transaction volatility up 8.4% month-over-month. No critical threshold breaches. System status: Optimal.",
    },
  },
};

type RoleKey = keyof typeof ROLE_CONFIG;

function TypewriterText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => { setDisplayed(p => p + text[i]); setI(p => p + 1); }, 18);
      return () => clearTimeout(t);
    } else { onDone?.(); }
  }, [i, text]);
  return <>{displayed}<span className="animate-pulse">▍</span></>;
}

function AICoachPage() {
  const { user } = useAuth();
  const [role, setRole] = useState<RoleKey>("friendly");
  const [messages, setMessages] = useState<{ role: string; text: string; typing?: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [switchingRole, setSwitchingRole] = useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const cfg = ROLE_CONFIG[role];

  // Initialize greeting when role changes
  useEffect(() => {
    setSwitchingRole(true);
    setMessages([]);
    const t = setTimeout(() => {
      setSwitchingRole(false);
      setMessages([{ role: "ai", text: ROLE_CONFIG[role].greeting, typing: true }]);
      setInitialized(true);
    }, 400);
    return () => clearTimeout(t);
  }, [role]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getReply = (q: string): string => {
    const lower = q.toLowerCase();
    const r = ROLE_CONFIG[role].replies;
    if (lower.includes("save") || lower.includes("saving")) return r.save;
    if (lower.includes("emergency") || lower.includes("track") || lower.includes("goal")) return r.emergency;
    if (lower.includes("reduc") || lower.includes("cut") || lower.includes("waste") || lower.includes("disciplin")) return r.reduce;
    if (lower.includes("invest") || lower.includes("sip") || lower.includes("mutual")) return r.invest;
    return r.default;
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "ai", text: getReply(text), typing: true }]);
    }, delay);
  };

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  return (
    <Shell meta={pageMeta["ai-coach"]}>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
        {/* Sidebar — Persona selection */}
        <div className="space-y-4">
          {/* Persona cards */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">Choose Brain</p>
            <div className="space-y-2.5">
              {(Object.keys(ROLE_CONFIG) as RoleKey[]).map((key) => {
                const c = ROLE_CONFIG[key];
                const active = role === key;
                return (
                  <button key={key} onClick={() => setRole(key)}
                    className={`group w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${active ? `border-2 bg-gradient-to-br ${c.bg} ${c.border}` : "border-border bg-transparent hover:bg-secondary/60"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-black transition-all ${active ? "bg-white/80 dark:bg-card shadow-sm" : "bg-secondary"}`}
                        style={{ color: active ? c.color : "" }}>
                        {c.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-extrabold text-foreground truncate">{c.name}</p>
                          {active && <span className="ml-auto shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#1f7a63] text-white"><Check size={10} /></span>}
                        </div>
                        <p className="text-[10px] text-muted-foreground">{c.title}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Active persona details */}
          <section className={`rounded-2xl border bg-gradient-to-br ${cfg.bg} ${cfg.border} p-5`}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 dark:bg-card text-2xl font-black shadow"
                style={{ color: cfg.color }}>{cfg.avatar}</div>
              <div>
                <p className="text-[14px] font-extrabold text-foreground">{cfg.name}</p>
                <p className="text-[11px]" style={{ color: cfg.color }}>{cfg.title}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Suggested prompts</p>
              {cfg.suggestions.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="w-full rounded-lg border border-border/60 bg-white/50 dark:bg-card/50 px-3 py-2 text-left text-[11px] font-medium text-foreground transition hover:bg-white dark:hover:bg-card hover:shadow-sm">
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Chat area */}
        <section className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm" style={{ minHeight: "600px", maxHeight: "75vh" }}>
          {/* Header */}
          <div className={`flex items-center gap-4 border-b border-border px-6 py-4 bg-gradient-to-r ${cfg.bg}`}>
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 dark:bg-card shadow text-xl font-black"
                style={{ color: cfg.color }}>{cfg.avatar}</div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#36b78e]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-foreground">{cfg.name} · <span className="font-semibold text-muted-foreground text-[12px]">{cfg.title}</span></p>
              <p className="text-[11px]" style={{ color: cfg.color }}>Nexora AI Coach · Analyzing your financial data</p>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-white/60 dark:bg-card px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36b78e] animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground">Role-based AI</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {switchingRole ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl font-black" style={{ color: cfg.color }}>{cfg.avatar}</div>
                  <p className="text-sm font-bold text-foreground">Switching to {cfg.name}...</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Loading {cfg.title} persona</p>
                </div>
              </div>
            ) : messages.map((m, idx) => {
              const isAI = m.role === "ai";
              const isLast = idx === messages.length - 1;
              return (
                <div key={idx} className={`flex items-end gap-3 ${isAI ? "justify-start" : "justify-end"}`}>
                  {isAI && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-base font-black mb-1"
                      style={{ color: cfg.color }}>{cfg.avatar}</div>
                  )}
                  <div className={`max-w-[80%] ${isAI ? "" : "order-first"}`}>
                    {isAI && <p className="mb-1 text-[10px] font-bold text-muted-foreground">{cfg.name}</p>}
                    <div className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                      isAI
                        ? "rounded-bl-none bg-secondary text-foreground"
                        : "rounded-br-none bg-[#1f7a63] text-white"
                    }`}>
                      {isAI && m.typing && isLast
                        ? <TypewriterText text={m.text} />
                        : m.text}
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  {!isAI && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary mb-1">
                      {user?.fullName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-end gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-base font-black" style={{ color: cfg.color }}>{cfg.avatar}</div>
                <div className="rounded-2xl rounded-bl-none bg-secondary px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background/50 px-5 py-4">
            <form onSubmit={onSubmit} className="flex items-end gap-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={`Ask ${cfg.name} anything about your finances...`}
                  disabled={isTyping || switchingRole}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-[13px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#1f9b78] focus:ring-2 focus:ring-[#1f9b78]/10 disabled:opacity-50"
                />
              </div>
              <button type="submit" disabled={!input.trim() || isTyping || switchingRole}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                style={{ backgroundColor: cfg.accent }}>
                <ArrowUpRight size={20} />
              </button>
            </form>
            <p className="mt-2.5 text-center text-[10px] text-muted-foreground">
              Powered by <span className="font-bold" style={{ color: cfg.color }}>Nexora AI</span> · {cfg.name} persona active · Rule-based insights from your data
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function Planner({ kind }: { kind: string }) { 
  const { goals, categories, budgets, cashFlow, removeGoal, updateGoalAmount } = useAppData();
  const [showAdd, setShowAdd] = useState(false);
  const meta = pageMeta[kind]; 
  
  // For budget planner, we'll use budgets. For goals, we use the global goals state.
  const data = kind === "budget-planner" 
    ? budgets.map(b => ({ id: b.name, label: b.name, value: Math.min(100, (b.value / 100000) * 100).toFixed(0), amount: `₹${b.value.toLocaleString()}`, color: b.color })) 
    : goals.map(g => ({ id: g.id, label: g.label, value: g.value, amount: `₹${g.currentAmount.toLocaleString()} / ₹${g.targetAmount.toLocaleString()}`, color: g.color })); 

  return (
    <>
      <Shell meta={meta} onAction={kind === "goals" ? () => setShowAdd(true) : undefined}>
        <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
          <Section title={kind === "goals" ? "Your progress" : "July allocation"} subtitle={kind === "goals" ? "Three dreams in motion" : "Planned versus actual spending"}>
            <div className="space-y-6">
              {data.map(d => (
                <div key={d.label} className="group relative">
                  <div className="mb-2 flex justify-between">
                    <span className="text-[12px] font-bold text-foreground">{d.label}</span>
                    <span className="text-[11px] font-extrabold" style={{ color: d.color }}>{d.value}%</span>
                  </div>
                  <Progress value={Number(d.value)} color={d.color} />
                  <p className="mt-2 text-[10px] text-[#9aada7] dark:text-muted-foreground">{d.amount}</p>
                  
                  {kind === "goals" && (
                    <div className="absolute right-0 top-6 ml-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => updateGoalAmount(d.id, 5000)} className="rounded-lg p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                        <Plus size={15} />
                      </button>
                      <button onClick={() => updateGoalAmount(d.id, -5000)} className="rounded-lg p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                        <Minus size={15} />
                      </button>
                      <button onClick={() => removeGoal(d.id)} className="rounded-lg p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {data.length === 0 && <p className="text-sm text-muted-foreground py-4">No data yet.</p>}
            </div>
          </Section>
          <Section title={kind === "goals" ? "Goal momentum" : "Budget health"} subtitle="Your latest financial signal">
            <div className="rounded-2xl bg-[#edf8f3] dark:bg-primary/20 p-5">
              <Sparkles className="text-[#2b9b78] dark:text-primary" size={20} />
              <p className="mt-4 text-lg font-extrabold text-[#205c4c] dark:text-white">{kind === "goals" ? "Ahead of schedule" : "On the right track"}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-[#6e9285] dark:text-white/80">Your current pace is better than last month. Keep the momentum going with one small action this week.</p>
            </div>
          </Section>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Section title="Monthly snapshot" subtitle="A quick view of your numbers">
            <div className="grid grid-cols-2 gap-4">
              {[["Planned", "₹72,000"], ["Used", "₹57,840"], ["Remaining", "₹14,160"], ["On track", "Yes"]].map(([a, b]) => (
                <div className="rounded-xl bg-[#f6faf8] dark:bg-secondary p-3" key={a}>
                  <p className="text-[10px] text-[#8fa59e] dark:text-muted-foreground">{a}</p>
                  <p className="mt-1 text-lg font-extrabold text-foreground">{b}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Smart suggestions" subtitle="Personalized for you">
            <div className="space-y-3">
              {["Set aside ₹1,500 more this month", "Review your optional spending", "Your progress improved by 12%"].map(t => (
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#55766c] dark:text-muted-foreground" key={t}>
                  <div className="rounded-full bg-[#e5f6ed] dark:bg-primary/20 p-1 text-[#319b78] dark:text-primary"><Check size={12} /></div>
                  {t}
                </div>
              ))}
            </div>
          </Section>
        </div>
        <div className="mt-5">
          <Section title="Upcoming milestones" subtitle="Keep an eye on what is next">
            <div className="grid gap-3 sm:grid-cols-3">
              {["Rent due in 3 days", "Goal contribution in 8 days", "Budget review in 12 days"].map((t) => (
                <div className="flex items-center gap-3 rounded-xl border border-[#edf3f0] dark:border-border p-3" key={t}>
                  <CalendarDays className="text-[#51ad8c] dark:text-primary" size={18} />
                  <p className="text-[11px] font-bold text-foreground">{t}<span className="mt-1 block text-[10px] font-normal text-[#99aca5] dark:text-muted-foreground">Stay prepared</span></p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </Shell>
      {kind === "goals" && <AddGoalModal isOpen={showAdd} onClose={() => setShowAdd(false)} />}
      {kind === "budget-planner" && <AddCategoryModal isOpen={showAdd} onClose={() => setShowAdd(false)} />}
    </>
  ); 
}

function SettingsPage() { 
  return (
    <Shell meta={pageMeta["settings"]}>
      <div className="mt-10 flex flex-col items-center justify-center text-center">
        <Settings size={48} className="text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-extrabold text-foreground">Settings configuration</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">Customize your experience, manage connected accounts, and update preferences.</p>
      </div>
    </Shell>
  );
}

function ProfileSettings() { 
  const { user } = useAuth();
  const [salary, setSalary] = useState("120000");
  const [payDate, setPayDate] = useState("1");
  const [saved, setSaved] = useState(false);
  return (
    <Shell meta={pageMeta["profile-settings"]}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Section title="Personal details" subtitle="Manage your profile information">
          <div className="flex items-center gap-4 rounded-xl bg-[#f6faf8] dark:bg-secondary p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#299a7b] text-xl font-black text-white">{user?.fullName?.charAt(0) || "U"}</div>
            <div>
              <p className="text-sm font-extrabold text-foreground">{user?.fullName || "User"}</p>
              <p className="mt-1 text-[11px] text-[#8ca29a] dark:text-muted-foreground">{user?.email}</p>
              <button className="mt-2 text-[10px] font-bold text-[#299a7b]">Change profile photo</button>
            </div>
          </div>
        </Section>
        <Section title="Account status" subtitle="Your account is protected">
          <div className="flex items-center gap-3 rounded-xl bg-[#edf8f3] dark:bg-primary/20 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-card text-[#299a7b] dark:text-primary"><Check size={17} /></div>
            <div>
              <p className="text-[12px] font-bold text-[#205c4c] dark:text-primary-foreground">Active and verified</p>
              <p className="mt-1 text-[10px] text-[#6e9285] dark:text-primary-foreground/70">Your profile is ready to use.</p>
            </div>
          </div>
        </Section>
      </div>
      <div className="mt-5">
        <Section title="Salary payment details" subtitle="Used for forecasts, reminders, and financial planning">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold text-[#55766c] dark:text-muted-foreground">Monthly salary</span>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm font-bold text-[#7e9990]">₹</span>
                <input value={salary} onChange={e => { setSalary(e.target.value); setSaved(false); }} className="h-11 w-full rounded-xl border border-[#dceae4] dark:border-border bg-transparent pl-8 pr-3 text-sm font-bold text-foreground outline-none focus:border-[#4eae8b]" />
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold text-[#55766c] dark:text-muted-foreground">Salary credited every month on</span>
              <div className="relative">
                <input type="number" min="1" max="31" value={payDate} onChange={e => { setPayDate(e.target.value); setSaved(false); }} className="h-11 w-full rounded-xl border border-[#dceae4] dark:border-border bg-transparent px-3 text-sm font-bold text-foreground outline-none focus:border-[#4eae8b]" />
                <span className="absolute right-3 top-3 text-[10px] font-semibold text-[#8ca29a]">day of month</span>
              </div>
            </label>
          </div>
          <div className="mt-4 rounded-xl bg-[#f4faf7] dark:bg-secondary p-4">
            <p className="text-[11px] font-bold text-[#55766c] dark:text-muted-foreground">Next expected salary</p>
            <p className="mt-1 text-lg font-extrabold text-[#205c4c] dark:text-foreground">₹{Number(salary || 0).toLocaleString()} <span className="text-[11px] font-semibold text-[#8ca29a] dark:text-muted-foreground">on the {payDate || "1"}{["1", "21", "31"].includes(payDate) ? "st" : ["2", "22"].includes(payDate) ? "nd" : ["3", "23"].includes(payDate) ? "rd" : "th"}</span></p>
          </div>
          <button onClick={() => setSaved(true)} className="mt-5 rounded-xl bg-[#1f7a63] px-5 py-3 text-xs font-bold text-white">{saved ? "Saved successfully" : "Save payment details"}</button>
        </Section>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[["Employment type", "Full time"], ["Company", "Nexora Technologies"], ["Currency", "Indian Rupee (₹)"]].map(([a, b]) => (
          <Section title={a} subtitle="Profile information" key={a}>
            <p className="text-sm font-extrabold text-foreground">{b}</p>
          </Section>
        ))}
      </div>
    </Shell>
  ); 
}

function PrivacySecurity() { 
  return (
    <Shell meta={pageMeta["privacy-security"]}>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <Section title="Security overview" subtitle="Your account protection at a glance">
          <div className="flex items-center gap-4 rounded-2xl bg-[#edf8f3] dark:bg-primary/20 p-5">
            <div className="score-orb h-20 w-20 text-xl text-primary">A+</div>
            <div>
              <p className="text-lg font-extrabold text-[#205c4c] dark:text-primary-foreground">Strong protection</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#6e9285] dark:text-primary-foreground/70">Your password and login activity look healthy.</p>
            </div>
          </div>
        </Section>
        <Section title="Privacy controls" subtitle="You are in control of your data">
          <div className="space-y-3">
            {["Personalized AI recommendations", "Product updates by email", "Anonymous product analytics"].map((t, i) => (
              <label className="flex items-center justify-between rounded-xl bg-[#f6faf8] dark:bg-secondary p-3 text-[11px] font-semibold text-[#55766c] dark:text-muted-foreground" key={t}>
                {t}
                <input type="checkbox" defaultChecked={i === 0} className="h-4 w-4 accent-[#278c70]" />
              </label>
            ))}
          </div>
        </Section>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[["Password", "Last changed 32 days ago", "Update password"], ["Two-factor authentication", "Not enabled", "Enable 2FA"], ["Active sessions", "2 devices signed in", "Review sessions"]].map(([a, b, c]) => (
          <Section title={a} subtitle={b} key={a}>
            <ShieldCheck size={20} className="text-[#4eaa88] dark:text-primary" />
            <button className="mt-4 text-[10px] font-bold text-[#299a7b] dark:text-primary">{c} <ChevronRight className="ml-1 inline" size={12} /></button>
          </Section>
        ))}
      </div>
      <div className="mt-5">
        <Section title="Danger zone" subtitle="These actions affect your account access">
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#f3d9d3] dark:border-destructive/30 bg-[#fff8f6] dark:bg-destructive/10 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[12px] font-bold text-[#9d5b4f] dark:text-destructive">Sign out of all devices</p>
              <p className="mt-1 text-[10px] text-[#b88980] dark:text-destructive/70">End every active session except this one.</p>
            </div>
            <button className="rounded-xl border border-[#e7b9ae] dark:border-destructive/50 px-3 py-2 text-[10px] font-bold text-[#a96254] dark:text-destructive">Sign out everywhere</button>
          </div>
        </Section>
      </div>
    </Shell>
  ); 
}

function SalarySlips() {
  const { salarySlips } = useAppData();
  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <Shell meta={pageMeta["salary-slips"]} onAction={() => setShowAdd(true)}>
        <Section title="Your uploaded slips" subtitle="Keep track of your income records">
          <div className="space-y-3">
            {salarySlips.map(s => (
              <div key={s.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition hover:bg-secondary">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.date} · {s.size}</p>
                  </div>
                </div>
                <button className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-primary/20">View PDF</button>
              </div>
            ))}
            {salarySlips.length === 0 && <p className="text-sm text-muted-foreground">No salary slips uploaded yet.</p>}
          </div>
        </Section>
      </Shell>
      <AddSalarySlipModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}

function Investments() {
  const { investments } = useAppData();
  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <Shell meta={pageMeta["investments"]} onAction={() => setShowAdd(true)}>
        <Section title="Your portfolio" subtitle="All your investments in one place">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investments.map(inv => (
              <div key={inv.id} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/50">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp size={18} />
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-500">+{inv.returnRate}%</span>
                </div>
                <p className="text-sm font-bold text-foreground">{inv.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{inv.type}</p>
                <p className="mt-4 text-xl font-black text-foreground">₹{inv.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Section>
      </Shell>
      <AddInvestmentModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}

function Health() {
  const { cashFlow } = useAppData();
  return (
    <Shell meta={pageMeta["financial-health"]}>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Section title="Portfolio overview" subtitle="Value across your accounts">
          <div className="flex items-end gap-3">
            <p className="text-3xl font-extrabold text-foreground">₹4,82,650</p>
            <span className="mb-1 text-[11px] font-bold text-[#2b9b78]">+14.8%</span>
          </div>
          <div className="mt-5">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={cashFlow}>
                <CartesianGrid vertical={false} stroke="#edf4f1" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9badA7" }} />
                <Bar dataKey="income" fill="#4eb894" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Health score" subtitle="Based on your complete picture">
          <div className="flex items-center gap-5">
            <div className="score-orb h-24 w-24 text-2xl">82</div>
            <div>
              <p className="text-lg font-extrabold text-foreground">Excellent</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#8ca29a] dark:text-muted-foreground">You are building a strong financial foundation.</p>
            </div>
          </div>
        </Section>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {["Account summary", "Recent activity", "Next best action"].map((t, i) => (
          <Section title={t} subtitle={i === 0 ? "Updated just now" : i === 1 ? "Last 30 days" : "AI recommendation"} key={t}>
            <p className="text-xl font-extrabold text-foreground">{["₹1,84,260", "18 activities", "Save ₹1,500"][i]}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#8ca29a] dark:text-muted-foreground">{["Across all linked accounts", "Everything looks secure", "Reach your goal sooner"][i]}</p>
          </Section>
        ))}
      </div>
      <div className="mt-5">
        <Section title="Detailed insights" subtitle="A closer look at your financial condition">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Savings rate", "Debt ratio", "Emergency fund", "Goal progress"].map((t, i) => (
              <div className="rounded-xl bg-[#f5faf7] dark:bg-secondary p-4" key={t}>
                <p className="text-[10px] text-[#8ca29a] dark:text-muted-foreground">{t}</p>
                <p className="mt-2 text-lg font-extrabold text-foreground">{["44.7%", "18.2%", "68%", "52%"][i]}</p>
                <Progress value={[82, 66, 68, 52][i]} />
              </div>
            ))}
          </div>
        </Section>
      </div>
      <div className="mt-5">
        <Section title="Recommendations" subtitle="Small changes with meaningful impact">
          <div className="flex items-start gap-3 rounded-xl bg-[#edf8f3] dark:bg-primary/20 p-4">
            <Sparkles className="mt-0.5 text-[#2b9b78] dark:text-primary" size={17} />
            <p className="text-[11px] leading-relaxed text-[#5d8377] dark:text-primary-foreground/80">Your financial condition improved compared to last month. Keep discretionary spending below ₹18,000 to maintain this trajectory.</p>
          </div>
        </Section>
      </div>
    </Shell>
  );
}

function SimplePage({ kind }: { kind: string }) { 
  if (kind === "profile-settings") return <ProfileSettings />; 
  if (kind === "privacy-security") return <PrivacySecurity />; 
  if (kind === "salary-slips") return <SalarySlips />; 
  if (kind === "investments") return <Investments />; 
  if (kind === "financial-health") return <Health />; 
  if (kind === "settings") return <SettingsPage />; 
  return <Health />; // fallback
}

export default function Workspace() { const key = useLocation().pathname.slice(1) || "transactions"; return key === "transactions" ? <Transactions /> : key === "budget-planner" || key === "goals" ? <Planner kind={key} /> : key === "ai-coach" ? <AICoachPage /> : <SimplePage kind={pageMeta[key] ? key : "investments"} />; }
