import React from 'react';
import { Star } from 'lucide-react';

export const DoctorsView: React.FC = () => {
  const doctors = [
    { name: 'Dr. Amelia Sanjaya', spec: 'Spesialis Jantung', rating: 4.9, patients: 1200, status: 'Praktek', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Budi Gunawan', spec: 'Spesialis Anak', rating: 4.8, patients: 980, status: 'Istirahat', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Citra Lestari', spec: 'Spesialis Syaraf', rating: 5.0, patients: 850, status: 'Praktek', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Dedi Pratama', spec: 'Dokter Umum', rating: 4.7, patients: 2100, status: 'Cuti', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Eka Wijaya', spec: 'Spesialis Bedah', rating: 4.9, patients: 600, status: 'Operasi', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Dr. Sarah Nurhaliza', spec: 'Spesialis Mata', rating: 4.8, patients: 720, status: 'Praktek', image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 h-full overflow-y-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Direktori Dokter</h2>
        <p className="text-sm text-slate-500">Informasi ketersediaan dan spesialisasi dokter</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 group-hover:border-blue-50 transition-colors" />
                <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white 
                  ${doc.status === 'Praktek' ? 'bg-green-500' : doc.status === 'Operasi' ? 'bg-red-500' : 'bg-slate-400'}`}></span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{doc.name}</h3>
              <p className="text-blue-600 text-sm font-medium mb-3">{doc.spec}</p>
              
              <div className="flex items-center justify-center gap-4 w-full mb-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span>{doc.rating}</span>
                </div>
                <div className="w-px h-4 bg-slate-200"></div>
                <div>{doc.patients}+ Pasien</div>
              </div>

              <div className="w-full space-y-2">
                <button className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all">
                  Lihat Jadwal
                </button>
                <button className="w-full py-2 px-4 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  Hubungi
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
               <span>Status:</span>
               <span className={`font-medium ${
                 doc.status === 'Praktek' ? 'text-green-600' : 
                 doc.status === 'Operasi' ? 'text-red-600' : 'text-slate-500'
               }`}>{doc.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
