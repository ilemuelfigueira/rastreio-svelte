<script lang="ts">
  import Icon from 'svelte-icons-pack';

  export let text: string;
  export let src: any;
  export let href: string;

  async function redirect(url: string) {
    const location = window.location.pathname;

    if (location === url) return;

    window.location.href = url;
  }
</script>

<div class="home" on:click={() => redirect(href)}>
  {#if src}
    <Icon className="info-icon" {src} />
  {/if}
  <span class="text">{text}</span>
</div>

<style type="text/scss">
  :global {
    .home {
      display: flex;
      align-items: center;

      cursor: pointer;
      user-select: none;
      text-align: center;

      gap: 0.3rem;

      .info-icon {
        font-size: x-large;
        fill: var(--text);
      }

      .text {
        font-size: x-large;
        color: var(--text);
      }

      &:hover {
        .text {
          filter: brightness(0.9);
        }
      }
    }
  }
</style>
