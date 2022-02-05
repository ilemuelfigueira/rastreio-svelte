<script>
  import Nav from '../components/nav.svelte';
</script>

<main>
  <Nav />
  <section class="page">
    <slot />
  </section>
</main>

<style type="text/scss">
  @import '../styles/layout.scss', '../styles/global.scss';
</style>
