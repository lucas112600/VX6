import React, { useState, useEffect } from 'react';
import { TicketStatus, Ticket } from '../types';
import { analyzeTicketIssue } from '../services/geminiService';
import { getBotConfig } from '../constants';

const TicketManagement: React.FC = () => {
  const config = getBotConfig();
  const [filter, setFilter] = useState<TicketStatus | 'all'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsSyncing(false);
      setLastSyncTime(new Date());
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAIAnalysis = async (ticket: Ticket) => {
    if (!ticket.lastMessage) return;
    setIsAnalyzing(ticket.ticketId);
    
    const result = await analyzeTicketIssue([ticket.lastMessage], config?.industry || 'studio');
    
    if (result) {
      alert(`🤖 AI 行動報告 [${config?.industry?.toUpperCase()}]\n\n摘要：${result.summary}\n情緒：${result.sentiment}\n建議：${result.recommendation}\n預估產值：$${result.estimatedProfit}`);
    } else {
      alert('AI 分析暫時不可用，請確認已在開發者帳戶中配置 API Key。');
    }
    setIsAnalyzing(null);
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            {['all', 'open', 'pending', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filter === s ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {s === 'all' ? '全部' : s === 'open' ? '開啟中' : s === 'pending' ? '處理中' : '已結案'}
              </button>
            ))}
          </div>
          <button onClick={fetchTickets} className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 rounded-full border border-zinc-800/50">
            <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-blue-500 animate-ping' : 'bg-emerald-500'}`}></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Sync</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-24">
             <i className="fa-solid fa-cloud-arrow-down text-4xl text-zinc-700 mb-8"></i>
             <h3 className="text-2xl font-black uppercase tracking-tighter mb-3">等待 Discord 數據流入</h3>
             <p className="text-zinc-500 text-sm font-medium">請在伺服器使用指令啟動工單，資料將自動同步至此。</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">工單標號</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">使用者</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">狀態</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-right">分析</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.ticketId} className="group hover:bg-zinc-800/30 transition-all">
                    <td className="p-8 font-mono text-xs font-black">{ticket.ticketId}</td>
                    <td className="p-8">
                       <p className="text-sm font-black">{ticket.ownerName}</p>
                       <p className="text-[10px] text-zinc-600">{ticket.category}</p>
                    </td>
                    <td className="p-8">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.status === 'open' ? 'text-emerald-400' : 'text-zinc-600'}`}>
                         {ticket.status}
                       </span>
                    </td>
                    <td className="p-8 text-right">
                       <button 
                         onClick={() => handleAIAnalysis(ticket)}
                         disabled={isAnalyzing === ticket.ticketId}
                         className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-white hover:text-zinc-950 transition-all"
                       >
                         <i className={`fa-solid ${isAnalyzing === ticket.ticketId ? 'fa-spinner fa-spin' : 'fa-brain'}`}></i>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketManagement;
