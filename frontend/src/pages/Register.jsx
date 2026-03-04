import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await register(name, email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-1/4 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color-secondary)]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl relative z-10 border border-white/10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-secondary)] to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-3 sm:mb-4">
            <BrainCircuit size={28} className="text-white sm:w-[32px] sm:h-[32px]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-gray-400 mt-1 text-sm">Start your personal growth</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm px-4 py-3 rounded-xl mb-5 sm:mb-6 text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-300 ml-1">Full Name</label>
            <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all"
                    placeholder="Deep N."
                />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all"
                    placeholder="deep@example.com"
                />
            </div>
          </div>

          <div className="space-y-1.5 pb-1 sm:pb-2">
            <label className="text-xs sm:text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all"
                    placeholder="••••••••"
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-blue-500 text-white font-medium py-2.5 sm:py-3 rounded-xl shadow-lg shadow-[var(--color-secondary)]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8">
          Already have an account? <Link to="/login" className="text-[var(--color-secondary)] font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
