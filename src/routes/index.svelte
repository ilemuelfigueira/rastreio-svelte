<script lang="ts">
  import Rastreio from '../components/rastreio.svelte';
</script>

<main>
  <Rastreio />
</main>

<style type="text/scss">
  @import '../styles/global.scss';

  main {
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 80vh;
  }
</style>
