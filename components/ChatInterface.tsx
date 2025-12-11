import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, FileLock2, Pill, UserPlus, CalendarClock, BrainCircuit } from 'lucide-react';
import { Message, AgentType } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { AGENT_COLORS } from '../constants';

const AgentIconMap = {
  [AgentType.ORCHESTRATOR]: BrainCircuit,
  [AgentType.RECORDS]: FileLock2,
  [AgentType.PRESCRIPTIONS]: Pill,
  [AgentType.REGISTRATION]: UserPlus,
  [AgentType.SCHEDULING]: CalendarClock,
};

// Function to parse the raw text from Gemini and extract the specific Agent used
const parseResponse = (text: string): { agent: AgentType, formattedText: React.ReactNode } => {
  let agent = AgentType.ORCHESTRATOR;
  
  // Simple regex to find the [DELEGASI] tag
  const delegationMatch = text.match(/\[DELEGASI\]:\s*(Subagen \d+|.+)/i);
  
  if (delegationMatch) {
    const delegation = delegationMatch[1].toLowerCase();
    if (delegation.includes('rekam') || delegation.includes('record') || delegation.includes('subagen 1')) agent = AgentType.RECORDS;
    else if (delegation.includes('resep') || delegation.includes('prescription') || delegation.includes('subagen 2')) agent = AgentType.PRESCRIPTIONS;
    else if (delegation.includes('daftar') || delegation.includes('pendaftaran') || delegation.includes('registration') || delegation.includes('subagen 3')) agent = AgentType.REGISTRATION;
    else if (delegation.includes('jadwal') || delegation.includes('penjadwal') || delegation.includes('subagen 4')) agent = AgentType.SCHEDULING;
  }

  // Formatting the text to look nicer in UI (removing raw tags if desired, or styling them)
  const lines = text.split('\n');
  const formattedText = lines.map((line, idx) => {
    if (line.startsWith('[ANALISIS INTENT]')) return <div key={idx} className="text-xs text-slate-400 mb-1 italic">{line}</div>;
    if (line.startsWith('[DELEGASI]')) return <div key={idx} className="text-xs font-bold text-slate-500 mb-2">{line}</div>;
    if (line.startsWith('[EKSEKUSI SUBAGEN]')) return <div key={idx} className="font-semibold text-sm text-slate-700 mt-2 mb-1 border-b pb-1">Execution:</div>;
    if (line.startsWith('[KONFIRMASI]')) return <div key={idx} className="mt-3 p-2 bg-green-50 text-green-800 text-sm rounded border border-green-100">{line.replace('[KONFIRMASI]:', '')}</div>;
    if (line.startsWith('[PERNYATAAN KEAMANAN]')) return <div key={idx} className="mt-3 p-2 bg-amber-50 text-amber-800 text-xs rounded border border-amber-100 flex items-center gap-2"><FileLock2 size={12}/> {line.replace('[PERNYATAAN KEAMANAN]:', '')}</div>;
    
    // Normal lines
    if (line.trim() === '') return <br key={idx} />;
    if (line.trim().startsWith('-')) return <li key={idx} className="ml-4 text-sm text-slate-700">{line.replace('-', '')}</li>;
    return <p key={idx} className="text-sm text-slate-700">{line}</p>;
  });

  return { agent, formattedText: <div>{formattedText}</div> };
};

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Halo, saya adalah Orchestrator Layanan Kesehatan Utama. Saya dapat membantu Anda dengan Rekam Medis, Resep, Pendaftaran Pasien, atau Penjadwalan Janji Temu. Apa yang bisa saya bantu hari ini?",
      timestamp: new Date(),
      agent: AgentType.ORCHESTRATOR
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(inputText);
      const { agent } = parseResponse(responseText);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        agent: agent
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-24">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const { formattedText } = isUser ? { formattedText: msg.text } : parseResponse(msg.text);
          const Icon = isUser ? User : (AgentIconMap[msg.agent || AgentType.ORCHESTRATOR]);
          const agentColor = isUser ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 shadow-sm';

          return (
            <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-700' : AGENT_COLORS[msg.agent || AgentType.ORCHESTRATOR]}`}>
                  <Icon size={20} />
                </div>

                {/* Bubble */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                   {!isUser && (
                     <span className="text-xs font-semibold text-slate-500 mb-1 ml-1 block">
                       {msg.agent || 'Orchestrator'}
                     </span>
                   )}
                   <div className={`p-4 rounded-2xl ${agentColor} text-sm leading-relaxed overflow-hidden`}>
                     {formattedText}
                   </div>
                   <span className="text-[10px] text-slate-400 mt-1 mx-1">
                     {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                 <Loader2 size={20} className="animate-spin text-slate-400" />
               </div>
               <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                 <span className="text-xs text-slate-500">Orchestrating agents...</span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-4">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik permintaan (contoh: Jadwalkan temu dengan Dr. Amelia, atau Cek resep saya)..."
            className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pr-12 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-slate-400">
            Powered by Gemini 2.5 Flash • HIPAA Compliant Environment Demo
          </p>
        </div>
      </div>
    </div>
  );
};
