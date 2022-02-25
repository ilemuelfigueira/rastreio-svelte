<script>
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  import { toast } from '../stores/toast.ts';

  export let themes = {
    danger: '#b00020',
    success: '#23c961',
    warning: '#ff8c42',
    info: '#006cff',
    default: '#ddd',
  };

  export let position = 'bottom-center';
</script>

<div class={`notifications ${position}`}>
  {#each $toast as notification (notification.id)}
    <div
      animate:flip
      class="toast"
      style="background: {themes[notification.type]};"
      transition:fade
    >
      <div class="content">{notification.message}</div>
      {#if notification.icon}<i class={notification.icon} />{/if}
    </div>
  {/each}
</div>

<style type="text/scss">
  .notifications {
    position: fixed;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;

    &.top-left {
      top: 5rem;
      left: 3rem;
    }

    &.top-center {
      top: 5rem;
      left: 0;
      right: 0;
    }

    &.top-right {
      top: 5rem;
      right: 3rem;
    }

    &.bottom-left {
      bottom: 1rem;
      left: 3rem;
    }

    &.bottom-center {
      bottom: 1rem;
      left: 0;
      right: 0;
    }

    &.bottom-right {
      bottom: 1rem;
      right: 3rem;
    }
  }

  .toast {
    flex: 0 0 auto;
    margin-bottom: 10px;
    border-radius: var(--br);
  }

  .content {
    padding: 10px;
    display: block;
    color: white;
    font-weight: 500;
  }
</style>
