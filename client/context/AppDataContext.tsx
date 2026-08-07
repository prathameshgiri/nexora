import React, { createContext, useContext, useState, useEffect } from 'react';
import { Home, Wallet, CreditCard, Zap, TrendingUp, UserRound, ShieldCheck, PieChart, Target, FileText } from 'lucide-react';

export type Transaction = {
  id: string;
  name: string;
  type: string;
  date: string;
  amount: number;
  category: string;
  iconName: string;
};

export type Category = {
  name: string;
  value: number;
  color: string;
};

export type Goal = {
  id: string;
  label: string;
  value: number; // percentage
  currentAmount: number;
  targetAmount: number;
  color: string;
};

export type Investment = {
  id: string;
  name: string;
  value: number;
  type: string;
  returnRate: number;
};

export type SalarySlip = {
  id: string;
  name: string;
  date: string;
  size: string;
  verified: boolean;
};

type AppDataContextType = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: string) => void;
  
  categories: Category[];
  
  budgets: Category[];
  addBudget: (b: Category) => void;
  removeBudget: (name: string) => void;
  
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id' | 'value'>) => void;
  removeGoal: (id: string) => void;
  updateGoalAmount: (id: string, amountChange: number) => void;
  
  investments: Investment[];
  addInvestment: (i: Omit<Investment, 'id'>) => void;
  
  salarySlips: SalarySlip[];
  addSalarySlip: (s: Omit<SalarySlip, 'id' | 'date' | 'verified'>) => void;
  
  cashFlow: { m: string; income: number; expense: number }[];
};

const defaultCashFlow = [
  { m: "Jan", income: 72000, expense: 45000 },
  { m: "Feb", income: 78000, expense: 50000 },
  { m: "Mar", income: 74000, expense: 44000 },
  { m: "Apr", income: 83000, expense: 55000 },
  { m: "May", income: 88000, expense: 48000 },
  { m: "Jun", income: 91000, expense: 52000 },
  { m: "Jul", income: 104500, expense: 57840 }
];

const defaultTransactions: Transaction[] = [
  { id: "1", name: "Apartment rent", type: "Housing", date: "Today, 9:42 AM", amount: -18500, category: "Housing", iconName: "Home" },
  { id: "2", name: "Salary credited", type: "Income", date: "Jul 01, 2024", amount: 92000, category: "Income", iconName: "Wallet" },
  { id: "3", name: "Netflix subscription", type: "Entertainment", date: "Jun 30, 2024", amount: -649, category: "Entertainment", iconName: "CreditCard" },
  { id: "4", name: "Freelance project", type: "Additional income", date: "Jun 28, 2024", amount: 12500, category: "Income", iconName: "Zap" }
];

const defaultGoals: Goal[] = [
  { id: "1", label: "Emergency fund", value: 68, currentAmount: 204000, targetAmount: 300000, color: "#4eb894" },
  { id: "2", label: "MacBook Pro", value: 42, currentAmount: 67200, targetAmount: 160000, color: "#9a88da" },
  { id: "3", label: "Goa trip", value: 26, currentAmount: 13000, targetAmount: 50000, color: "#f2a083" }
];

const defaultInvestments: Investment[] = [
  { id: "1", name: "SBI Bluechip Fund", value: 182000, type: "Mutual funds", returnRate: 18.2 },
  { id: "2", name: "HDFC Fixed Deposit", value: 135000, type: "Fixed deposits", returnRate: 7.1 },
  { id: "3", name: "Nifty 50 ETF", value: 86500, type: "Stocks", returnRate: 12.6 },
  { id: "4", name: "Digital Gold", value: 79150, type: "Gold & others", returnRate: 9.4 }
];

const defaultSalarySlips: SalarySlip[] = [
  { id: "1", name: "Salary slip · July 2024", date: "2 days ago", size: "1.2 MB", verified: true },
  { id: "2", name: "Salary slip · June 2024", date: "32 days ago", size: "1.1 MB", verified: true },
  { id: "3", name: "Salary slip · May 2024", date: "63 days ago", size: "1.3 MB", verified: true }
];

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nexora_transactions');
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('nexora_goals');
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('nexora_investments');
    return saved ? JSON.parse(saved) : defaultInvestments;
  });

  const [salarySlips, setSalarySlips] = useState<SalarySlip[]>(() => {
    const saved = localStorage.getItem('nexora_salary_slips');
    return saved ? JSON.parse(saved) : defaultSalarySlips;
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    localStorage.setItem('nexora_transactions', JSON.stringify(transactions));
    
    const expenseTxs = transactions.filter(t => t.amount < 0);
    const catMap: Record<string, number> = {};
    expenseTxs.forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + Math.abs(t.amount);
    });

    const colors = ["#4eb894", "#f2a083", "#9a88da", "#78aeca", "#e58b72"];
    const newCategories = Object.entries(catMap)
      .map(([name, value], i) => ({
        name,
        value,
        color: colors[i % colors.length]
      }))
      .sort((a, b) => b.value - a.value);

    setCategories(newCategories.length > 0 ? newCategories : [
      { name: "Housing", value: 18500, color: "#4eb894" },
      { name: "Food & dining", value: 8500, color: "#f2a083" }
    ]);

  }, [transactions]);

  const [budgets, setBudgets] = useState<Category[]>(() => {
    const saved = localStorage.getItem('nexora_budgets');
    return saved ? JSON.parse(saved) : [
      { name: "Needs", value: 36438, color: "#4eb894" },
      { name: "Wants", value: 16195, color: "#f2a083" },
      { name: "Savings", value: 47160, color: "#9a88da" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexora_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('nexora_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('nexora_investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('nexora_salary_slips', JSON.stringify(salarySlips));
  }, [salarySlips]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
    const newT: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      date: "Just now"
    };
    setTransactions(prev => [newT, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (g: Omit<Goal, 'id' | 'value'>) => {
    const newG: Goal = {
      ...g,
      id: Math.random().toString(36).substr(2, 9),
      value: Math.round((g.currentAmount / g.targetAmount) * 100)
    };
    setGoals(prev => [...prev, newG]);
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const updateGoalAmount = (id: string, amountChange: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== id) return g;
      const newAmount = Math.max(0, g.currentAmount + amountChange);
      return {
        ...g,
        currentAmount: newAmount,
        value: Math.round((newAmount / g.targetAmount) * 100)
      };
    }));
  };

  const addBudget = (b: Category) => {
    setBudgets(prev => [...prev, b]);
  };
  
  const removeBudget = (name: string) => {
    setBudgets(prev => prev.filter(b => b.name !== name));
  };

  const addInvestment = (i: Omit<Investment, 'id'>) => {
    const newI: Investment = {
      ...i,
      id: Math.random().toString(36).substr(2, 9)
    };
    setInvestments(prev => [newI, ...prev]);
  };

  const addSalarySlip = (s: Omit<SalarySlip, 'id' | 'date' | 'verified'>) => {
    const newS: SalarySlip = {
      ...s,
      id: Math.random().toString(36).substr(2, 9),
      date: "Just now",
      verified: false
    };
    setSalarySlips(prev => [newS, ...prev]);
  };

  return (
    <AppDataContext.Provider value={{
      transactions, addTransaction, removeTransaction,
      categories,
      budgets, addBudget, removeBudget,
      goals, addGoal, removeGoal, updateGoalAmount,
      investments, addInvestment,
      salarySlips, addSalarySlip,
      cashFlow: defaultCashFlow
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
