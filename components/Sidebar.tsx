import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Settings, 
  Activity, 
  Users, 
  Stethoscope, 
  Pill 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquareText },
    { id: 'patients', label: 'Data Pasien', icon: Users },
    { id: 'doctors', label: 'Dokter', icon: Stethoscope },
    { id: 'pharmacy', label: 'Farmasi', icon: Pill },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen hidden md:flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
          <Activity className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 text-lg tracking-tight">MediOrch</h1>
          <p className="text-xs text-slate-500 font-medium">SIMRS Berbasis AI</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              currentView === item.id
                ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
            }`}
          >
            <item.icon size={20} className={currentView === item.id ? 'text-blue-600' : 'text-slate-400'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-600 text-sm font-medium hover:bg-slate-50 rounded-xl transition-colors">
          <Settings size={20} />
          Pengaturan
        </button>
      </div>
    </aside>
  );
};
