
export interface Sinete {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  nivelPerigo: number;
  raro: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SineteInput {
  nome: string;
  descricao: string;
  categoria: string;
  nivelPerigo: number;
  raro: boolean;
}
