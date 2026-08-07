import { useState } from "react";
import { X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export function AddInvestmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addInvestment } = useAppData();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("Mutual funds");
  const [returnRate, setReturnRate] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!name || !value || !returnRate) return;
    addInvestment({
      name,
      value: Number(value),
      type,
      returnRate: Number(returnRate)
    });
    setName("");
    setValue("");
    setReturnRate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15352e]/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">Add investment</h2>
            <p className="mt-1 text-xs text-[#8aa19a] dark:text-muted-foreground">Track your growing wealth.</p>
          </div>
          <button onClick={onClose} className="text-[#8da49d] dark:text-muted-foreground transition hover:opacity-70"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-3">
          <input value={name} onChange={e => setName(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Investment name (e.g. Nifty 50 ETF)" />
          <div className="grid grid-cols-2 gap-3">
            <input value={value} onChange={e => setValue(e.target.value)} type="number" className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Current value (₹)" />
            <input value={returnRate} onChange={e => setReturnRate(e.target.value)} type="number" step="0.1" className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Return Rate (%)" />
          </div>
          <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none">
            <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Mutual funds">Mutual funds</option>
            <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Fixed deposits">Fixed deposits</option>
            <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Stocks">Stocks</option>
            <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Gold & others">Gold & others</option>
          </select>
        </div>
        <button onClick={handleAdd} className="mt-5 w-full rounded-xl bg-[#1f7a63] py-3 text-sm font-bold text-white transition hover:bg-[#186350]">Save investment</button>
      </div>
    </div>
  );
}
