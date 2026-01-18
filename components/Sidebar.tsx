import React from 'react';
import { DashboardTab } from '../types';
import { APP_NAME, BOT_INVITE_URL } from '../constants';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  guildName: string | null;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, guildName, onLogout }) => {
  const menuItems = [
    { id: DashboardTab.Overview, icon: 'fa-layer-group', label: '數據中心' },
    { id: DashboardTab.Config, icon: 'fa-gears', label: '自動化配置' },
    { id: DashboardTab.Tickets, icon: 'fa-envelope-open-text', label: '工單流量' },
    { id: DashboardTab.Analytics, icon: 'fa-chart-simple', label: '效能分析' },
    { id: DashboardTab.Settings, icon: 'fa-sliders', label: '安全中心' },
    { id: DashboardTab.Documentation, icon: 'fa-file-code', label: '開發文檔' },
  ];

  return (
    <div className="w-72 h-full bg-[#09090b] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.2)] rotate-3">
            <i className="fa-solid fa-bolt-lightning text-zinc-950 text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter uppercase leading-none">{APP_NAME}</span>
            <span className="text-[9px] font-black text-zinc-500 tracking-[0.3em] uppercase mt-1">Enterprise</span>
          </div>
        </div>
        
        <div className="mb-10">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 px-2">Current Context</p>
          {guildName ? (
            <div className="flex items-center gap-3 px-3 py-3 bg-zinc-900/50 rounded-2xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                {guildName.charAt(0)}
              </div>
              <div className="truncate text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{guildName}</div>
            </div>
          ) : (
            <a href={BOT_INVITE_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-3 py-4 border border-dashed border-zinc-800 rounded-2xl text-zinc-600 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
              <i className="fa-solid fa-plus-circle text-sm"></i>
              Deploy to Server
            </a>
          )}
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                activeTab === item.id 
                ? 'sidebar-item-active' 
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center text-base`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full py-4 text-[10px] font-black text-zinc-600 hover:text-red-400 transition-all flex items-center justify-center gap-3 border border-zinc-900 rounded-2xl hover:border-red-400/20 hover:bg-red-400/5 uppercase tracking-widest"
        >
          <i className="fa-solid fa-power-off"></i>
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;