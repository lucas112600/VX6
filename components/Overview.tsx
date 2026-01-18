import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { getBotConfig } from '../constants';

const Overview: React.FC = () => {
  const config = getBotConfig();
  const industry = config?.industry || 'studio';
  const [liveStats, setLiveStats] = useState<any[]>([]);

  // 僅保留指標結構，數值全部歸零
  useEffect(() => {
    const statsConfig = {
      proxy: [
        { label: '月度營業額', value: '$0', icon: 'fa-coins', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '待處理包裹', value: '0', icon: 'fa-truck-fast', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '回頭客比率', value: '0%', icon: 'fa-user-check', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '平均單價', value: '$0', icon: 'fa-tags', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
      ],
      studio: [
        { label: '累積接單', value: '0', icon: 'fa-terminal', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '當前隊列', value: '0', icon: 'fa-list-check', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '結單速率', value: '---', icon: 'fa-gauge-high', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '客戶評分', value: 'N/A', icon: 'fa-star', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
      ],
      community: [
        { label: '認證成員', value: '0', icon: 'fa-id-badge', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '今日開單', value: '0', icon: 'fa-ticket-simple', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '舉報案件', value: '0', icon: 'fa-shield-virus', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '互動熱度', value: 'Low', icon: 'fa-fire-flame-curved', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
      ],
      club: [
        { label: '社員總數', value: '0', icon: 'fa-graduation-cap', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '專案數量', value: '0', icon: 'fa-diagram-project', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '預算剩餘', value: '$0', icon: 'fa-wallet', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
        { label: '公告觸及', value: '0', icon: 'fa-broadcast-tower', color: 'text-zinc-500', glow: 'shadow-zinc-500/5' },
      ]
    };
    setLiveStats(statsConfig[industry as keyof typeof statsConfig] || statsConfig.studio);
  }, [industry]);

  // 空數據佔位
  const chartData = [
    { name: '01', value: 0 }, { name: '05', value: 0 }, { name: '10', value: 0 },
    { name: '15', value: 0 }, { name: '20', value: 0 }, { name: '25', value: 0 },
    { name: '30', value: 0 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveStats.map((stat, i) => (
          <div key={i} className={`glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden glow-hover ${stat.glow}`}>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <span className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
              <div className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fa-solid ${stat.icon} text-lg`}></i>
              </div>
            </div>
            <div className="text-5xl font-black tracking-tighter mb-3 relative z-10 text-zinc-700">{stat.value}</div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-800 relative z-10">
              等待伺服器同步數據...
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-12 rounded-[3.5rem] border border-white/5 relative">
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
             <div className="text-center">
                <i className="fa-solid fa-chart-line text-zinc-800 text-4xl mb-4"></i>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">尚未產生流量數據</p>
             </div>
          </div>
          <div className="flex items-center justify-between mb-12 opacity-30">
            <div>
               <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">營運時序拓樸</h3>
               <p className="text-[10px] text-zinc-600 font-bold uppercase mt-2">Real-time throughput via WebSocket</p>
            </div>
            <div className="flex gap-2">
               {['D', 'W', 'M'].map(t => (
                 <button key={t} disabled className="w-8 h-8 rounded-lg text-[10px] font-black text-zinc-600">{t}</button>
               ))}
            </div>
          </div>
          <div className="h-[350px] w-full opacity-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="name" hide />
                <Area type="monotone" dataKey="value" stroke="#27272a" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-12 rounded-[3.5rem] border border-white/5 flex flex-col">
          <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-12 text-center">Engine Status</h3>
          <div className="flex-1 flex flex-col justify-center space-y-10">
            <div className="text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
                <i className="fa-solid fa-server text-3xl text-zinc-800 relative z-10"></i>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">Standby</p>
              <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-tight">等待連線...</p>
            </div>
            
            <div className="space-y-4 opacity-20">
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="w-[0%] h-full bg-white"></div>
              </div>
              <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                <span>CPU Load</span>
                <span>0.0%</span>
              </div>
            </div>
          </div>
          <button disabled className="w-full py-4 mt-12 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-700 cursor-not-allowed">
            無可用日誌
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;