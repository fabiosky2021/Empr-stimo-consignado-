
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, Lock, Menu, UserCircle, LogOut, FileText, 
  ShieldCheck, LayoutDashboard, Sparkles, LogIn, Database, Activity, Home, Cpu
} from 'lucide-react';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import AIConsultant from './components/AIConsultant';
import FloatingAssistant from './components/FloatingAssistant';
import AISimulator from './components/AISimulator';
import { UserRole, User as UserType } from './types';
import { db } from './services/databaseService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'admin' | 'chat' | 'login'>('landing');
  const [user, setUser] = useState<UserType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // MOTOR TURBO DE LEADS - Geração a cada 7 segundos para CRM sempre cheio
  useEffect(() => {
    const interval = setInterval(async () => {
      const newLead = db.generateRandomLead();
      await db.saveLead(newLead);
    }, 7000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (role: UserRole) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === UserRole.ADMIN ? 'Diretor Master' : 'Especialista',
      role: role,
      email: `${role.toLowerCase()}@consigaleads.com.br`
    };
    setUser(newUser);
    setView('admin'); // Força a visão do CRM
    setMobileMenuOpen(false);
  };

  const logout = () => {
    setUser(null);
    setView('landing');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      {/* Navigation Elite */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || user ? 'py-2' : 'py-6'}`}>
        <div className="max-w-[1440px] mx-auto px-4">
          <div className={`px-4 md:px-10 py-3 rounded-[1.5rem] md:rounded-[2.5rem] flex justify-between items-center transition-all duration-700 ${isScrolled || user || view !== 'landing' ? 'glass-nav shadow-2xl border border-white/50' : 'bg-transparent'}`}>
            <div className="flex items-center cursor-pointer group" onClick={() => setView('landing')}>
              <div className="bg-slate-900 p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
                <FileText className="text-white w-5 h-5" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-lg md:text-xl font-black text-slate-900 leading-none tracking-tighter uppercase">Consiga<span className="text-blue-600 italic">Leads</span></span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Alpha Enterprise 2026</span>
              </div>
            </div>

            {/* Nav Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {user ? (
                <>
                  <button onClick={() => setView('admin')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'admin' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'}`}>Painel CRM</button>
                  <button onClick={() => setView('chat')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'chat' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'}`}>Estúdio Alpha</button>
                  <button onClick={logout} className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"><LogOut className="w-5 h-5" /></button>
                </>
              ) : (
                <>
                  <button onClick={() => setView('login')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 px-6 py-2 underline decoration-blue-500/30">Acesso Restrito</button>
                  <button onClick={() => setView('login')} className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Entrar no CRM</button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
               {user && (
                 <button onClick={() => setView(view === 'admin' ? 'chat' : 'admin')} className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
                   {view === 'admin' ? <Cpu className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
                 </button>
               )}
               <button onClick={() => setMobileMenuOpen(true)} className="p-3 bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-100">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[200] bg-white/98 backdrop-blur-2xl pt-24 px-8 animate-in slide-in-from-right duration-300">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-slate-100 rounded-2xl"><X className="w-8 h-8" /></button>
            <div className="space-y-4">
              {user ? (
                <>
                  <button onClick={() => {setView('admin'); setMobileMenuOpen(false);}} className={`w-full py-6 flex items-center gap-4 px-8 rounded-[2rem] font-black uppercase text-xs tracking-widest ${view === 'admin' ? 'bg-slate-900 text-white shadow-2xl' : 'bg-slate-50'}`}>
                    <LayoutDashboard className="w-5 h-5" /> Painel CRM
                  </button>
                  <button onClick={() => {setView('chat'); setMobileMenuOpen(false);}} className={`w-full py-6 flex items-center gap-4 px-8 rounded-[2rem] font-black uppercase text-xs tracking-widest ${view === 'chat' ? 'bg-blue-600 text-white shadow-2xl' : 'bg-slate-50'}`}>
                    <Cpu className="w-5 h-5" /> Estúdio Alpha
                  </button>
                  <button onClick={logout} className="w-full py-6 flex items-center gap-4 px-8 rounded-[2rem] border-2 border-slate-100 text-red-500 font-black uppercase text-xs tracking-widest">
                    <LogOut className="w-5 h-5" /> Encerrar Sessão
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => {setView('login'); setMobileMenuOpen(false);}} className="w-full py-8 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl">
                    Entrar no Sistema
                  </button>
                  <button onClick={() => {setView('landing'); setMobileMenuOpen(false);}} className="w-full py-6 text-slate-400 font-black uppercase text-[10px] tracking-widest text-center">Página Inicial</button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {view === 'login' && (
          <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <div className="max-w-[440px] w-full bg-white rounded-[4rem] shadow-2xl p-12 border border-slate-100">
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="bg-slate-900 p-6 rounded-3xl mb-6 shadow-xl"><Lock className="text-white w-8 h-8" /></div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Portal Admin</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Segurança Bancária Alpha</p>
              </div>
              <div className="space-y-4">
                <button onClick={() => handleLogin(UserRole.ADMIN)} className="w-full py-8 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95">Administrador Master</button>
                <button onClick={() => handleLogin(UserRole.PROFESSIONAL)} className="w-full py-6 bg-white border-2 border-slate-100 text-slate-500 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] active:scale-95">Consultor Regional</button>
              </div>
            </div>
          </div>
        )}

        {(view === 'admin' && user) && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 pt-24 md:pt-32 pb-20">
            <Dashboard user={user} />
          </div>
        )}

        {(view === 'chat' && user) && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 pt-24 md:pt-32 pb-8 flex flex-col relative z-50">
            <AIConsultant onBack={() => setView('admin')} />
          </div>
        )}

        {view === 'landing' && (
          <div className="space-y-20 pt-16 md:pt-32 pb-32">
            <Hero />
            <div className="max-w-4xl mx-auto px-6">
              <LeadForm />
            </div>
            <div className="max-w-[1440px] mx-auto px-6">
              <AISimulator />
            </div>
          </div>
        )}
      </main>
      
      {view === 'landing' && <FloatingAssistant />}
    </div>
  );
};

export default App;
