
import React from 'react';

const Documentation: React.FC = () => {
  const commands = [
    { cmd: '/ticket setup', desc: '在指定頻道建立精美的開單控制面板（按鈕 + 類別選單）。', group: '核心開單' },
    { cmd: '/ticket close', desc: '結束當前對話，自動產生對話紀錄存檔並移除該頻道。', group: '核心開單' },
    { cmd: '/ticket transfer', desc: '將工單轉接給其他特定客服人員或客服身分組。', group: '核心開單' },
    { cmd: '/ticket rename', desc: '手動修改工單頻道名稱（預設為單號）。', group: '進階管理' },
    { cmd: '/admin warn', desc: '對不當行為使用者發出警告並記錄於資料庫。', group: '進階管理' },
    { cmd: '/admin stats', desc: '查看今日開單總量、平均處理時間與客服排名。', group: '進階管理' },
    { cmd: '/admin clear', desc: '批次清理頻道中的訊息，保持客服空間整潔。', group: '進階管理' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // 使用更精緻的 UI 通知或單純 alert
    console.log(`Copied: ${text}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-24 h-24 bg-white text-zinc-950 rounded-3xl flex items-center justify-center text-4xl shrink-0 rotate-3 shadow-2xl">
            <i className="fa-solid fa-terminal"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-3">Discord 指令全手冊</h2>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-2xl">
              VX6 全面支援 Discord 斜線指令 (Slash Commands)。<br/>
              建議在機器人加入後先執行 <span className="text-white font-mono">/ticket setup</span> 進行面板初始化。
              所有管理指令皆內建權限驗證，僅限設定之身分組執行。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {['核心開單', '進階管理'].map(group => (group === '核心開單' || group === '進階管理') && (
          <div key={group} className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-[2rem] backdrop-blur-sm">
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-zinc-700 rounded-full"></span>
              {group}
            </h3>
            <div className="space-y-8">
              {commands.filter(c => c.group === group).map((c, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white bg-zinc-800 px-4 py-1.5 rounded-xl border border-zinc-700/50 group-hover:border-white/30 transition-all flex items-center gap-3 shadow-inner">
                      <span className="text-zinc-500">$</span>
                      {c.cmd}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(c.cmd)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-zinc-800 transition-all"
                      title="點擊複製"
                    >
                      <i className="fa-regular fa-copy text-xs"></i>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed pl-1 uppercase tracking-tight">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">需要量身訂製的功能？</h3>
          <p className="text-zinc-500 text-sm font-medium">針對專業工作室，我們提供客製化私有機器人服務。</p>
        </div>
        <button className="px-12 py-5 bg-white text-zinc-950 font-black rounded-2xl uppercase tracking-tighter text-sm hover:scale-105 transition-all active:scale-95 shadow-2xl">
          聯繫官方支援
        </button>
      </div>
    </div>
  );
};

export default Documentation;
