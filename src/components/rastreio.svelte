<script lang="ts">
  import Icon from 'svelte-icons-pack';
  import BiSearch from 'svelte-icons-pack/bi/BiSearch';

  import { buscarObjeto } from '../services/rastreio';

  import { codigo, objetos } from '../stores/rastreio';
  import EventList from './event-list.svelte';
</script>

<main>
  <div>
    <input
      bind:value={$codigo}
      type="text"
      v-model="codigo"
      placeholder="Digite o código do objeto"
    />
    <button on:click={() => buscarObjeto($codigo, objetos.set)}><Icon src={BiSearch} /></button>
  </div>
  {#if $objetos.length > 0}
    <EventList objeto={$objetos[0]} />
  {/if}
</main>

<style type="text/scss">
</style>
