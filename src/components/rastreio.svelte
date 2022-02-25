<script lang="ts">
  import Icon from 'svelte-icons-pack';
  import HiOutlineTag from 'svelte-icons-pack/hi/HiOutlineTag';

  import { buscarObjeto } from '../services/rastreio';

  import { codigo, objetos, status as statusRastreio } from '../stores/rastreio';
  import { toast } from '../stores/toast';
  import { storeObject, userStore } from '../supabase.client';
  import Button from './button.svelte';
  import EventList from './event-list.svelte';
  import TextInput from './text-input.svelte';
  import { status as statusStoreObject } from '../stores/status';
  import Loading from './loading.svelte';

  async function handleClick() {
    try {
      statusRastreio.set('loading');
      objetos.set([]);
      const data = await buscarObjeto($codigo);

      objetos.set(data.objetos);
      statusRastreio.set('success');
    } catch (error) {
      statusRastreio.set('error');
      toast.danger('Não foi possível encontrar o código informado!');
    }
  }

  async function handleStoreObject(codigo: string, email: string) {
    try {
      statusStoreObject.set('loading');

      await storeObject(codigo, email);

      statusStoreObject.set('success');
    } catch (error) {
      statusStoreObject.set('error');
    }
  }

  $: $codigo, statusRastreio.set('');
</script>

<main>
  <div class="input-list">
    <TextInput bind:value={$codigo} placeholder="Digite o código do objeto" />

    <Button status={$statusRastreio} on:click={() => handleClick()}>Buscar</Button>
  </div>
  {#if $objetos.length > 0}
    <div class="response">
      <EventList objeto={$objetos[0]} />
    </div>
  {/if}
</main>

{#if $objetos.length > 0 && $userStore?.email}
  <button class="salvar-objeto" on:click={() => handleStoreObject($codigo, $userStore.email)}>
    {#if $statusStoreObject === 'loading'}
      <Loading />
    {:else}
      <Icon className="icon" src={HiOutlineTag} />
    {/if}
  </button>
{/if}

<style type="text/scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1rem;

    position: relative;
    width: 70vw;

    min-width: 200px;

    height: 4rem;
  }

  .input-list {
    display: flex;
    justify-content: flex-start;

    gap: 0.2rem;

    width: 100%;

    position: absolute;
    top: 0;
    left: 0;

    height: 3rem;
  }

  .response {
    position: absolute;

    top: 4rem;

    overflow: auto;
    width: 100%;
    height: 15rem;

    padding: 0 10px 10px 10px;

    border-radius: var(--br);
    background: var(--background-content);
  }

  .salvar-objeto {
    position: absolute;
    bottom: 5%;
    right: 5%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: xx-large;
    cursor: pointer;

    outline: none;
    border: none;

    background: var(--secondary);

    border-radius: var(--br-circle);
    padding: 0.5rem;

    &:active {
      transform: scale(0.9);
    }

    :global .icon {
      font-size: xx-large;

      fill: var(--secondary);
      stroke: var(--secondary);
      color: var(--secondary);

      path {
        stroke: var(--text);
      }
    }
  }
</style>
