<script lang="ts">
  import Icon from 'svelte-icons-pack';

  import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
  import CgDetailsMore from 'svelte-icons-pack/cg/CgDetailsMore';

  import HomeButton from '../components/homebutton.svelte';
  import { isOpen } from '../stores/dropdown';
  import { isSigned, signOut } from '../supabase.client';

  async function redirect(url: string) {
    const location = window.location.pathname;

    if (location === url) return;

    window.location.href = url;
    isOpen.set(false);
  }
</script>

<main>
  <nav>
    <HomeButton text="Início" src={AiFillHome} href="/" />

    <button on:click={() => isOpen.update((old) => !old)}>
      <Icon className="icon" src={CgDetailsMore} />
    </button>

    <ul class:hidden={!$isOpen} on:blur={() => isOpen.update((old) => !old)}>
      <button on:click={() => redirect('/rastreio')}> Rastreio </button>
      {#if $isSigned}
        <button on:click={() => redirect('/objects')}> Objetos </button>
        <button on:click={() => signOut()}> Desconectar </button>
      {:else}
        <button on:click={() => redirect('/signIn')}> Entrar </button>
      {/if}
    </ul>
  </nav>
  <section class="page">
    <slot />
  </section>
</main>

<style type="text/scss">
  @import '../styles/global.scss';

  button {
    outline: none;
    border: none;

    padding: 0.8rem;

    background: transparent;

    :global .icon {
      font-size: xx-large;

      fill: var(--text-primary);
      stroke: var(--text-primary);
      color: var(--text-primary);
    }
  }

  ul {
    &.hidden {
      display: none;
    }

    display: flex;
    justify-content: space-around;

    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 4rem;
    right: 0;

    width: 300px;
    @media (max-width: 600px) {
      width: 200px;
    }

    border-bottom-left-radius: 50px;

    background: var(--background);
    box-shadow: var(--lm-shadow-inactive);

    padding: 1rem 0;
    gap: 0.2rem;

    overflow-x: hidden;

    button {
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;

      outline: none;
      border: 0;

      background: var(--background);

      color: var(--text-primary);

      &:active {
        filter: brightness(0.9);
      }
    }
  }

  nav {
    display: flex;
    /* position: sticky; */
    position: relative;
    /* top: 0; */

    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 4rem;

    padding: 0 1rem;

    background: var(--background);
    box-shadow: var(--lm-shadow-inactive);
    z-index: 1;
  }

  .page {
    padding: 1rem;
    background: var(--background);

    width: 100%;
    min-height: 100vh;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
