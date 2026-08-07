import { useState } from "react";
import { X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export function AddGoalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addGoal } = useAppData();
  const [label, setLabel] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [color, setColor] = useState("#4eb894");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!label || !targetAmount) return;
    addGoal({
      label,
      currentAmount: 0,
      targetAmount: Number(targetAmount),
      color
    });
    setLabel("");
    setTargetAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15352e]/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">Add new goal</h2>
            <p className="mt-1 text-xs text-[#8aa19a] dark:text-muted-foreground">Set a target for your dreams.</p>
          </div>
          <button onClick={onClose} className="text-[#8da49d] dark:text-muted-foreground transition hover:opacity-70"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-3">
          <input value={label} onChange={e => setLabel(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Goal name (e.g. Dream Car)" />
          <input value={targetAmount} onChange={e => setTargetAmount(e.target.value)} type="number" className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Target amount (₹)" />
          
          <div>
            <p className="mb-2 text-xs font-bold text-muted-foreground">Theme color</p>
            <div className="flex gap-2">
              {["#4eb894", "#9a88da", "#f2a083", "#5ea2e6", "#e86e6e", "#e3b854"].map(c => (
                <button key={c} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full transition-transform ${color === c ? 'scale-110 ring-2 ring-offset-2 ring-offset-background ring-primary' : 'hover:scale-110'}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleAdd} className="mt-5 w-full rounded-xl bg-[#1f7a63] py-3 text-sm font-bold text-white transition hover:bg-[#186350]">Save goal</button>
      </div>
    </div>
  );
}
