import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { PatientsView } from './components/PatientsView';
import { DoctorsView } from './components/DoctorsView';
import { Menu, Activity } from 'lucide-react';

const PharmacyPlaceholder = () => (
  <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-4">
    <div className="bg-slate-100 p-6 rounded-full">
      <Activity size={48} className="text-slate-300" />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold text-slate-700">Modul Farmasi</h3>
      <p className="text-sm">Fitur manajemen obat dan inventaris sedang dalam pengembangan.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  // Default view set to 'dashboard' typical for an HIS
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'chat': return <ChatInterface />;
      case 'patients': return <PatientsView />;
      case 'doctors': return <DoctorsView />;
      case 'pharmacy': return <PharmacyPlaceholder />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
           <div className="bg-blue-600 p-1.5 rounded-lg">
             <Activity className="text-white" size={18} />
           </div>
           <span className="font-bold text-slate-800">MediOrch</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-white border-b border-slate-200 z-40 shadow-lg">
          <div className="flex flex-col p-4 space-y-2">
             {[
               {id: 'dashboard', label: 'Dashboard'},
               {id: 'chat', label: 'AI Assistant'},
               {id: 'patients', label: 'Data Pasien'},
               {id: 'doctors', label: 'Dokter'},
               {id: 'pharmacy', label: 'Farmasi'}
             ].map(item => (
               <button 
                 key={item.id}
                 onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }}
                 className={`p-3 rounded-lg text-left font-medium ${currentView === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
               >
                 {item.label}
               </button>
             ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full md:pt-0 pt-14 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
