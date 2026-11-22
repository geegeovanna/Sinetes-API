
import type { Sinete, SineteInput } from '@/types/sinete';

const API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = `${API_URL}/api/sinetes`;

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.erro || `Erro na requisição: ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const sineteService = {

  listar: () => request<Sinete[]>(''),

  buscarPorId: (id: number) => request<Sinete>(`/${id}`),

  cadastrar: (dados: SineteInput) =>
    request<Sinete>('', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  atualizar: (id: number, dados: SineteInput) =>
    request<Sinete>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  excluir: (id: number) =>
    request<void>(`/${id}`, {
      method: 'DELETE',
    }),
};
