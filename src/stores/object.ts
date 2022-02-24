import { writable } from 'svelte/store';

export type ObjectI = {
  id: string;
  created_at: Date;
  updated_at: Date;
  codigo: string;
  nome: string;
  user_id: string;
};

export const objectList = writable<ObjectI[]>();
export const status = writable<'loading' | 'success' | 'error' | ''>('');
