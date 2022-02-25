<div />

<style type="text/scss">
  div {
    min-width: 2rem;
    aspect-ratio: 1/1;
    border-radius: 50%;

    position: relative;
    animation: animate 2s linear infinite;

    border: 5px solid var(--primary);
    border-top-color: var(--text);
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
