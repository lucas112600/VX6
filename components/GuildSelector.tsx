
import React, { useState } from 'react';
import { Guild } from '../types';
import { APP_NAME } from '../constants';

interface GuildSelectorProps {
  guilds: Guild[];
  onSelect: (guild: Guild) => void;
  onLogout: () => void;
}

const GuildSelector: React.FC<GuildSelectorProps> = ({ guilds, onSelect, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuilds = guilds.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-20 px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="w-full max-w-4xl z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl rotate-3">
              <i className="fa-solid fa-ticket text-zinc-950 text-3xl"></i>
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">{APP_NAME}</h1>
          <p className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-xs">選擇您要管理的伺服器</p>
        </div>

        <div className="relative max-w-md mx-auto">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"></i>
          <input 
            type="text" 
            placeholder="搜尋伺服器..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuilds.length > 0 ? (
            filteredGuilds.map((guild) => (
              <button
                key={guild.id}
                onClick={() => onSelect(guild)}
                className="group p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-white/20 transition-all text-left flex flex-col items-center sm:items-start gap-4 active:scale-95"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl font-black text-zinc-500 group-hover:bg-white group-hover:text-zinc-950 transition-all overflow-hidden shadow-inner">
                  {guild.icon ? (
                    <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt="" className="w-full h-full object-cover" />
                  ) : (
                    guild.name.charAt(0)
                  )}
                </div>
                <div className="text-center sm:text-left w-full">
                  <h3 className="font-bold text-white truncate">{guild.name}</h3>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">
                    {guild.owner ? '伺服器擁有者' : '管理員權限'}
                  </p>
                </div>
                <div className="w-full pt-4 mt-auto">
                  <div className="w-full py-2 bg-zinc-800 group-hover:bg-white group-hover:text-zinc-950 text-white text-[10px] font-black uppercase tracking-widest rounded-lg text-center transition-all">
                    管理伺服器
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <i className="fa-solid fa-ghost text-4xl text-zinc-800"></i>
              <p className="text-zinc-500 font-medium">找不到符合的伺服器</p>
            </div>
          )}
        </div>

        <div className="pt-12 text-center">
          <button 
            onClick={onLogout}
            className="text-zinc-600 hover:text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fa-solid fa-arrow-left"></i>
            返回登入頁面
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuildSelector;
