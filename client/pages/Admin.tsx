import { useAuth } from "../context/AuthContext";
import { useAppData } from "../context/AppDataContext";
import { Shell } from "./Workspace";
import { ShieldCheck, UserRound, Mail, DollarSign, Activity, ArrowUpRight, ArrowDownRight, CreditCard, Wallet, FileText, Zap, Home, TrendingUp, PieChart, Target, RefreshCw, Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const adminMeta = {
  title: "Admin Panel",
  eyebrow: "SYSTEM MANAGEMENT",
  description: "Manage users, monitor platform activity, and view global metrics.",
  icon: ShieldCheck,
  action: ""
};

const iconMap: Record<string, any> = { Home, Wallet, CreditCard, Zap, TrendingUp, UserRound, ShieldCheck, PieChart, Target, FileText };

export default function Admin() {
  const { user } = useAuth();
  const { expectedSalary: realExpectedSalary, transactions: realTransactions } = useAppData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"global" | "user">("global");

  const activeUser = selectedUser || user;
  
  const isMe = user?.id && activeUser?.id === user?.id;
  const rawSalary = localStorage.getItem(`nexora_data_${activeUser?.id}_expected_salary`);
  const rawTransactions = localStorage.getItem(`nexora_data_${activeUser?.id}_transactions`);
  
  const activeExpectedSalary = isMe ? realExpectedSalary : (rawSalary ? Number(rawSalary) : 0);
  const activeTransactions = isMe ? realTransactions : (rawTransactions ? JSON.parse(rawTransactions) : []);
  
  const totalIncome = activeTransactions.filter((t: any) => t.amount > 0).reduce((sum: number, t: any) => sum + t.amount, 0);
  const totalExpense = Math.abs(activeTransactions.filter((t: any) => t.amount < 0).reduce((sum: number, t: any) => sum + t.amount, 0));

  const globalStats = useMemo(() => {
    let totalTransactions = 0;
    let totalVolume = 0;
    let activeUsers = 0;
    let totalExpectedSalary = 0;
    
    users.forEach(u => {
      const rawSalary = localStorage.getItem(`nexora_data_${u.id}_expected_salary`);
      if (rawSalary) totalExpectedSalary += Number(rawSalary);
      
      const rawTx = localStorage.getItem(`nexora_data_${u.id}_transactions`);
      if (rawTx) {
        const txs = JSON.parse(rawTx);
        if (txs.length > 0) activeUsers++;
        totalTransactions += txs.length;
        totalVolume += txs.reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);
      }
    });
    
    return { totalTransactions, totalVolume, activeUsers, totalExpectedSalary };
  }, [users]);


  const fetchUsers = () => {
    const token = localStorage.getItem("accessToken");
    fetch("/api/auth/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.data) {
        setUsers(data.data);
      }
    })
    .catch(console.error);
  };

  const deleteUser = async () => {
    if (!activeUser || !confirm(`Are you sure you want to completely delete ${activeUser.fullName}? This cannot be undone.`)) return;
    
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`/api/auth/users/${activeUser.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert("User deleted successfully!");
        fetchUsers();
        setSelectedUser(null);
      } else {
        alert("Failed to delete user.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting user.");
    }
  };

  const downloadCSV = () => {
    if (!activeUser || activeTransactions.length === 0) return;
    
    const headers = ["ID", "Date", "Category", "Details", "Amount", "Type"];
    const rows = activeTransactions.map((t: any) => [
      t.id,
      new Date(t.date).toLocaleDateString(),
      t.category,
      (t.details || "").replace(/,/g, ""), // remove commas to prevent csv breaking
      t.amount,
      t.amount >= 0 ? "Income" : "Expense"
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions_${activeUser.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Sync selected user when logged in user is available and none is selected
  useEffect(() => {
    if (user && !selectedUser) {
      setSelectedUser(user);
    }
  }, [user]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "BWPG@ram@123") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] dark:bg-background p-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-3xl border border-[#dceae4] dark:border-border bg-white dark:bg-card p-8 shadow-xl">
          <div className="mb-6 flex justify-center text-[#1f7a63] dark:text-primary">
            <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h2 className="mb-2 text-center text-2xl font-extrabold text-[#18352f] dark:text-foreground">Admin Access</h2>
          <p className="mb-8 text-center text-sm font-semibold text-[#54746a] dark:text-muted-foreground">Restricted system management area.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passkey"
                className={`h-12 w-full rounded-xl border ${error ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100 dark:border-red-500/50 dark:bg-red-900/20" : "border-[#dceae4] dark:border-border bg-transparent focus:border-[#4eae8b] focus:ring-[#d7f1e7] dark:focus:border-primary dark:focus:ring-primary/20"} px-4 text-sm font-bold text-foreground outline-none transition focus:ring-4`}
                autoFocus
              />
              {error && <p className="mt-2 text-xs font-bold text-red-500">Invalid passkey.</p>}
            </div>
            <button type="submit" className="h-12 w-full rounded-xl bg-[#1f7a63] text-sm font-bold text-white transition hover:bg-[#196b56]">
              Unlock Admin Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] dark:bg-background p-6 md:p-12">
      <div className="mx-auto w-full space-y-8">
        
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f7a63] text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Nexora Admin Panel</h1>
              <p className="text-sm font-semibold text-muted-foreground">System management and global metrics</p>
            </div>
          </div>
          <button 
            onClick={fetchUsers}
            className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-secondary/80"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Users List */}
          <div className="w-full lg:w-1/4 shrink-0 space-y-4">
            <h2 className="text-[14px] font-extrabold text-foreground mb-4">Platform Overview</h2>
            
            <button
              onClick={() => setViewMode("global")}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl transition-all ${viewMode === "global" ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border hover:bg-secondary text-foreground"}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${viewMode === "global" ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                <Activity size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold">Global Dashboard</p>
                <p className={`truncate text-[10px] ${viewMode === "global" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>System-wide analytics</p>
              </div>
            </button>

            <h2 className="text-[14px] font-extrabold text-foreground mb-4 mt-6">Signed Up Users ({users.length})</h2>
            <div className="space-y-2">
              {users.map(u => (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUser(u); setViewMode("user"); }}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl transition-all ${viewMode === "user" && activeUser?.id === u.id ? "bg-[#1f7a63] text-white shadow-md" : "bg-card border border-border hover:bg-secondary text-foreground"}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${viewMode === "user" && activeUser?.id === u.id ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                    {u.fullName?.charAt(0) || "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-sm font-bold">{u.fullName}</p>
                    <p className={`truncate text-[10px] ${viewMode === "user" && activeUser?.id === u.id ? "text-white/80" : "text-muted-foreground"}`}>{u.email}</p>
                  </div>
                </button>
              ))}
              {users.length === 0 && (
                <div className="p-4 text-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground">
                  No users found
                </div>
              )}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 space-y-6">
        
        {viewMode === "global" ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Total Users</h2>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <UserRound size={18} />
                  </div>
                </div>
                <h3 className="text-4xl font-extrabold">{users.length}</h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">Registered on platform</p>
              </div>
              
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Active Users</h2>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Activity size={18} />
                  </div>
                </div>
                <h3 className="text-4xl font-extrabold">{globalStats.activeUsers}</h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">With 1+ transactions</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Total Transactions</h2>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                    <FileText size={18} />
                  </div>
                </div>
                <h3 className="text-4xl font-extrabold">{globalStats.totalTransactions}</h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">Processed platform-wide</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Global Volume</h2>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Zap size={18} />
                  </div>
                </div>
                <h3 className="text-4xl font-extrabold">₹{globalStats.totalVolume.toLocaleString()}</h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">Total capital tracked</p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">Global Expected Salaries</h2>
                  <p className="text-sm font-medium text-muted-foreground">Sum of all users' configured monthly deposits</p>
                </div>
              </div>
              <h3 className="text-5xl font-black tracking-tight text-foreground">
                <span className="text-muted-foreground/50 mr-2">₹</span>
                {globalStats.totalExpectedSalary.toLocaleString()}
              </h3>
            </div>
          </>
        ) : (
          <>
        {/* User Profile Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-1 overflow-hidden rounded-3xl border border-border bg-[#1f7a63] p-6 text-white shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[14px] font-extrabold">Active User Profile</h2>
              <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Online</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl font-extrabold text-primary shadow-inner">
                {activeUser?.fullName?.charAt(0) || "U"}
                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-card bg-emerald-500" />
              </div>
              <h3 className="text-xl font-extrabold text-white">{activeUser?.fullName || "User"}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <Mail size={14} /> {activeUser?.email}
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Account ID</p>
                <p className="mt-1 font-mono text-[10px] font-semibold text-white truncate">{activeUser?.id || `usr_${Math.random().toString(36).substr(2, 8)}`}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Joined</p>
                <p className="mt-1 text-xs font-semibold text-white">Aug 2026</p>
              </div>
            </div>

            <button onClick={deleteUser} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/40">
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
          
          {/* Income & Stats */}
          <div className="col-span-1 md:col-span-2 grid gap-4 grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <p className="text-xs font-bold uppercase tracking-wider">Configured Salary</p>
                <DollarSign size={18} className="text-[#1f7a63]" />
              </div>
              <h3 className="mt-4 text-3xl font-extrabold text-foreground">₹{activeExpectedSalary.toLocaleString()}</h3>
              <p className="mt-2 text-xs font-medium text-muted-foreground">Expected monthly deposit</p>
            </div>
            
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <p className="text-xs font-bold uppercase tracking-wider">Total Recorded Income</p>
                <ArrowDownRight size={18} className="text-emerald-500" />
              </div>
              <h3 className="mt-4 text-3xl font-extrabold text-foreground">₹{totalIncome.toLocaleString()}</h3>
              <p className="mt-2 text-xs font-medium text-muted-foreground">From all income transactions</p>
            </div>
            
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <p className="text-xs font-bold uppercase tracking-wider">Total Expenses</p>
                <ArrowUpRight size={18} className="text-rose-500" />
              </div>
              <h3 className="mt-4 text-3xl font-extrabold text-foreground">₹{totalExpense.toLocaleString()}</h3>
              <p className="mt-2 text-xs font-medium text-muted-foreground">Across all categories</p>
            </div>
            
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center justify-between text-muted-foreground">
                <p className="text-xs font-bold uppercase tracking-wider">Platform Usage</p>
                <Activity size={18} className="text-blue-500" />
              </div>
              <div className="mt-4 flex items-end gap-2">
                <h3 className="text-3xl font-extrabold text-foreground">{activeTransactions.length}</h3>
                <span className="mb-1 text-sm font-semibold text-muted-foreground">transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Log */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h2 className="text-[15px] font-extrabold text-foreground">Transaction Ledger</h2>
              <p className="mt-1 text-xs text-muted-foreground">Activity log for the selected user</p>
            </div>
            <div className="flex items-center gap-3">
              {activeTransactions.length > 0 && (
                <button onClick={downloadCSV} className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/20">
                  <Download size={14} /> Export CSV
                </button>
              )}
              <div className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-muted-foreground">
                {activeTransactions.length} records found
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Details</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-center">Category</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No transactions recorded for this user yet.
                    </td>
                  </tr>
                ) : (
                  activeTransactions.map((t: any) => {
                    const Icon = iconMap[t.iconName] || DollarSign;
                    const isIncome = t.amount > 0;
                    return (
                      <tr key={t.id} className="group transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-semibold text-muted-foreground">{t.id.toUpperCase().substring(0, 8)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isIncome ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                              <Icon size={14} />
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{t.name}</p>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                            {t.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">
                          {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(t.timestamp ? new Date(t.timestamp) : new Date())}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-extrabold ${isIncome ? "text-emerald-500 dark:text-emerald-400" : "text-foreground"}`}>
                            {isIncome ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
