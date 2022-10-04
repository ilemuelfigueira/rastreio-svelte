import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { toast } from './stores/toast';

const supabaseUrl = String("https://rnnxjjoyyzczgxaufkdz.supabase.co");
const supabaseAnonKey = String("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubnhqam95eXpjemd4YXVma2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ3NjkwNTgsImV4cCI6MTk2MDM0NTA1OH0.K5FVxKppcRFkB1yepxflf5Q5hEX00aAy1WpzlbFog60");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const userStore = writable<{ id: string; email: string; name: string }>();

export const isSigned = writable(false);

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    userStore.set({
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata.name,
    });
    isSigned.set(true);
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null);
    isSigned.set(false);
  }
});

export function signIn(email: string, password: string) {
  return supabase.auth.signIn({ email, password });
}

export async function signUp(email: string, name: string, password: string) {
  return await supabase.auth.signUp(
    { email, password },
    {
      data: {
        name,
      },
    },
  );
}

export function signOut() {
  return supabase.auth.signOut();
}

export async function getProfiles() {
  return await supabase.from('profiles').select('name');
}

export async function getObjectsFromEmail(email: string) {
  return await supabase.rpc('get_busca_objetos_from_user', { _user_email: email });
}

export async function storeObject(codigo: string, email: string) {
  try {
    const { data, error, status } = await supabase.rpc('sp_se_store_object', {
      _user_email: email,
      _codigo: codigo,
    });

    if (error) {
      switch (status) {
        case 409:
          throw new Error('Objeto já cadastrado');
        default:
          throw new Error('Erro ao cadastrar objeto');
      }
    }

    toast.success('Objeto salvo com sucesso!');

    return data;
  } catch (error) {
    toast.danger(error.message);
  }
}

export async function updateObjectName(codigo: string, nome: string) {
  try {
    const { data, error, status } = await supabase.rpc('sp_se_update_object_name', {
      _name: nome,
      _code: codigo,
    });

    if (error) {
      switch (status) {
        default:
          throw new Error('Erro ao atualizar objeto');
      }
    }

    toast.success('Objeto atualizado com sucesso!');

    return data;
  } catch (error) {
    toast.danger(error.message);
  }
}
