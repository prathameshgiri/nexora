import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

export function AddSalarySlipModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addSalarySlip } = useAppData();
  const [month, setMonth] = useState("August 2024");
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!month || !file) return;
    addSalarySlip({
      name: `Salary slip · ${month}`,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    });
    setMonth("");
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15352e]/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">Upload salary slip</h2>
            <p className="mt-1 text-xs text-[#8aa19a] dark:text-muted-foreground">Keep your income records secure.</p>
          </div>
          <button onClick={onClose} className="text-[#8da49d] dark:text-muted-foreground transition hover:opacity-70"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-4">
          <input value={month} onChange={e => setMonth(e.target.value)} className="rounded-xl border border-[#dfece6] dark:border-border bg-transparent px-3 py-3 text-sm text-foreground outline-none focus:border-[#5bb795] dark:focus:border-primary" placeholder="Month & Year (e.g. August 2024)" />
          
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#dfece6] dark:border-border bg-[#f8fbf9] dark:bg-secondary/50 py-8 transition hover:bg-[#edf5f1] dark:hover:bg-secondary">
            <UploadCloud size={32} className="text-[#2b9b78]" />
            <p className="mt-3 text-sm font-bold text-foreground">Click to upload PDF</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{file ? file.name : "Max file size: 5MB"}</p>
            <input type="file" className="hidden" accept=".pdf,.jpeg,.png" onChange={e => e.target.files && setFile(e.target.files[0])} />
          </label>
        </div>
        <button onClick={handleAdd} className="mt-5 w-full rounded-xl bg-[#1f7a63] py-3 text-sm font-bold text-white transition hover:bg-[#186350]">Upload document</button>
      </div>
    </div>
  );
}
