import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, CircleDollarSign, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [isSignup]);

  const toggleMode = () => {
    setSearchParams(isSignup ? {} : { mode: "signup" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login";
      const body = isSignup 
        ? { email, password, fullName, mobile }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.message || "Authentication failed");
      }

      await login(data.data.accessToken, data.data.refreshToken);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#173e34] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-36 -top-24 h-[480px] w-[480px] rounded-full border border-white/10" />
        <div className="absolute -bottom-48 -left-20 h-[500px] w-[500px] rounded-full border border-white/10" />
        
        <Link to="/" className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#51b994]">
            <CircleDollarSign size={21} strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-extrabold">Nexora<span className="text-[#6bd2aa]">.</span></span>
        </Link>
        
        <div className="relative max-w-lg">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2d6655]">
            <Sparkles size={21} strokeWidth={2.5} className="text-[#72d1ae]" />
          </div>
          <h1 className="text-[46px] font-extrabold leading-[1.07] tracking-[-0.06em]">
            Make every rupee<br /><span className="text-[#6fd2ae]">count for more.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#b4d1c8]">
            One calm, intelligent place to understand your money, build better habits, and move closer to the life you want.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Smart insights", "Private by design", "Built for clarity"].map(t => (
              <span key={t} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-[#c3ded4]">
                <Check size={13} strokeWidth={2.5} className="text-[#67cfa8]" />{t}
              </span>
            ))}
          </div>
        </div>
        <p className="relative text-[11px] text-[#83aa9e]">© {new Date().getFullYear()} Nexora Finance · Your money, your momentum.</p>
      </section>
      
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[390px]">
          <Link to="/" className="mb-12 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f7a63] text-white">
              <CircleDollarSign size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-extrabold tracking-tight text-[#18352f]">Nexora<span className="text-[#1f9b78]">.</span></span>
          </Link>
          
          <div className="mb-9">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#55a78b]">
              {isSignup ? "Create account" : "Welcome back"}
            </p>
            <h2 className="text-[30px] font-extrabold tracking-[-0.05em] text-[#18352f]">
              {isSignup ? "Start your journey" : "Sign in to your space"}
            </h2>
            <p className="mt-2 text-sm text-[#829891]">
              {isSignup ? "Take control of your finances today." : "Pick up where you left off with your finances."}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#fff0ed] p-4 text-sm font-semibold text-[#c84831]">
              <AlertCircle size={18} strokeWidth={2.5} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold text-[#54746a]">Full Name</span>
                  <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="h-12 w-full rounded-xl border border-[#dceae4] bg-white px-4 text-sm text-[#31574b] outline-none transition focus:border-[#4eae8b] focus:ring-4 focus:ring-[#d7f1e7]" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold text-[#54746a]">Mobile Number</span>
                  <input required type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="9876543210" className="h-12 w-full rounded-xl border border-[#dceae4] bg-white px-4 text-sm text-[#31574b] outline-none transition focus:border-[#4eae8b] focus:ring-4 focus:ring-[#d7f1e7]" />
                </label>
              </>
            )}

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold text-[#54746a]">Email address</span>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-[#dceae4] bg-white px-4 text-sm text-[#31574b] outline-none transition focus:border-[#4eae8b] focus:ring-4 focus:ring-[#d7f1e7]" />
            </label>
            
            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#54746a]">Password</span>
                {!isSignup && <button type="button" className="text-[11px] font-bold text-[#299376]">Forgot password?</button>}
              </div>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-12 w-full rounded-xl border border-[#dceae4] bg-white px-4 pr-11 text-sm text-[#31574b] outline-none transition focus:border-[#4eae8b] focus:ring-4 focus:ring-[#d7f1e7]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#91aaa1]">
                  {showPassword ? <EyeOff size={17} strokeWidth={2.5} /> : <Eye size={17} strokeWidth={2.5} />}
                </button>
              </div>
            </label>
            
            {!isSignup && (
              <label className="flex items-center gap-2 text-[11px] font-semibold text-[#779188]">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c8ddd4] accent-[#278c70]" />
                Remember me on this device
              </label>
            )}

            <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1f7a63] text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#196b56] disabled:opacity-70 disabled:hover:translate-y-0">
              {loading ? "Please wait..." : isSignup ? "Create account" : "Continue to Nexora"} <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </form>
          
          <div className="my-8 flex items-center gap-3 text-[10px] font-semibold text-[#a1b3ad]">
            <div className="h-px flex-1 bg-[#e5efeb]" />SECURE ACCESS<div className="h-px flex-1 bg-[#e5efeb]" />
          </div>
          
          <div className="flex items-center gap-2 rounded-xl bg-[#f0f8f4] p-3 text-[11px] text-[#6c8c81]">
            <ShieldCheck size={17} strokeWidth={2.5} className="text-[#35a27f]" />
            Your data is encrypted and never shared with third parties.
          </div>
          
          <p className="mt-8 text-center text-xs text-[#81978f]">
            {isSignup ? "Already have an account?" : "New to Nexora?"} {" "}
            <button onClick={toggleMode} className="font-bold text-[#299376]">
              {isSignup ? "Sign in instead" : "Create an account"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
