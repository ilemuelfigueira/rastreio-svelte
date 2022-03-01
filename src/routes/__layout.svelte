<script lang="ts">
  import Icon from 'svelte-icons-pack';

  import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
  import CgDetailsMore from 'svelte-icons-pack/cg/CgDetailsMore';
  import BiMoon from 'svelte-icons-pack/bi/BiMoon';
  import BsSun from 'svelte-icons-pack/bs/BsSun';

  import HomeButton from '../components/homebutton.svelte';
  import { isOpen } from '../stores/dropdown';
  import { page } from '$app/stores';
  import { isSigned, signOut, userStore } from '../supabase.client';
  import { theme } from '../stores/theme';
  import Toast from '../components/toast.svelte';
  import { toast } from '../stores/toast';
  import { onMount } from 'svelte';
  import { isMounting } from '../stores/lifecycle';

  onMount(() => {
    try {
      isMounting.set(true);

      const storagedTheme = sessionStorage.getItem('theme');

      if (storagedTheme) {
        theme.set(storagedTheme);
        return;
      }
      theme.set('light');
    } catch (error) {
      toast.danger('Erro ao carregar tema', 2000);
    } finally {
      isMounting.set(false);
    }
  });

  async function redirect(url: string) {
    const location = window.location.pathname;

    if (location === url) return;

    window.location.href = url;
    isOpen.set(false);
  }

  function isActive(url: string) {
    const result = url === $page.url.pathname;
    return result;
  }

  function changeTheme() {
    const currentTheme = $theme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    const isLight = nextTheme === 'light';

    if (isLight) toast.warning('Bom dia!');
    else toast.warning('Boa noite!');

    theme.set(nextTheme);
    sessionStorage.setItem('theme', nextTheme);
  }
</script>

{#if !$isMounting}
  <main data-theme={$theme}>
    <nav>
      <HomeButton text="Início" src={AiFillHome} href="/" />

      <div class="switchers">
        {#if $isSigned}
          <span>
            {$userStore.name}
          </span>
        {/if}
        <button on:click={() => changeTheme()}>
          {#if $theme === 'light'}
            <Icon className="icon" src={BsSun} />
          {:else}
            <Icon className="icon" src={BiMoon} />
          {/if}
        </button>
        <button on:click={() => isOpen.update((old) => !old)}>
          <Icon className="icon" src={CgDetailsMore} />
        </button>
      </div>

      <ul class:hidden={!$isOpen}>
        <button
          class={`${isActive('/tracking') ? 'active' : ''}`}
          on:click={() => redirect('/tracking')}
        >
          Rastreio
        </button>
        {#if $isSigned}
          <button
            class={`${isActive('/objects') ? 'active' : ''}`}
            on:click={() => redirect('/objects')}
          >
            Objetos
          </button>
          <button on:click={() => signOut()}> Sair </button>
        {:else}
          <button on:click={() => redirect('/signIn')}> Entrar </button>
          <button on:click={() => redirect('/signUp')}> Cadastrar </button>
        {/if}
      </ul>
    </nav>
    <section class="page">
      <slot />
    </section>
    <Toast />
  </main>
{/if}

<style type="text/scss">
  @import '../styles/global.scss';

  .active {
    background: var(--secondary) !important;
  }

  button {
    cursor: pointer;

    outline: none;
    border: none;

    padding: 0.8rem;

    background: transparent;

    :global .icon {
      font-size: xx-large;

      fill: var(--text);
      stroke: var(--text);
      color: var(--text);
    }
  }

  .switchers {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: var(--text);
    }

    :global .icon {
      font-size: xx-large;

      &:hover {
        fill: var(--secondary);
        stroke: var(--secondary);
        color: var(--secondary);
      }

      &:active {
        transform: scale(0.9);
      }
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

    border-bottom-left-radius: 30px;

    background: var(--primary);
    box-shadow: var(--lm-shadow-inactive);

    padding: 1rem 0;
    gap: 0.2rem;

    overflow-x: hidden;

    button {
      width: 90%;
      text-align: center;
      padding: 0.5rem 0;

      outline: none;
      border: 0;

      background: transparent;

      color: var(--text);

      border-radius: var(--br);

      &:hover {
        filter: brightness(0.9) !important;
        background: #888;
      }

      &:active {
        filter: brightness(1);
        transform: scale(0.9);
      }
    }
  }

  nav {
    display: flex;
    position: relative;

    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 4rem;

    padding: 0 1rem;

    background: var(--primary);
    box-shadow: var(--lm-shadow-inactive);
    z-index: 1;
  }

  .page {
    padding: 1rem;
    background: var(--background);

    width: 100%;
    min-height: calc(100vh - 4rem);
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
