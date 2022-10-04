<script lang="ts">

  export let text: string;
  export let href: string;

  async function redirect(url: string) {
    const location = window.location.pathname;

    if (location === url) return;

    window.location.href = url;
  }
</script>

<div class="home" on:click={() => redirect(href)}>
  <i class="ph-house"></i>
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

      i {
        font-size: x-large;
        fill: var(--text);
        stroke: var(--text);
        color: var(--text);
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
