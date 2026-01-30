
export enum Orgao {
  INSS = 'INSS',
  SIAPE = 'SIAPE',
  FORCAS_ARMADAS = 'FORCAS_ARMADAS',
  GOV_ESTADO = 'GOV_ESTADO',
  PREFEITURA = 'PREFEITURA',
  JURIDICO = 'JURIDICO'
}

export enum LeadStatus {
  NOVO = 'NOVO',
  EM_ANALISE = 'EM_ANALISE',
  AVERBACAO = 'AVERBACAO',
  APROVADO = 'APROVADO',
  RECUSADO = 'RECUSADO',
  PAGO = 'PAGO'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSIONAL = 'PROFESSIONAL',
  VISITOR = 'VISITOR'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Lead {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  valorSolicitado: number;
  margemDisponivel: number;
  orgao: Orgao;
  status: LeadStatus;
  createdAt: string;
  city?: string;
  matricula?: string;
  beneficio?: string;
  processoJudicial?: string;
  observacoes?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
