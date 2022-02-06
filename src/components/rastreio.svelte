<script lang="ts">
  import { buscarObjeto } from '../services/rastreio';

  import { codigo, objetos, status } from '../stores/rastreio';
  import EventList from './event-list.svelte';
  import TextInput from './text-input.svelte';

  async function handleClick() {
    try {
      status.set('loading');
      const data = await buscarObjeto($codigo);

      objetos.set(data.objetos);
      status.set('success');
    } catch (error) {
      status.set('error');
    }
  }

  $: if ($status !== '') {
    alert($status);
  }

  $: $codigo, status.set('');
</script>

<main>
  <div class="input-list">
    <TextInput bind:value={$codigo} placeholder="Digite o código do objeto" />
    <button on:click={() => handleClick()}> Buscar </button>
  </div>
  {#if $objetos.length > 0}
    <div class="response">
      <EventList objeto={$objetos[0]} />
    </div>
  {/if}
</main>

<style type="text/scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 1rem;

    position: relative;
    width: 60vw;

    min-width: 300px;

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

  button {
    padding: 0.5rem;

    font-family: 'Poppins', sans-serif;

    border: 1px solid #ccc;
    border-radius: var(--br);

    outline: none;

    background: var(--background);

    &:hover {
      border-color: var(--input-hover);
      cursor: pointer;
    }

    &:active {
      border-color: var(--input-focus);
    }
  }
</style>
