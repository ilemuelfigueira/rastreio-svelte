<script lang="ts">
  import { objectList, status as statusObject } from '../stores/object';
  import { getObjectsFromEmail, isSigned, userStore } from '../supabase.client';
  import { codigo, objetos, status as statusRastreio } from '../stores/rastreio';
  import { buscarObjeto } from '../services/rastreio';
  import EventList from '../components/event-list.svelte';
  import Button from '../components/button.svelte';

  async function getObjects() {
    const { data, error } = await getObjectsFromEmail($userStore.email);

    if (error) {
      alert('erro ao buscar por objetos do usuário');
    }

    const response = data[0].j;

    objectList.set(response);
    statusObject.set('success');
  }

  async function rastrear(codigo: string) {
    try {
      statusRastreio.set('loading');
      objetos.set([]);
      const data = await buscarObjeto(codigo);

      objetos.set(data.objetos);
      statusRastreio.set('success');
    } catch (error) {
      statusRastreio.set('error');
    }
  }

  $: if ($codigo !== '') {
    rastrear($codigo);
  }

  $: if (!Boolean($objectList) && $isSigned) {
    getObjects();
  }
</script>

<main>
  {#if Boolean($objectList)}
    <div class="container-codigos">
      {#if $statusObject === 'success' && $objetos.length === 0}
        {#each $objectList as object}
          <button class={`codigo ${object.codigo === $codigo ? 'selected' : ''}`}>
            <span on:click={() => codigo.set(object.codigo)}>{object.codigo}</span>
          </button>
        {/each}
      {:else if $statusObject === 'loading'}
        <span>Carregando</span>
      {:else if $statusObject === 'error'}
        <span>Erro ao carregar objetos</span>
      {/if}
    </div>

    {#if $objetos.length > 0}
      <div class="container-objetos">
        <Button
          on:click={() => {
            codigo.set('');
            objetos.set([]);
          }}
        >
          Limpar
        </Button>
        <div class="lista">
          {#if $objetos.length > 0}
            <div class="response">
              <EventList objeto={$objetos[0]} />
            </div>
          {/if}
        </div>
      </div>
    {/if}
    {#if $statusRastreio === 'loading'}
      <span>Carregando...</span>
    {:else}
      <span class="none-selected">Selecione um código!</span>
    {/if}
  {:else}
    <span>Nenhum código de rastreio salvo!</span>
  {/if}
</main>

<style type="text/scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    position: relative;

    gap: 2rem;

    padding-bottom: 2rem;
  }

  .container-codigos {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;

    gap: 1rem;

    .codigo {
      cursor: pointer;

      padding: 1rem;

      letter-spacing: 0.1rem;
      font-size: larger;
      font-weight: bold;

      background: var(--primary);

      color: var(--text);
      box-shadow: var(--lm-shadow-active);

      outline: none;
      border: none;
      border-radius: var(--br);

      &.selected {
        background: var(--secondary);
      }

      &:active {
        filter: brightness(1) !important;
        transition: filter 0s ease-in-out;
        transform: scale(0.9);
      }

      &:hover {
        filter: brightness(0.9);
        transition: filter 0.2s ease-in-out;
      }
    }
  }

  .container-objetos {
    position: relative;
    width: 70vw;
    height: 2rem;
  }

  :global .container-objetos button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .container-objetos .lista {
    position: absolute;

    top: 4rem;

    overflow: auto;
    width: 100%;
    height: 15rem;

    padding: 10px 10px 10px 10px;

    border-radius: var(--br);
    background: var(--background-content);
  }
</style>
