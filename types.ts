export enum AgentType {
  ORCHESTRATOR = 'Orchestrator',
  RECORDS = 'Medical Records',
  PRESCRIPTIONS = 'Prescriptions',
  REGISTRATION = 'Registration',
  SCHEDULING = 'Scheduling'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  agent?: AgentType; // The agent identified from the response
}

export interface ChartData {
  name: string;
  value: number;
}

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}