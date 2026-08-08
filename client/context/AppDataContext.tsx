import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Home, Wallet, CreditCard, Zap, TrendingUp, UserRound, ShieldCheck, PieChart, Target, FileText } from 'lucide-react';
import { useAuth } from './AuthContext';

export type Transaction = {
  id: string;
  name: string;
  type: string;
  date: string;
  timestamp?: number;
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

export type BudgetUsage = {
  name: string;
  planned: number;
  used: number;
  remaining: number;
  color: string;
};

type AppDataContextType = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: string) => void;
  
  categories: Category[];
  
  budgets: Category[];
  addBudget: (b: Category) => void;
  removeBudget: (name: string) => void;
  budgetUsages: BudgetUsage[];
  
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id' | 'value'>) => void;
  removeGoal: (id: string) => void;
  updateGoalAmount: (id: string, amountChange: number) => void;
  
  investments: Investment[];
  addInvestment: (i: Omit<Investment, 'id'>) => void;
  
  salarySlips: SalarySlip[];
  addSalarySlip: (s: Omit<SalarySlip, 'id' | 'date' | 'verified'>) => void;
  
  cashFlow: { m: string; income: number; expense: number }[];
  financialHealthScore: number;
  
  expectedSalary: number;
  setExpectedSalary: (val: number) => void;
};

const getMonthsAgoTimestamp = (monthsAgo: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  return d.getTime();
};

const defaultTransactions: Transaction[] = [];

const defaultGoals: Goal[] = [];

const defaultInvestments: Investment[] = [];

const defaultSalarySlips: SalarySlip[] = [];

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const prefix = `nexora_data_${userId}_`;

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${prefix}transactions`);
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(`${prefix}goals`);
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem(`${prefix}investments`);
    return saved ? JSON.parse(saved) : defaultInvestments;
  });

  const [salarySlips, setSalarySlips] = useState<SalarySlip[]>(() => {
    const saved = localStorage.getItem(`${prefix}salary_slips`);
    return saved ? JSON.parse(saved) : defaultSalarySlips;
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Category[]>(() => {
    const saved = localStorage.getItem(`${prefix}budgets`);
    return saved ? JSON.parse(saved) : [];
  });

  const [expectedSalary, setExpectedSalary] = useState<number>(() => {
    const saved = localStorage.getItem(`${prefix}expected_salary`);
    return saved ? Number(saved) : 120000;
  });

  useEffect(() => {
    localStorage.setItem(`${prefix}expected_salary`, expectedSalary.toString());
  }, [expectedSalary, prefix]);

  useEffect(() => {
    localStorage.setItem(`${prefix}transactions`, JSON.stringify(transactions));
    
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

    setCategories(newCategories);
  }, [transactions, prefix]);

  useEffect(() => {
    localStorage.setItem(`${prefix}goals`, JSON.stringify(goals));
  }, [goals, prefix]);

  useEffect(() => {
    localStorage.setItem(`${prefix}investments`, JSON.stringify(investments));
  }, [investments, prefix]);

  useEffect(() => {
    localStorage.setItem(`${prefix}salary_slips`, JSON.stringify(salarySlips));
  }, [salarySlips, prefix]);

  useEffect(() => {
    localStorage.setItem(`${prefix}budgets`, JSON.stringify(budgets));
  }, [budgets, prefix]);

  // Derived Dynamic Data
  const cashFlow = useMemo(() => {
    const flow = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
       flow.push({ m: d.toLocaleString('default', { month: 'short' }), income: 0, expense: 0, year: d.getFullYear(), month: d.getMonth() });
    }
    
    transactions.forEach(t => {
       const tDate = t.timestamp ? new Date(t.timestamp) : new Date();
       const monthFlow = flow.find(f => f.month === tDate.getMonth() && f.year === tDate.getFullYear());
       if (monthFlow) {
           if (t.amount > 0) monthFlow.income += t.amount;
           else monthFlow.expense += Math.abs(t.amount);
       }
    });
    return flow;
  }, [transactions]);

  const budgetUsages = useMemo(() => {
    // Current month expenses only
    const now = new Date();
    const currentMonthTxs = transactions.filter(t => {
      const d = t.timestamp ? new Date(t.timestamp) : new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    return budgets.map(b => {
      const netUsed = currentMonthTxs.filter(t => t.category === b.name).reduce((sum, t) => sum + (-t.amount), 0);
      const used = Math.max(0, netUsed);
      return {
        name: b.name,
        planned: b.value,
        used,
        remaining: Math.max(0, b.value - used),
        color: b.color
      };
    });
  }, [budgets, transactions]);

  const financialHealthScore = useMemo(() => {
    const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    
    let score = 50; // base score
    if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
      // up to 40 points for savings rate (target 40%)
      score += Math.min(40, savingsRate);
    }
    
    // up to 10 points for goals
    const goalsAvg = goals.length > 0 ? goals.reduce((sum, g) => sum + g.value, 0) / goals.length : 0;
    score += (goalsAvg / 100) * 10;
    
    return Math.min(100, Math.max(10, Math.round(score)));
  }, [transactions, goals]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
    const newT: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      date: "Just now",
      timestamp: Date.now()
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
      budgets, addBudget, removeBudget, budgetUsages,
      goals, addGoal, removeGoal, updateGoalAmount,
      investments, addInvestment,
      salarySlips, addSalarySlip,
      cashFlow, financialHealthScore,
      expectedSalary, setExpectedSalary
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
