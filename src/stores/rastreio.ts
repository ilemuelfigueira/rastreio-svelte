import { writable } from 'svelte/store';
import { Objeto } from '../services/rastreio/index.types';

export const codigo = writable('');
export const objetos = writable<Objeto[]>([]);
export const status = writable<'error' | 'loading' | 'success' | ''>('');
