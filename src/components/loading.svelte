<div />

<style type="text/scss">
  div {
    min-width: 2rem;
    aspect-ratio: 1/1;
    background: linear-gradient(45deg, transparent, transparent 45%, var(--secondary));
    border-radius: 50%;

    position: relative;
    animation: animate 2s linear infinite;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  div:before {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
    bottom: 0.2rem;
    background: var(--primary);
    border-radius: 50%;
    z-index: 1000;
  }
  div:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, transparent 45%, var(--secondary));
    border-radius: 50%;
    z-index: 1;
    filter: blur(0.5rem);
  }
</style>
