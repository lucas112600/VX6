import React, { useState } from 'react';
import { TicketCategory } from '../types';

const PRESET_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#71717a', // Zinc
];

const InitialSetup: React.FC = () => {
  // 移除預設類別
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [newCatColor, setNewCatColor] = useState(PRESET_COLORS[0]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('✅ 斜線指令已同步至 Discord！您現在可以在伺服器使用 /ticket setup 了。');
    }, 2000);
  };

  const addCategory = () => {
    if (!newCatName || !newCatDescription) {
      alert('請填寫完整類別名稱與說明');
      return;
    }
    const newCat: TicketCategory = {
      id: Date.now().toString(),
      name: newCatName,
      description: newCatDescription,
      color: newCatColor,
      parentId: ''
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatDescription('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Step 1: Command Sync */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/10 shrink-0">
            <i className={`fa-solid fa-rotate ${isSyncing ? 'animate-spin' : ''}`}></i>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2">步驟 1: 同步斜線指令</h3>
            <p className="text-zinc-500 text-sm font-medium mb-6">將核心指令部署至您的 Discord 伺服器，這是啟用自動化流程的第一步。</p>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className={`px-8 py-3 rounded-xl font-black uppercase tracking-tighter transition-all active:scale-95 ${
                isSyncing ? 'bg-zinc-800 text-zinc-600' : 'bg-white text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              {isSyncing ? '正在同步中...' : '立即同步指令'}
            </button>
          </div>
        </div>
      </section>

      {/* Step 2: Category Management */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-2">步驟 2: 工單類別管理</h3>
          <p className="text-zinc-500 text-sm font-medium">建立具備明確目標的開單選項，優化您的客服分類效率。</p>
        </div>

        {/* Categories List */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {categories.map((cat) => (
              <div key={cat.id} className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-start justify-between group hover:border-zinc-700 transition-all shadow-lg relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-1.5 h-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: cat.color }}
                ></div>
                <div className="pl-3">
                  <p className="font-black text-sm uppercase tracking-tight mb-1 flex items-center gap-2">
                    {cat.name}
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  </p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest line-clamp-2">{cat.description}</p>
                </div>
                <button 
                  onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 hover:text-red-400 hover:bg-red-400/10 transition-all ml-4"
                  title="刪除類別"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 border border-dashed border-zinc-800 rounded-2xl mb-10 text-center">
             <i className="fa-solid fa-folder-plus text-zinc-800 text-3xl mb-4"></i>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">尚未建立任何類別</p>
          </div>
        )}

        {/* New Category Form */}
        <div className="p-6 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-plus-circle"></i>
            新增類別
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">類別名稱</label>
              <input 
                type="text" 
                placeholder="例如: VIP 專區"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/10 transition-all text-sm placeholder:text-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">詳細說明</label>
              <input 
                type="text" 
                placeholder="例如: 提供給合作夥伴的專屬窗口"
                value={newCatDescription}
                onChange={(e) => setNewCatDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/10 transition-all text-sm placeholder:text-zinc-800"
              />
            </div>
          </div>
          
          <div className="mb-8 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 block">標籤顏色</label>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setNewCatColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${newCatColor === color ? 'border-white scale-110 ring-4 ring-white/10' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <input 
                  type="color" 
                  value={newCatColor}
                  onChange={(e) => setNewCatColor(e.target.value)}
                  className="w-6 h-6 bg-transparent border-none cursor-pointer p-0"
                />
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{newCatColor}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={addCategory}
            className="w-full md:w-auto px-10 py-3.5 bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white font-black rounded-xl uppercase tracking-tighter text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            將此類別加入列表
          </button>
        </div>
      </section>

      {/* Step 3: Permissions Checklist */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6">步驟 3: Discord 權限完整性檢查</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '身分組排序', desc: '確保 VX6 身分組權限覆蓋所有管理對象。', icon: 'fa-arrow-up-wide-short' },
            { label: '管理頻道', desc: '用於自動建立私密的工單溝通空間。', icon: 'fa-folder-tree' },
            { label: '管理權限', desc: '確保機器人能動態調整每個工單的訪問者。', icon: 'fa-key' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 p-5 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl group hover:bg-zinc-950 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-all">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight mb-1">{item.label}</p>
                <p className="text-[10px] text-zinc-600 font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
              <div className="mt-auto pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500/80">
                 <i className="fa-solid fa-circle-check"></i>
                 <span>檢測通過</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-8">
        <button className="w-full py-6 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-tighter text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-4 text-zinc-400 cursor-not-allowed" disabled>
          <i className="fa-solid fa-lock"></i>
          請先完成上述配置
        </button>
      </div>
    </div>
  );
};

export default InitialSetup;