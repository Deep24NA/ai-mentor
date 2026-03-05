import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, Save, Zap, Bell, Shield, Moon } from 'lucide-react';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Dummy state for preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    
    // Validate email basic
    if (!email.includes('@')) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    const result = await updateProfile(name, email, password || undefined);
    
    if (result.success) {
      setMessage(result.message);
      setPassword(''); // Clear password field after successful update
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 pb-6">
      <div className="flex flex-col mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your account profile and preferences.</p>
      </div>

      {(message || error) && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-xl border ${message ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
        >
          {message || error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <User size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Profile Information</h3>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                            placeholder="user@example.com"
                        />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6 !mb-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Security</h3>
                      <p className="text-xs text-slate-400">Update your password to keep your account secure.</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-w-md">
                    <label className="text-sm font-medium text-slate-300 ml-1">New Password (Optional)</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                            placeholder="Leave blank to keep same"
                        />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium py-2 px-6 rounded-xl shadow-lg shadow-[var(--color-primary)]/20 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                  </button>
                </div>
              </form>
            </motion.div>
        </div>

        {/* Right Column - Preferences */}
        <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Preferences</h3>
              </div>

              <div className="space-y-5">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Moon size={14} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Dark Mode</p>
                      <p className="text-xs text-slate-500">Premium dark UI</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-[var(--color-primary)]' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Bell size={14} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Notifications</p>
                      <p className="text-xs text-slate-500">App updates & alerts</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${notificationsEnabled ? 'bg-[var(--color-primary)]' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Shield size={14} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Data Privacy</p>
                      <p className="text-xs text-slate-500">Share analytics</p>
                    </div>
                  </div>
                  <button 
                    className="w-11 h-6 rounded-full bg-[var(--color-primary)] relative opacity-50 cursor-not-allowed"
                    title="Setting locked by administrator"
                  >
                    <div className="w-4 h-4 rounded-full bg-white absolute top-1 translate-x-6"></div>
                  </button>
                </div>
              </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
}
