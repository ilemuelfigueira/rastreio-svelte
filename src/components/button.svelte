<script lang="ts">
  import Loading from './loading.svelte';

  export let icon: string = '';

  export let status: string = '';

  $: if (status === 'error')
    setTimeout(() => {
      status = '';
    }, 2000);
</script>

<button on:click>
  {#if status === 'loading'}
    <Loading />
  {:else if status === 'error'}
<!--    <Icon className="icon" src={BiErrorCircle} />-->
    <i class="ph-warning-circle"></i>
  {:else if icon === 'x'}
<!--    <Icon className="icon" src={HiSolidXCircle} />-->
    <i class="ph-x-circle"></i>
  {:else}
    <slot />
  {/if}
</button>

<style type="text/scss">
  button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;

    font-family: 'Poppins', sans-serif;

    border: 1px solid #ccc;
    border-radius: var(--br);

    outline: none;

    color: var(--text);
    background: var(--secondary);

    &:hover {
      filter: brightness(0.95);
      cursor: pointer;
      transition: ease-in-out 0.2s;
    }

    &:active {
      border-color: var(--input-focus);
      transform: scale(0.9);
    }

    :global {
      .icon {
        font-size: x-large;
        fill: var(--input-error);
        stroke: var(--input-error);
      }
    }
  }
</style>
