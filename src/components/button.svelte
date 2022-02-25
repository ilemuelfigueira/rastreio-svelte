<script lang="ts">
  import Loading from './loading.svelte';

  import BiErrorCircle from 'svelte-icons-pack/bi/BiErrorCircle';
  import HiSolidXCircle from 'svelte-icons-pack/hi/HiSolidXCircle';

  export let icon: string = '';

  import Icon from 'svelte-icons-pack';

  export let status: string = '';
</script>

<button on:click>
  {#if status === 'loading'}
    <Loading />
  {:else if status === 'error'}
    <Icon className="icon" src={BiErrorCircle} />
  {:else if icon === 'x'}
    <Icon className="icon" src={HiSolidXCircle} />
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
