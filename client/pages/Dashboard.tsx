import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileText,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserRound,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import CountUpRaw from "react-countup";
import { useAppData } from "../context/AppDataContext";
import { AddTransactionModal } from "../components/AddTransactionModal";
import { Shell } from "./Workspace";

// @ts-ignore - Handle Vite CJS/ESM interop edge cases where default export is wrapped
const CountUp = (CountUpRaw && typeof CountUpRaw === 'object' && 'default' in CountUpRaw ? CountUpRaw.default : CountUpRaw) as any;

const chartData = [
  { month: "Jan", income: 72, expenses: 42 },
  { month: "Feb", income: 76, expenses: 48 },
  { month: "Mar", income: 74, expenses: 44 },
  { month: "Apr", income: 80, expenses: 51 },
  { month: "May", income: 82, expenses: 46 },
  { month: "Jun", income: 86, expenses: 53 },
  { month: "Jul", income: 89, expenses: 49 },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Transactions", icon: ArrowDownRight },
  { label: "Budget planner", icon: PieChart },
  { label: "Goals", icon: Target },
  { label: "Salary slips", icon: FileText },
];

function Logo() {
  return <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f7a63] text-white shadow-lg shadow-emerald-900/10"><CircleDollarSign size={21} strokeWidth={2.5} /></div><span className="text-[15px] font-extrabold tracking-tight text-[#18352f]">Nexora<span className="text-[#1f9b78]">.</span></span></div>;
}

function StatCard({ title, value, prefix = "", suffix = "", detail, icon: Icon, tone, progress }: { title: string; value: number; prefix?: string; suffix?: string; detail: string; icon: typeof Wallet; tone: string; progress?: number }) {
  return <div className={`stat-card ${tone} animate-rise`}>
    <div className="flex items-start justify-between"><div><p className="text-[12px] font-semibold tracking-wide text-foreground/70">{title}</p><h3 className="mt-2 text-[25px] font-extrabold tracking-[-0.04em] text-foreground"><CountUp end={value} prefix={prefix} suffix={suffix} separator="," duration={2} /></h3></div><div className="rounded-xl bg-background/50 p-2.5 text-foreground/90"><Icon size={19} /></div></div>
    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-foreground/80"><ArrowUpRight size={14} />{detail}</div>
    {progress && <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background/50"><div className="h-full rounded-full bg-foreground/50" style={{ width: `${progress}%` }} /></div>}
  </div>;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { transactions, goals } = useAppData();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [period, setPeriod] = useState("This year");
  const [showAdd, setShowAdd] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const currentBalance = totalIncome - totalExpense;
  const recentTransactions = transactions.slice(0, 3);
  const iconMap: Record<string, any> = { Home, Wallet, CreditCard, Zap, TrendingUp, UserRound, ShieldCheck, PieChart, Target, FileText };

  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [profileOpen]);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());

  return <Shell>
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#1f9b78]">{formattedDate}</p><h1 className="text-[30px] font-extrabold tracking-[-0.05em] text-foreground sm:text-[34px]">{greeting}, {user?.fullName?.split(' ')[0] || "User"} <span className="text-[#1f9b78]">✦</span></h1><p className="mt-1 text-[13px] text-muted-foreground">Here’s your financial pulse for this month.</p></div><div className="flex gap-2"><button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-[#1f7a63] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#196b56]"><Plus size={16} />Add transaction</button><button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-bold text-foreground"><Upload size={15} />Upload slip</button></div></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard title="Total balance" value={currentBalance} prefix="₹" detail="12.8% from last month" icon={Wallet} tone="tone-green" /><StatCard title="Monthly income" value={totalIncome} prefix="₹" detail="8.4% from last month" icon={ArrowDownRight} tone="tone-blue" /><StatCard title="Monthly expenses" value={totalExpense} prefix="₹" detail="4.2% from last month" icon={ArrowUpRight} tone="tone-peach" /><StatCard title="Savings rate" value={44.7} suffix="%" detail="Above your 40% target" icon={Target} tone="tone-lilac" progress={76} /></div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]"><section className="overflow-hidden rounded-2xl border border-[#e6efeb] dark:border-border bg-white dark:bg-card p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] dark:shadow-none sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[15px] font-extrabold">Income vs expenses</h2><p className="mt-1 text-[11px] text-[#91a59f] dark:text-muted-foreground">Your cash flow over the last 7 months</p></div><select value={period} onChange={e => setPeriod(e.target.value)} className="rounded-lg border border-[#e6efeb] dark:border-border bg-[#fbfdfc] dark:bg-secondary px-2.5 py-2 text-[11px] font-bold text-[#628078] dark:text-foreground outline-none"><option>This year</option><option>Last year</option></select></div><div className="mb-3 flex gap-5 text-[11px] font-semibold text-[#7f9790] dark:text-muted-foreground"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#259777]" />Income</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#f29b82]" />Expenses</span></div><ResponsiveContainer width="100%" height={235}><AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55bd9b" stopOpacity={0.24} /><stop offset="100%" stopColor="#55bd9b" stopOpacity={0} /></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f29b82" stopOpacity={0.19} /><stop offset="100%" stopColor="#f29b82" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef4f1" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9badA7", fontSize: 10 }} dy={8} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#9badA7", fontSize: 10 }} tickFormatter={(v) => `₹${v}k`} /><Tooltip contentStyle={{ border: "0", borderRadius: "10px", fontSize: "11px", boxShadow: "0 6px 20px #235e4e18" }} /><Area type="monotone" dataKey="income" stroke="#299a7b" strokeWidth={2.5} fill="url(#incomeFill)" /><Area type="monotone" dataKey="expenses" stroke="#ef9b82" strokeWidth={2.5} fill="url(#expenseFill)" /></AreaChart></ResponsiveContainer></section><section className="overflow-hidden rounded-2xl border border-[#e6efeb] dark:border-border bg-white dark:bg-card p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] dark:shadow-none sm:p-6"><div className="flex items-start justify-between"><div><h2 className="text-[15px] font-extrabold">Financial health</h2><p className="mt-1 text-[11px] text-[#91a59f] dark:text-muted-foreground">Your overall money wellness</p></div><button className="text-[#a2b4ae] dark:text-muted-foreground hover:text-foreground"><MoreHorizontal size={18} /></button></div><div className="health-gauge relative mx-auto mt-7 h-[145px] w-[250px] overflow-hidden"><div className="gauge-track absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full border-[18px] border-[#edf3f0] dark:border-secondary" /><div className="gauge-fill absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full border-[18px] border-transparent border-l-[#42b38e] border-t-[#42b38e] border-r-[#42b38e] rotate-[18deg]" /><div className="absolute inset-x-0 top-[65px] text-center"><p className="text-[40px] font-extrabold tracking-[-0.07em] text-[#194f40] dark:text-foreground">82</p><p className="text-[11px] font-bold text-[#65a18c] dark:text-[#42b38e]">Excellent</p></div></div><div className="mt-4 flex items-center justify-between rounded-xl bg-[#f6faf8] dark:bg-secondary px-3 py-2.5"><span className="text-[11px] font-semibold text-[#78918a] dark:text-muted-foreground">Top 18% of users</span><span className="flex items-center gap-1 text-[11px] font-bold text-[#299a7b]"><ArrowUpRight size={13} />+6 pts</span></div><p className="mt-4 text-[11px] leading-relaxed text-[#78918a] dark:text-muted-foreground">You’re doing great. Keep your savings rate above 40% to reach your goals sooner.</p></section></div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col overflow-hidden rounded-3xl border border-[#e6efeb] dark:border-border bg-white dark:bg-card shadow-[0_8px_30px_rgba(32,85,68,.04)] dark:shadow-none">
            <div className="flex items-center justify-between border-b border-[#f2f6f4] dark:border-border px-7 py-6">
              <h2 className="text-[15px] font-extrabold text-foreground">Recent Activity</h2>
              <button onClick={() => navigate("/transactions")} className="text-[11px] font-bold text-[#1f9b78] dark:text-[#4eba94] hover:underline">View all</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {recentTransactions.map((t, i) => {
                const Icon = iconMap[t.iconName] || CircleDollarSign;
                return (
                  <div key={t.id} className="group flex cursor-pointer items-center justify-between rounded-2xl p-3 transition hover:bg-[#f8fbf9] dark:hover:bg-secondary">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl tone-${t.amount < 0 ? 'coral' : 'mint'}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-foreground transition group-hover:text-[#1f9b78] dark:group-hover:text-[#4eba94]">{t.name}</p>
                        <p className="text-[11px] text-[#8ca29a] dark:text-muted-foreground mt-0.5">{t.category} · {t.date}</p>
                      </div>
                    </div>
                    <p className={`text-[13px] font-extrabold ${t.amount > 0 ? "text-[#1f9b78] dark:text-[#4eba94]" : "text-foreground"}`}>
                      {t.amount > 0 ? "+" : "−"}₹<CountUp end={Math.abs(t.amount)} duration={1} separator="," />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <section className="overflow-hidden rounded-2xl border border-[#e6efeb] dark:border-border bg-white dark:bg-card p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] dark:shadow-none sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-extrabold text-foreground">Your goals</h2>
                <p className="mt-1 text-[11px] text-[#91a59f] dark:text-muted-foreground">Progress toward your dreams</p>
              </div>
              <button onClick={() => navigate("/goals")} className="rounded-lg bg-[#edf8f3] dark:bg-primary/20 p-2 text-[#2c9678] dark:text-primary transition hover:bg-[#e2f5ec] dark:hover:bg-primary/30"><Plus size={15} /></button>
            </div>
            <div className="space-y-5">
              {goals.slice(0, 3).map((g) => (
                <div key={g.id}>
                  <div className="mb-2 flex justify-between text-[11px]">
                    <span className="font-bold text-foreground">{g.label}</span>
                    <span className="font-extrabold" style={{ color: g.color }}>{g.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#edf4f0] dark:bg-secondary">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${g.value}%`, backgroundColor: g.color }} />
                  </div>
                  <p className="mt-1.5 text-[10px] text-[#9aada7] dark:text-muted-foreground">
                    ₹<CountUp end={g.currentAmount} duration={1} separator="," /> of ₹<CountUp end={g.targetAmount} duration={1} separator="," />
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#dcefe7] bg-[#eaf8f2] dark:border-border dark:bg-card p-4 sm:p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-muted text-[#2a9c7a] shadow-sm"><Sparkles size={19} /></div><div className="flex-1"><p className="text-[12px] font-extrabold text-foreground">Nexora insight</p><p className="mt-1 text-[11px] text-muted-foreground">Your savings are 12% higher than last month. You can reach your emergency fund goal 2 months sooner.</p></div><button className="hidden rounded-lg bg-white dark:bg-muted px-3 py-2 text-[10px] font-bold text-[#2a9275] shadow-sm sm:block">See recommendation</button></div>
    <AddTransactionModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
  </Shell>;
}
