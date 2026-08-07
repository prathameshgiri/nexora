import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppData } from "../context/AppDataContext";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const { budgets, addBudget } = useAppData();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#4eb894");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    // Check if we need a context method or just use what exists.
    // Assuming addCategory exists in AppDataContext. We'll update the context too.
    if (addBudget) {
      addBudget({
        name,
        value: Number(value),
        color
      });
    }
    
    setName("");
    setValue("");
    setColor("#4eb894");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-foreground">Create budget category</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-muted-foreground">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Groceries"
              className="w-full rounded-xl border border-border bg-transparent p-3 text-sm text-foreground outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-muted-foreground">Monthly Budget (₹)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-border bg-transparent p-3 text-sm text-foreground outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-muted-foreground">Color</label>
            <div className="flex gap-3">
              {["#4eb894", "#f2a083", "#9a88da", "#78aeca", "#e58b72", "#2b9b78"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 rounded-full ${color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            Create Budget
          </button>
        </form>
      </div>
    </div>
  );
}
