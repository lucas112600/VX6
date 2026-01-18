import React from 'react';
import { APP_NAME } from '../constants';

interface LandingPageProps {
  onStartSetup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartSetup }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-zinc-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] -z-10"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/10 blur-[120px] rounded-full -z-10"></div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-10 py-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-shield-cat text-zinc-950 text-2xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">{APP_NAME} <span className="text-zinc-500 font-light">PRO</span></span>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {['服務方案', '技術文檔', '客戶案例'].map(item => (
            <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">{item}</a>
          ))}
          <button onClick={onStartSetup} className="px-10 py-4 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
            即刻啟動
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-10 pt-24 pb-48 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">New Engine: v4.2 Deployment Ready</span>
        </div>
        
        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-[0.85] text-gradient animate-in fade-in slide-in-from-bottom-8 duration-700">
          COMMAND <br/> THE STREAM
        </h1>
        
        <p className="max-w-3xl mx-auto text-zinc-400 text-xl font-medium leading-relaxed mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          專為領先的高效能團隊設計。將混亂的 Discord 流量轉化為清晰的業務增長指標。整合代購追蹤、工作室自動化與 AI 輔助分析。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <button onClick={onStartSetup} className="px-20 py-7 bg-white text-zinc-950 font-black rounded-[2.5rem] text-2xl uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_20px_80px_rgba(255,255,255,0.15)] flex items-center gap-4">
            部署我的機器人
            <i className="fa-solid fa-arrow-right-long text-xl"></i>
          </button>
          <button className="px-14 py-7 bg-transparent border border-white/10 text-white font-black rounded-[2.5rem] text-2xl uppercase tracking-tighter hover:bg-white/5 transition-all">
            預覽控制面板
          </button>
        </div>

        {/* Feature Grid with better Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-56">
          {[
            { title: '代購業者', icon: 'fa-box-open', color: 'from-blue-500/20', desc: '物流自動化跟蹤、訂單漏發預警。' },
            { title: '專業工作室', icon: 'fa-microchip', color: 'from-orange-500/20', desc: '任務分發調度、客服壓力分析。' },
            { title: '社群與組織', icon: 'fa-fingerprint', color: 'from-purple-500/20', desc: '全自動開單過濾、身分組權限矩陣。' }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-12 rounded-[3.5rem] text-left border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="w-16 h-16 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-2xl text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all mb-10 shadow-lg">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-5">{item.title}</h3>
              <p className="text-zinc-500 text-[13px] font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-10 py-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
        <p>© 2025 {APP_NAME} PRO DIVISION. MISSION CRITICAL PERFORMANCE.</p>
        <div className="flex gap-12 mt-8 md:mt-0">
          {['PRIVACY', 'TERMS', 'CONTACT'].map(f => (
            <a key={f} href="#" className="hover:text-white transition-colors">{f}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;