import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

const supabaseUrl = String(import.meta.env.VITE_SVELTE_APP_SUPABASE_URL);
const supabaseAnonKey = String(import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const userStore = writable<{ id: string; email: string }>();

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    userStore.set(session.user);
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null);
  }
});

export function signIn(email: string, password: string) {
  return supabase.auth.signIn({ email, password });
}

export function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export function signOut() {
  return supabase.auth.signOut();
}

export function getProfiles() {
  return supabase.from('profiles').select('name');
}

export function getObjectsFromEmail(email: string) {
  return supabase.rpc('get_busca_objetos_from_user', { _user_email: email });
}
