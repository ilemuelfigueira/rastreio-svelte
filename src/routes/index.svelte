<script>
  function onClick() {
    console.log('clicked');
  }
</script>

<main>
  <h1>Hello</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>

<button class="global-button" on:click={() => onClick()}> OK </button>

<style type="text/scss">
  @import '../styles/global.scss';
</style>
