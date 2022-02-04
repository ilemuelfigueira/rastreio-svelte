<script lang="ts">
  import RedirectIconButton from '../components/RedirectIconButton.svelte';
  import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
</script>

<main>
  <nav>
    <RedirectIconButton text="Home" src={AiFillHome} href="/" />
  </nav>

  <section class="page">
    <slot />
  </section>
</main>

<style type="text/scss">
  @import '../styles/layout.scss', '../styles/global.scss';
</style>
