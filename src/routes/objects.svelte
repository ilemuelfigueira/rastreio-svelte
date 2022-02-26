<script lang="ts">
  import EventList from '../components/event-list.svelte';
  import Button from '../components/button.svelte';
  import { objectList, status as statusObject } from '../stores/object';
  import { codigo, objetos, status as statusRastreio } from '../stores/rastreio';
  import { toast } from '../stores/toast';
  import { buscarObjeto } from '../services/rastreio';
  import { getObjectsFromEmail, userStore } from '../supabase.client';
  import FiEdit from 'svelte-icons-pack/fi/FiEdit';
  import BiShow from 'svelte-icons-pack/bi/BiShow';
  import Icon from 'svelte-icons-pack';
  import { onMount } from 'svelte';

  async function getObjects() {
    statusObject.set('loading');
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

  $: if ($statusRastreio === 'error') {
    toast.danger('Não foi possível rastrear o código informado!');
  }

  onMount(() => {
    getObjects();
  });
</script>

<main>
  {#if Boolean($objectList)}
    <div class="container-codigos">
      {#if $statusObject === 'success' && $objetos.length === 0}
        {#each $objectList as object}
          <div class={`codigo ${object.codigo === $codigo ? 'selected' : ''}`}>
            <!-- <div tooltip-string="Alterar apelido" tooltip-align="left">
              <Icon className="icon-edit" src={FiEdit} />
            </div> -->
            <span>{object.nome || object.codigo}</span>
            <div
              tooltip-string="Rastrear"
              tooltip-align="right"
              on:click={() => codigo.set(object.codigo)}
            >
              <Icon className="icon-show" src={BiShow} />
            </div>
          </div>
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
    <!-- {#if $statusRastreio === 'loading'}
      <Loading />
    {:else}
      <span class="none-selected">Selecione um código!</span>
    {/if} -->
  {:else if $statusObject === 'success' && !Boolean($objectList)}
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
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 0.5rem;

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

      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      [tooltip-string][tooltip-align='left'] {
        &:hover:after {
          top: 0 !important;
          bottom: 0 !important;
          right: 2rem !important;
        }
      }

      [tooltip-string][tooltip-align='right'] {
        &:hover:after {
          top: 0 !important;
          bottom: 0 !important;
          left: 2rem !important;
        }
      }

      [tooltip-string][tooltip-align] {
        position: relative;

        &::before {
          content: '';

          display: none;
        }

        &:hover::after {
          content: attr(tooltip-string);
          display: flex;
          align-items: center;
          justify-content: center;

          position: absolute;

          font-size: small;
          border-radius: var(--br);

          background: var(--secondary);

          width: max-content;
          padding: 0.5rem;

          text-align: center;

          z-index: 1;
        }
      }

      :global {
        .icon-edit {
          font-size: x-large;
          stroke: var(--text);

          &:hover {
            cursor: pointer;

            transform: scale(1.1);
            filter: brightness(0.9);
            transition: filter 0.2s ease-in-out;
          }
        }

        .icon-show {
          font-size: x-large;
          fill: var(--text);
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            filter: brightness(0.9);
            transition: filter 0.2s ease-in-out;
          }
        }
      }

      &.selected {
        background: var(--secondary);
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
