import { writable } from 'svelte/store';

export const email = writable('');
export const password = writable('');
export const status = writable<'loading' | 'error' | 'success' | ''>('');
export const name = writable('');
