
import React, { useState } from 'react';

const ServerSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ 伺服器設定已儲存！');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center text-3xl shadow-2xl border border-zinc-700">
            <i className="fa-solid fa-sliders text-white"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">伺服器進階設定</h2>
            <p className="text-zinc-500 text-sm font-medium max-w-xl">
              在此配置您的伺服器專屬設定。包含日誌頻道、權限角色以及自動化腳本，確保您的客服系統運作如常。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logging Section */}
        <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <i className="fa-solid fa-file-lines text-xs"></i>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-300">日誌紀錄 (Logging)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">工單日誌頻道 ID</label>
              <input type="text" placeholder="1234567890..." className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm font-mono" />
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tight px-1">所有工單的開啟、關閉與重要操作將會傳送至此頻道。</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">存檔紀錄頻道 ID</label>
              <input type="text" placeholder="1234567890..." className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm font-mono" />
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tight px-1">結單後的 HTML 聊天紀錄將會備份至此。</p>
            </div>
          </div>
        </section>

        {/* Permissions Section */}
        <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <i className="fa-solid fa-shield-halved text-xs"></i>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-300">權限管理 (Permissions)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">管理者身分組 ID</label>
              <input type="text" placeholder="1234567890..." className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm font-mono" />
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tight px-1">擁有後台完整修改權限與指令執行權限的身分組。</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">一般客服身分組 ID</label>
              <input type="text" placeholder="1234567890..." className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm font-mono" />
              <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tight px-1">僅能查看與處理工單的基本客服人員身分組。</p>
            </div>
          </div>
        </section>

        {/* Automation Section */}
        <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <i className="fa-solid fa-robot text-xs"></i>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-300">進階自動化 (Automation)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tight">自動結單功能</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">超過 24 小時未回覆自動結單</p>
                </div>
                <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800 opacity-50 grayscale cursor-not-allowed">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tight">AI 自動回覆 (BETA)</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">使用 Gemini AI 在非辦公時間代答</p>
                </div>
                <div className="w-12 h-6 bg-zinc-800 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">工單歡迎訊息 (Embed)</label>
                <textarea 
                  rows={4}
                  placeholder="歡迎來到 VX6 客服支援！請稍候，我們的專員將盡快為您服務..." 
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-8">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-6 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-tighter text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          {isSaving ? (
            <i className="fa-solid fa-circle-notch animate-spin"></i>
          ) : (
            <i className="fa-solid fa-cloud-arrow-up"></i>
          )}
          {isSaving ? '正在儲存中...' : '儲存伺服器設定'}
        </button>
      </div>
    </div>
  );
};

export default ServerSettings;
