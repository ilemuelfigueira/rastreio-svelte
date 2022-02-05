<script lang="ts">
  import { Evento, Objeto } from '../services/rastreio/index.types';
  import FeedbackEvent from './event-feedback.svelte';

  export let objeto: Objeto = null;

  function getFrom(evento: Evento) {
    return `${evento.unidade.tipo} - ${
      evento.unidade.endereco.cidade !== undefined
        ? evento.unidade.endereco.cidade
        : evento.unidade.nome
    }`;
  }

  function getTo(evento) {
    if (!evento.unidadeDestino) return '';

    return `para: ${evento.unidadeDestino.tipo} - ${evento.unidadeDestino.endereco.cidade || ''}`;
  }
</script>

<div class="lista-eventos">
  {#if Boolean(objeto)}
    {#each objeto.eventos as evento}
      <FeedbackEvent
        item={{
          date: evento.dtHrCriado.toString(),
          from: getFrom(evento),
          to: getTo(evento),
          img: evento.urlIcone,
          title: evento.descricao,
        }}
      />
    {/each}
  {/if}
</div>

<style type="text/scss">
  .lista-eventos {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 0.5rem;
  }
</style>
