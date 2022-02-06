<script lang="ts">
  import { FeedBackRastreioProps } from '../types/feedback-rastreio';

  export let item: FeedBackRastreioProps = null;
</script>

<div class="feedback-rastreio">
  <div class="header">
    <img src={'https://proxyapp.correios.com.br' + item.img} alt="" />
    <span>{item.title}</span>
  </div>
  <div class="localizacao">
    <span>
      {#if Boolean(item.to)}
        de:
      {/if}
      {item.from}
    </span>
    {#if Boolean(item.to)}
      <span>
        {item.to}
      </span>
    {/if}
  </div>
  <span class="period-date">
    {#if Boolean(item.date)}
      {new Date(item.date).toLocaleString('pt-BR', { timeZone: 'UTC' })}
    {/if}
  </span>
</div>

<style type="text/scss">
  .feedback-rastreio {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 0.2rem 0.8rem;
    box-shadow: var(--lm-shadow-inactive);

    width: 100%;

    border-top: 1px solid var(--btn);
    border-radius: var(--br);

    gap: 0.3rem;

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
        font-size: large;
        font-weight: bold;
      }
    }

    .localizacao {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      font-size: small;
    }

    .period-date {
      font-size: small;
      font-style: italic;
    }

    /* @media (max-width: 600px) {
      .header {
        span {
          font-size: small;
        }
      }

      .localizacao {
        font-size: x-small;
      }

      .period-date {
        font-size: x-small;
      }
    } */
  }
</style>
