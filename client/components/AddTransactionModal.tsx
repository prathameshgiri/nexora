import { useState } from "react";
import { X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export function AddTransactionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addTransaction } = useAppData();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food & dining");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!name || !amount) return;
    addTransaction({
      name,
      amount: type === "Expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      type: type === "Expense" ? category : "Income",
      category: type === "Expense" ? category : "Income",
      iconName: type === "Expense" ? "CreditCard" : "Wallet"
    });
    setName("");
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15352e]/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">Add transaction</h2>
            <p className="mt-1 text-xs text-[#8aa19a] dark:text-muted-foreground">Keep your financial picture up to date.</p>
          </div>
          <button onClick={onClose} className="text-[#8da49d] dark:text-muted-foreground transition hover:opacity-70"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-3">
          <input value={name} onChange={e => setName(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="What was this for? (e.g. Netflix)" />
          <div className="grid grid-cols-2 gap-3">
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Amount (₹)" />
            <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary">
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Expense">Expense</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Income">Income</option>
            </select>
          </div>
          {type === "Expense" && (
            <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary">
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Housing">Housing</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Food & dining">Food & dining</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Transport">Transport</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Lifestyle">Lifestyle</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Entertainment">Entertainment</option>
              <option className="bg-white dark:bg-[#0c1a17] text-foreground" value="Health">Health</option>
            </select>
          )}
        </div>
        <button onClick={handleAdd} className="mt-5 w-full rounded-xl bg-[#1f7a63] py-3 text-sm font-bold text-white transition hover:bg-[#186350]">Save transaction</button>
      </div>
    </div>
  );
}
