<script lang="ts">
  import Icon from 'svelte-icons-pack';

  export let text: string;
  export let src: any;
  export let href: string;

  function redirect(url: string) {
    const location = window.location.pathname;

    if (location === url) return;

    window.location.href = url;
  }
</script>

<div class="home" on:click={() => redirect(href)}>
  <Icon className="info-icon" {src} />
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
        font-size: 1.5rem;
        fill: var(--text-primary);
      }

      .text {
        font-size: 1.3rem;
        color: var(--text-primary);
      }

      &:hover {
        .text {
          color: var(--text-primary-hover);
          background: var(--bg-primary-hover);
          opacity: var(--mid-opacity);
        }
      }
    }
  }
</style>
