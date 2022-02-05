<script lang="ts">
  import Icon from 'svelte-icons-pack';
  import BiSearch from 'svelte-icons-pack/bi/BiSearch';

  import { buscarObjeto } from '../services/rastreio';
  import { Evento } from '../services/rastreio/index.types';

  import { codigo, objetos } from '../stores/rastreio';

  export let eventos: Evento[] = [];
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

  <div class="lista-eventos">
    {#if $objetos.length > 0}
      {#each $objetos[0].eventos as evento}
        <div class="feedback-rastreio">
          <div class="header">
            <img src={'https://proxyapp.correios.com.br' + evento.urlIcone} alt="" />
            <span>{evento.descricao}</span>
          </div>
          <div class="localizacao">
            <span>
              {#if Boolean(evento.unidadeDestino)}
                de:
              {/if}
              {evento.unidade.tipo} -
              {#if evento.unidade.endereco.cidade !== undefined}
                {evento.unidade.endereco.cidade}
              {:else}
                {evento.unidade.nome}
              {/if}
            </span>
            {#if Boolean(evento.unidadeDestino)}
              <span>
                {'para: ' + evento.unidadeDestino.tipo} :
                {#if evento.unidadeDestino.endereco.cidade !== undefined}
                  {evento.unidadeDestino.endereco.cidade}
                {/if}
              </span>
            {/if}
          </div>
          <span>
            {#if Boolean(evento.dtHrCriado)}
              {new Date(evento.dtHrCriado).toLocaleString('pt-BR', { timeZone: 'UTC' })}
            {/if}
          </span>
        </div>
      {/each}
    {/if}
  </div>
</main>

<style type="text/scss">
  .lista-eventos {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;
  }

  .feedback-rastreio {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 0.2rem 0.8rem;
    box-shadow: var(--lm-shadow-inactive);

    min-width: max-content;
    width: 100%;

    border-top: 1px solid var(--btn);
    border-radius: var(--br);

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      gap: 0.5rem;

      img {
        width: 2rem;
        aspect-ratio: 4/4;
        user-select: none;
      }

      span {
        font-size: 1rem;
        font-weight: bold;
      }
    }

    .localizacao {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
  }
</style>
