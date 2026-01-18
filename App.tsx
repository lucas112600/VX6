import React, { useState, useEffect } from 'react';
import { DashboardTab, User, Guild } from './types';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import TicketManagement from './components/TicketManagement';
import Documentation from './components/Documentation';
import GuildSelector from './components/GuildSelector';
import InitialSetup from './components/InitialSetup';
import ServerSettings from './components/ServerSettings';
import SetupWizard from './components/SetupWizard';
import LandingPage from './components/LandingPage';
import { APP_NAME, DISCORD_LOGIN_URL } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.Overview);
  const [user, setUser] = useState<User | null>(null);
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const [availableGuilds, setAvailableGuilds] = useState<Guild[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState('');
  const [showIndustrySelect, setShowIndustrySelect] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('vx6_user');
    const savedGuilds = localStorage.getItem('vx6_guilds');
    const industry = localStorage.getItem('vx6_industry');

    if (savedUser && savedGuilds && industry) {
      setUser(JSON.parse(savedUser));
      setAvailableGuilds(JSON.parse(savedGuilds));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleDiscordCallback(code);
    }
  }, []);

  const handleDiscordCallback = async (code: string) => {
    setIsLoading(true);
    setLoginStep('正在建立加密隧道...');

    try {
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      // 檢查 Content-Type 確保後端沒傳回 HTML (404)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`伺服器錯誤 (HTTP ${response.status}): 預期 JSON 但接收到 HTML。請確認後端 server.js 路由配置。`);
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '認證失敗');

      setUser(data.user);
      setAvailableGuilds(data.guilds);

      localStorage.setItem('vx6_user', JSON.stringify(data.user));
      localStorage.setItem('vx6_guilds', JSON.stringify(data.guilds));
      
      setLoginStep('認證成功！');
      window.history.replaceState({}, document.title, "/");
      setTimeout(() => setIsLoading(false), 800);

    } catch (error: any) {
      console.error('Auth Error:', error);
      alert(`登入攔截: ${error.message}`);
      setIsLoading(false);
      window.history.replaceState({}, document.title, "/");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedGuild(null);
    setAvailableGuilds([]);
    localStorage.removeItem('vx6_user');
    localStorage.removeItem('vx6_guilds');
    window.location.href = "/";
  };

  const hasIndustrySelected = !!localStorage.getItem('vx6_industry');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-6">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          {loginStep || '正在驗證身分...'}
        </p>
      </div>
    );
  }

  if (user && !selectedGuild) {
    return <GuildSelector guilds={availableGuilds} onSelect={setSelectedGuild} onLogout={handleLogout} />;
  }

  if (!user && !showIndustrySelect) {
    return <LandingPage onStartSetup={() => setShowIndustrySelect(true)} />;
  }

  if (!hasIndustrySelected && showIndustrySelect) {
    return (
      <SetupWizard 
        onComplete={() => {
          window.location.href = DISCORD_LOGIN_URL;
        }} 
        onBack={() => setShowIndustrySelect(false)} 
      />
    );
  }
  
  if (!user && hasIndustrySelected) {
    return <LandingPage onStartSetup={() => window.location.href = DISCORD_LOGIN_URL} />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-white selection:text-zinc-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} guildName={selectedGuild?.name || null} onLogout={handleLogout} />
      <main className="flex-1 ml-72 p-12 min-h-screen overflow-y-auto">
        <header className="flex items-center justify-between mb-16">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase">{activeTab}</h1>
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
               <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{selectedGuild?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <button onClick={() => setSelectedGuild(null)} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all">切換伺服器</button>
             <div className="h-10 w-px bg-zinc-800 mx-2"></div>
             <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black uppercase tracking-tight">{user?.username}</p>
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">系統管理者</p>
                </div>
                <img className="w-12 h-12 rounded-2xl ring-2 ring-zinc-800 shadow-xl" src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : `https://ui-avatars.com/api/?name=${user?.username}`} alt="" />
             </div>
          </div>
        </header>
        
        <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          {activeTab === DashboardTab.Overview && <Overview />}
          {activeTab === DashboardTab.Tickets && <TicketManagement />}
          {activeTab === DashboardTab.Config && <InitialSetup />}
          {activeTab === DashboardTab.Documentation && <Documentation />}
          {activeTab === DashboardTab.Settings && <ServerSettings />}
        </div>
      </main>
    </div>
  );
};

export default App;