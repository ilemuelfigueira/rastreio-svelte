<script lang="ts">
  import { writable } from 'svelte/store';

  import Button from '../components/button.svelte';

  import TextInput from '../components/text-input.svelte';

  import { email, name, password, status } from '../stores/auth';
  import { toast } from '../stores/toast';
  import { signUp } from '../supabase.client';

  const showPassword = writable(false);

  async function handleSignUp(params: { email: string; name: string; password: string }) {
    const { email, name, password } = params;
    try {
      status.set('loading');
      const { error } = await signUp(email, name, password);

      if (error && error.status !== 406) {
        toast.danger('Login ou senha inválidos');
        status.set('error');
        return;
      }

      toast.success('Verifique a caixa de email e o spam!');

      status.set('success');

      setTimeout(() => {
        window.location.assign('/signIn');
      }, 2000);
    } catch (error) {
      toast.danger('Login ou senha inválidos');
      status.set('error');
    }
  }
</script>

<main>
  <div class="inputList">
    <TextInput bind:value={$email} placeholder="Digite um email" />
    <TextInput bind:value={$name} placeholder="Digite o seu nome" />
    <TextInput password={!$showPassword} bind:value={$password} placeholder="Digite uma senha" />
    <div class="showPassword">
      <input type="checkbox" bind:checked={$showPassword} placeholder="Mostrar senha" />
      <span>Mostrar senha</span>
    </div>
  </div>
  <Button
    status={$status}
    on:click={() =>
      handleSignUp({
        email: $email,
        name: $name,
        password: $password,
      })}>Cadastrar</Button
  >
</main>

<style type="text/scss">
  main {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 70vw;
    min-width: 200px;
    max-width: 400px;

    flex-direction: column;

    gap: 1.5rem;

    :global button {
      width: 100%;
    }

    min-height: 80vh;
  }

  .inputList {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    align-items: center;
    justify-content: center;

    width: 100%;
  }

  .showPassword {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    gap: 0.5rem;

    font-size: small;
  }
</style>
