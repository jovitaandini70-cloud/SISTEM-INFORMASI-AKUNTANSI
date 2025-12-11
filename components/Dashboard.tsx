import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Users, Calendar, Activity, AlertCircle } from 'lucide-react';
import { DashboardStat } from '../types';

const dataPatientFlow = [
  { name: 'Mon', patients: 120 },
  { name: 'Tue', patients: 145 },
  { name: 'Wed', patients: 132 },
  { name: 'Thu', patients: 156 },
  { name: 'Fri', patients: 189 },
  { name: 'Sat', patients: 90 },
  { name: 'Sun', patients: 45 },
];

const dataDepartments = [
  { name: 'Cardiology', value: 400 },
  { name: 'Neurology', value: 300 },
  { name: 'Pediatrics', value: 300 },
  { name: 'General', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const stats: DashboardStat[] = [
  { title: 'Total Patients', value: '1,284', change: '+12%', trend: 'up', icon: Users },
  { title: 'Appointments Today', value: '42', change: '+5%', trend: 'up', icon: Calendar },
  { title: 'Pending Prescriptions', value: '12', change: '-2%', trend: 'down', icon: Activity },
  { title: 'Critical Alerts', value: '3', change: '0%', trend: 'neutral', icon: AlertCircle },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Hospital Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                {stat.change}
              </span>
              <span className="text-slate-400 ml-2">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Patient Inflow</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPatientFlow}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F1F5F9' }}
                />
                <Bar dataKey="patients" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Load</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataDepartments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataDepartments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {dataDepartments.map((entry, index) => (
                <div key={index} className="flex items-center text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
