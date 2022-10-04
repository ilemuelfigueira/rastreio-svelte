<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Writable } from 'svelte/store';
  import Button from './button.svelte';
  import Loading from './loading.svelte';

  export let isOpen: Writable<boolean>;

  export let isConfirming = false;

  export let title = 'Modal title';

  const dispatch = createEventDispatcher();

  function confirm() {
    dispatch('confirm');
  }

  function cancel() {
    dispatch('cancel');
  }
</script>

{#if $isOpen}
  <div id="modal">
    <div class="content">
      <div class="header">
        <span>{title}</span>

        <button class="close-button" on:click={() => cancel()}>
          <i class="ph-x-circle"></i>
        </button>
      </div>
      <div class="body">
        <slot name="body" />
      </div>
      <div class="footer" loading={isConfirming ? 'S' : 'N'}>
        {#if isConfirming}
          <Loading />
        {:else}
          <Button on:click={() => cancel()}>Cancelar</Button>
          <Button on:click={() => confirm()}>Confirmar</Button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style type="text/scss">

  .content {
    background: var(--background);

    border-radius: var(--br) !important;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .content .header :first-child {
    margin-right: 1rem;
  }

  .content .header .close-button:hover {
    transform: scale(1.2);
    fill: var(--input-error);
  }

  .content .header .close-button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: x-large;
    cursor: pointer;
  }

  .content .body {
    width: 100%;
    padding: 1rem;
    border-radius: 0 0 var(--br) var(--br);

    background: var(--background-content);
  }

  .content .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 1rem;
    border-radius: var(--br) var(--br) 0 0;

    background: var(--background);
  }

  .footer button {
    width: 100%;
  }

  .footer button:first-child:hover {
    color: var(--input-error);
  }

  .footer button:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    background: white;
    color: #000;

    border-right: 0;
  }

  .footer button:last-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    border-left: 0;
  }

  .footer[loading='S'] {
      padding: 0.5rem;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 0;
    margin-top: 0;

    background: var(--secondary);

    border-radius: 0 0 var(--br) var(--br);
  }

  #modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 4/3;
  }
</style>
