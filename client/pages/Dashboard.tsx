import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const chartData = [
  { month: "Jan", income: 72, expenses: 42 },
  { month: "Feb", income: 76, expenses: 48 },
  { month: "Mar", income: 74, expenses: 44 },
  { month: "Apr", income: 80, expenses: 51 },
  { month: "May", income: 82, expenses: 46 },
  { month: "Jun", income: 86, expenses: 53 },
  { month: "Jul", income: 89, expenses: 49 },
];

const transactions = [
  { icon: Home, name: "Apartment rent", meta: "Housing · Today, 9:42 AM", amount: "−₹18,500", color: "coral" },
  { icon: Gift, name: "Salary credited", meta: "Income · Jul 01, 2024", amount: "+₹92,000", color: "mint" },
  { icon: CreditCard, name: "Netflix subscription", meta: "Entertainment · Jun 30, 2024", amount: "−₹649", color: "lavender" },
  { icon: Wallet, name: "Freelance project", meta: "Additional income · Jun 28, 2024", amount: "+₹12,500", color: "blue" },
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

function StatCard({ title, value, detail, icon: Icon, tone, progress }: { title: string; value: string; detail: string; icon: typeof Wallet; tone: string; progress?: number }) {
  return <div className={`stat-card ${tone} animate-rise`}>
    <div className="flex items-start justify-between"><div><p className="text-[12px] font-semibold tracking-wide text-[#6d827d]">{title}</p><h3 className="mt-2 text-[25px] font-extrabold tracking-[-0.04em] text-[#18352f]">{value}</h3></div><div className="rounded-xl bg-white/70 p-2.5 text-[#287d69]"><Icon size={19} /></div></div>
    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#57806f]"><ArrowUpRight size={14} />{detail}</div>
    {progress && <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/70"><div className="h-full rounded-full bg-[#287d69]" style={{ width: `${progress}%` }} /></div>}
  </div>;
}

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [period, setPeriod] = useState("This year");
  const [showAdd, setShowAdd] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentDate(new Date()), 60_000);
    return () => window.clearInterval(timer);
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
  }).format(currentDate);

  return <div className="min-h-screen bg-[#f7faf8] text-[#18352f]">
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-[246px] flex-col border-r border-[#e4eeea] bg-white px-5 py-6 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-1"><Logo /><button className="text-[#78908a] lg:hidden" onClick={() => setMenuOpen(false)}><X size={20} /></button></div>
      <div className="mt-12"><p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9aaca7]">Workspace</p><nav className="space-y-1">{navItems.map(({ label, icon: Icon }, index) => <Link key={label} to={index === 0 ? "/" : `/${label.toLowerCase().replace(/ /g, "-")}`} className={`nav-item ${index === 0 ? "active" : ""}`}><Icon size={17} />{label}{label === "Transactions" && <span className="ml-auto rounded-full bg-[#edf7f3] px-2 py-0.5 text-[10px] text-[#39856e]">24</span>}</Link>)}</nav></div>
      <div className="mt-9"><p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9aaca7]">Manage</p><nav className="space-y-1"><Link to="/investments" className="nav-item"><TrendingUp size={17} />Investments</Link><Link to="/financial-health" className="nav-item"><ShieldCheck size={17} />Financial health</Link><Link to="/settings" className="nav-item"><Settings size={17} />Settings</Link></nav></div>
      <div className="mt-auto rounded-2xl bg-[#edf8f3] p-4"><div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#d2eee3] text-[#237d65]"><Sparkles size={16} /></div><p className="text-[12px] font-bold text-[#235e4e]">Your AI coach is ready</p><p className="mt-1 text-[11px] leading-relaxed text-[#6d9184]">Get smarter suggestions based on your spending.</p><button className="mt-3 text-[11px] font-bold text-[#1f856b]">View insights <ChevronRight className="ml-1 inline" size={13} /></button></div>
    </aside>
    {menuOpen && <button aria-label="Close menu" className="fixed inset-0 z-20 bg-[#15352e]/20 lg:hidden" onClick={() => setMenuOpen(false)} />}
    <main className="lg:pl-[246px]">
      <header className="relative z-50 flex h-[76px] items-center justify-between border-b border-[#e8f0ec] bg-white/95 px-5 backdrop-blur-md sm:px-8"><div className="flex items-center gap-4"><button className="text-[#52756b] lg:hidden" onClick={() => setMenuOpen(true)}><Menu size={22} /></button><div className="relative hidden sm:block"><Search className="absolute left-3 top-2.5 text-[#9aafaa]" size={16} /><input className="h-9 w-56 rounded-xl border-0 bg-[#f5f9f7] pl-9 text-xs outline-none placeholder:text-[#a3b5b0]" placeholder="Search anything..." /></div><div className="hidden items-center gap-2 rounded-xl bg-[#f5f9f7] px-3 py-2 text-[11px] font-semibold text-[#78908a] md:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#36b78e]" />All systems normal</div></div><div className="flex items-center gap-4"><button className="relative text-[#69857c]"><Bell size={19} /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-[#f17767]" /></button><div className="h-6 w-px bg-[#e5eeea]" /><div ref={profileRef} className="relative"><button onClick={() => setProfileOpen(!profileOpen)} className="group flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-[#f1f8f4]" aria-expanded={profileOpen}><div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#dff1e9] text-xs font-extrabold text-[#22775f] ring-2 ring-transparent transition group-hover:ring-[#bde5d6]">{user?.fullName?.charAt(0) || "U"}<span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#43b88e]" /></div><div className="hidden text-left sm:block"><p className="text-[11px] font-bold text-[#284b42]">{user?.fullName || "User"}</p><p className="text-[10px] text-[#93a7a1]">Personal account</p></div><ChevronDown size={14} className={`text-[#8aa09a] transition-transform ${profileOpen ? "rotate-180" : ""}`} /></button>{profileOpen && <div className="profile-menu absolute right-0 top-[calc(100%+12px)] z-[100] w-[calc(100vw-2rem)] max-w-64 overflow-hidden rounded-2xl border border-[#dcece5] bg-white p-2 shadow-[0_18px_50px_rgba(22,75,58,0.16)]"><div className="rounded-xl bg-[#eff9f4] p-3"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cdebdc] text-sm font-extrabold text-[#237b63]">{user?.fullName?.charAt(0) || "U"}</div><div><p className="text-xs font-extrabold text-[#244c40]">{user?.fullName || "User"}</p><p className="mt-0.5 text-[10px] text-[#729188]">{user?.email || ""}</p></div></div><div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-[#39856e]"><span className="h-1.5 w-1.5 rounded-full bg-[#43b88e]" />Personal account</div></div><div className="my-2 h-px bg-[#edf3f0]" /><Link to="/profile-settings" onClick={() => setProfileOpen(false)} className="profile-menu-item"><UserRound size={15} />Profile settings</Link><Link to="/privacy-security" onClick={() => setProfileOpen(false)} className="profile-menu-item"><ShieldCheck size={15} />Privacy & security</Link><button onClick={() => { logout(); navigate("/"); }} className="profile-menu-item text-[#d37668] hover:bg-[#fff4f1] w-full text-left"><LogOut size={15} />Sign out</button></div>}</div></div></header>
      <div className="dashboard-content mx-auto max-w-[1450px] px-5 py-7 sm:px-8 lg:px-10"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#5aa08a]">{formattedDate}</p><h1 className="text-[30px] font-extrabold tracking-[-0.05em] text-[#173b32] sm:text-[34px]">Good morning, {user?.fullName?.split(' ')[0] || "User"} <span className="text-[#63a990]">✦</span></h1><p className="mt-1 text-[13px] text-[#78908a]">Here’s your financial pulse for this month.</p></div><div className="flex gap-2"><button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-xl bg-[#1f7a63] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#196b56]"><Plus size={16} />Add transaction</button><button className="flex items-center gap-2 rounded-xl border border-[#dceae4] bg-white px-3.5 py-2.5 text-xs font-bold text-[#4d7268]"><Upload size={15} />Upload slip</button></div></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard title="Total balance" value="₹1,84,260" detail="12.8% from last month" icon={Wallet} tone="tone-green" /><StatCard title="Monthly income" value="₹1,04,500" detail="8.4% from last month" icon={ArrowDownRight} tone="tone-blue" /><StatCard title="Monthly expenses" value="₹57,840" detail="4.2% from last month" icon={ArrowUpRight} tone="tone-peach" /><StatCard title="Savings rate" value="44.7%" detail="Above your 40% target" icon={Target} tone="tone-lilac" progress={76} /></div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]"><section className="overflow-hidden rounded-2xl border border-[#e6efeb] bg-white p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[15px] font-extrabold">Income vs expenses</h2><p className="mt-1 text-[11px] text-[#91a59f]">Your cash flow over the last 7 months</p></div><select value={period} onChange={e => setPeriod(e.target.value)} className="rounded-lg border border-[#e6efeb] bg-[#fbfdfc] px-2.5 py-2 text-[11px] font-bold text-[#628078] outline-none"><option>This year</option><option>Last year</option></select></div><div className="mb-3 flex gap-5 text-[11px] font-semibold text-[#7f9790]"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#259777]" />Income</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#f29b82]" />Expenses</span></div><ResponsiveContainer width="100%" height={235}><AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55bd9b" stopOpacity={0.24} /><stop offset="100%" stopColor="#55bd9b" stopOpacity={0} /></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f29b82" stopOpacity={0.19} /><stop offset="100%" stopColor="#f29b82" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef4f1" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9badA7", fontSize: 10 }} dy={8} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#9badA7", fontSize: 10 }} tickFormatter={(v) => `₹${v}k`} /><Tooltip contentStyle={{ border: "0", borderRadius: "10px", fontSize: "11px", boxShadow: "0 6px 20px #235e4e18" }} /><Area type="monotone" dataKey="income" stroke="#299a7b" strokeWidth={2.5} fill="url(#incomeFill)" /><Area type="monotone" dataKey="expenses" stroke="#ef9b82" strokeWidth={2.5} fill="url(#expenseFill)" /></AreaChart></ResponsiveContainer></section><section className="overflow-hidden rounded-2xl border border-[#e6efeb] bg-white p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] sm:p-6"><div className="flex items-start justify-between"><div><h2 className="text-[15px] font-extrabold">Financial health</h2><p className="mt-1 text-[11px] text-[#91a59f]">Your overall money wellness</p></div><button className="text-[#a2b4ae]"><MoreHorizontal size={18} /></button></div><div className="health-gauge relative mx-auto mt-7 h-[145px] w-[250px] overflow-hidden"><div className="gauge-track absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full border-[18px] border-[#edf3f0]" /><div className="gauge-fill absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full border-[18px] border-transparent border-l-[#42b38e] border-t-[#42b38e] border-r-[#42b38e] rotate-[18deg]" /><div className="absolute inset-x-0 top-[65px] text-center"><p className="text-[40px] font-extrabold tracking-[-0.07em] text-[#194f40]">82</p><p className="text-[11px] font-bold text-[#65a18c]">Excellent</p></div></div><div className="mt-4 flex items-center justify-between rounded-xl bg-[#f6faf8] px-3 py-2.5"><span className="text-[11px] font-semibold text-[#78918a]">Top 18% of users</span><span className="flex items-center gap-1 text-[11px] font-bold text-[#299a7b]"><ArrowUpRight size={13} />+6 pts</span></div><p className="mt-4 text-[11px] leading-relaxed text-[#78918a]">You’re doing great. Keep your savings rate above 40% to reach your goals sooner.</p></section></div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><section className="overflow-hidden rounded-2xl border border-[#e6efeb] bg-white p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[15px] font-extrabold">Recent transactions</h2><p className="mt-1 text-[11px] text-[#91a59f]">Your latest money movements</p></div><button className="flex items-center gap-1 text-[11px] font-bold text-[#2c9678]">View all <ChevronRight size={14} /></button></div><div className="space-y-4">{transactions.map(({ icon: Icon, name, meta, amount, color }) => <div className="flex items-center gap-3" key={name}><div className={`transaction-icon ${color}`}><Icon size={16} /></div><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-bold text-[#34584e]">{name}</p><p className="mt-0.5 truncate text-[10px] text-[#9aada7]">{meta}</p></div><p className={`text-[12px] font-extrabold ${amount.startsWith("+") ? "text-[#2b9b78]" : "text-[#426259]"}`}>{amount}</p></div>)}</div></section><section className="overflow-hidden rounded-2xl border border-[#e6efeb] bg-white p-5 shadow-[0_5px_25px_rgba(32,85,68,0.03)] sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[15px] font-extrabold">Your goals</h2><p className="mt-1 text-[11px] text-[#91a59f]">Progress toward your dreams</p></div><button className="rounded-lg bg-[#edf8f3] p-2 text-[#2c9678]"><Plus size={15} /></button></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-[11px]"><span className="font-bold">Emergency fund</span><span className="font-extrabold text-[#2c9678]">68%</span></div><div className="h-2 rounded-full bg-[#edf4f0]"><div className="h-full w-[68%] rounded-full bg-[#4bb894]" /></div><p className="mt-1.5 text-[10px] text-[#9aada7]">₹2,04,000 of ₹3,00,000</p></div><div><div className="mb-2 flex justify-between text-[11px]"><span className="font-bold">MacBook Pro</span><span className="font-extrabold text-[#8b76d4]">42%</span></div><div className="h-2 rounded-full bg-[#f0eef9]"><div className="h-full w-[42%] rounded-full bg-[#9a88dd]" /></div><p className="mt-1.5 text-[10px] text-[#9aada7]">₹67,200 of ₹1,60,000</p></div><div><div className="mb-2 flex justify-between text-[11px]"><span className="font-bold">Goa trip</span><span className="font-extrabold text-[#e89173]">26%</span></div><div className="h-2 rounded-full bg-[#fdf0ec]"><div className="h-full w-[26%] rounded-full bg-[#f0a083]" /></div><p className="mt-1.5 text-[10px] text-[#9aada7]">₹13,000 of ₹50,000</p></div></div></section></div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#dcefe7] bg-[#eaf8f2] p-4 sm:p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#2a9c7a] shadow-sm"><Sparkles size={19} /></div><div className="flex-1"><p className="text-[12px] font-extrabold text-[#205c4c]">Nexora insight</p><p className="mt-1 text-[11px] text-[#6e9285]">Your savings are 12% higher than last month. You can reach your emergency fund goal 2 months sooner.</p></div><button className="hidden rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-[#2a9275] shadow-sm sm:block">See recommendation</button></div>
      </div>
    </main>
    {showAdd && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15352e]/30 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold">Add transaction</h2><p className="mt-1 text-xs text-[#8aa19a]">Keep your financial picture up to date.</p></div><button onClick={() => setShowAdd(false)} className="text-[#8da49d]"><X size={18} /></button></div><div className="mt-5 grid gap-3"><input className="rounded-xl border border-[#dfece6] px-3 py-3 text-sm outline-none focus:border-[#5bb795]" placeholder="What was this for?" /><div className="grid grid-cols-2 gap-3"><input className="rounded-xl border border-[#dfece6] px-3 py-3 text-sm outline-none focus:border-[#5bb795]" placeholder="Amount" /><select className="rounded-xl border border-[#dfece6] bg-white px-3 py-3 text-sm outline-none"><option>Expense</option><option>Income</option></select></div><select className="rounded-xl border border-[#dfece6] bg-white px-3 py-3 text-sm outline-none"><option>Choose category</option><option>Food</option><option>Travel</option><option>Shopping</option></select></div><button onClick={() => setShowAdd(false)} className="mt-5 w-full rounded-xl bg-[#1f7a63] py-3 text-sm font-bold text-white">Save transaction</button></div></div>}
  </div>;
}
