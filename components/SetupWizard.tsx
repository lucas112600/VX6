import React, { useState } from 'react';
import { APP_NAME, IndustryType, setIndustryConfig } from '../constants';

interface SetupWizardProps {
  onComplete: () => void;
  onBack: () => void;
}

const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete, onBack }) => {
  const [selected, setSelected] = useState<IndustryType>('studio');

  const handleFinish = () => {
    setIndustryConfig(selected);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 selection:bg-white selection:text-zinc-950">
      <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
        <div className="glass-panel p-12 md:p-16 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-12">
          
          <div className="flex justify-between items-center mb-4">
             <button onClick={onBack} className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">← 返回主頁</button>
             <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">1 / 1 設定您的偏好</span>
          </div>

          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">選擇您的營運類別</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">我們將為您調整專屬的數據面板與 AI 分析模型</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'proxy', label: '專業代購', icon: 'fa-shopping-bag', desc: '利潤追蹤、訂單物流管理' },
                { id: 'studio', label: '遊戲/技術工作室', icon: 'fa-gamepad', desc: '接單分析、客服績效統計' },
                { id: 'community', label: '社群管理', icon: 'fa-users', desc: '成員互動、開單量化分析' },
                { id: 'club', label: '校園社團', icon: 'fa-graduation-cap', desc: '活動報名、成員連繫管理' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id as IndustryType)}
                  className={`p-6 rounded-3xl border text-left transition-all group ${
                    selected === item.id 
                    ? 'bg-white border-white' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${selected === item.id ? 'bg-zinc-950 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:text-white'}`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h4 className={`text-sm font-black uppercase tracking-tight ${selected === item.id ? 'text-zinc-950' : 'text-white'}`}>{item.label}</h4>
                  <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${selected === item.id ? 'text-zinc-600' : 'text-zinc-500'}`}>{item.desc}</p>
                </button>
              ))}
            </div>

            <button 
              onClick={handleFinish}
              className="w-full py-5 bg-white text-zinc-950 font-black rounded-2xl uppercase tracking-tighter shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              完成設定並前往 Discord 登入
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
