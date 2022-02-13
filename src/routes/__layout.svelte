<script>
  import AiFillHome from 'svelte-icons-pack/ai/AiFillHome';
  import HomeButton from '../components/homebutton.svelte';
</script>

<main>
  <nav>
    <HomeButton text="Rastreio" src={AiFillHome} href="/" />
  </nav>
  <section class="page">
    <slot />
  </section>
</main>

<style type="text/scss">
  @import '../styles/global.scss';

  nav {
    display: flex;
    /* position: sticky; */
    position: relative;
    /* top: 0; */

    width: 100%;
    height: 4rem;

    padding: 0 1rem;

    background: var(--background);
    box-shadow: var(--lm-shadow-inactive);
    z-index: 1;
  }

  .page {
    padding: 1rem;
    background: var(--background);

    width: 100%;
    min-height: 100vh;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
