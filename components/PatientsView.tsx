import React from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

export const PatientsView: React.FC = () => {
  const patients = [
    { id: 'RM-2024-001', name: 'Budi Santoso', age: 45, gender: 'Laki-laki', diagnosis: 'Hipertensi', status: 'Rawat Jalan', lastVisit: '12 Mei 2025' },
    { id: 'RM-2024-002', name: 'Siti Aminah', age: 32, gender: 'Perempuan', diagnosis: 'Influenza', status: 'Selesai', lastVisit: '14 Mei 2025' },
    { id: 'RM-2024-003', name: 'Rudi Hermawan', age: 58, gender: 'Laki-laki', diagnosis: 'Diabetes Tipe 2', status: 'Rawat Inap', lastVisit: '15 Mei 2025' },
    { id: 'RM-2024-004', name: 'Dewi Lestari', age: 28, gender: 'Perempuan', diagnosis: 'Pemeriksaan Rutin', status: 'Menunggu', lastVisit: 'Hari Ini' },
    { id: 'RM-2024-005', name: 'Andi Wijaya', age: 12, gender: 'Laki-laki', diagnosis: 'Cedera Ringan', status: 'IGD', lastVisit: 'Hari Ini' },
    { id: 'RM-2024-006', name: 'Rina Kartika', age: 35, gender: 'Perempuan', diagnosis: 'Asma', status: 'Rawat Jalan', lastVisit: '10 Mei 2025' },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Data Pasien</h2>
          <p className="text-sm text-slate-500">Kelola rekam medis dan informasi pasien rumah sakit</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          + Pasien Baru
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari pasien berdasarkan nama atau No. RM..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
          Filter Status
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">No. RM</th>
                <th className="px-6 py-4">Nama Pasien</th>
                <th className="px-6 py-4">Usia/Gender</th>
                <th className="px-6 py-4">Diagnosis Utama</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Kunjungan Terakhir</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{patient.id}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.age} Th / {patient.gender}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.diagnosis}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${patient.status === 'Rawat Inap' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                        patient.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                        patient.status === 'IGD' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
