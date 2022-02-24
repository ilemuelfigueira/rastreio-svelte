<script lang="ts">
  export let value: string;
  export let placeholder: string;
  export let password: boolean = false;
</script>

{#if !password}
  <input type="text" bind:value {placeholder} />
{:else if password}
  <input type="password" bind:value {placeholder} />
{/if}

<style type="text/scss">
  input {
    border: 2px solid var(--border-inactive);
    padding: 5px;
    outline: none !important;

    border-radius: 5px;

    font-weight: 600;

    width: 100%;

    background: var(--input-background);
    filter: brightness(0.9);

    &::placeholder {
      font-size: small;
      font-weight: 500;
    }

    &:hover {
      /* border: 1px solid var(--input-hover); */
      border-color: var(--input-hover);
    }

    &:focus {
      /* border: 1px solid var(--input-focus); */
      border-color: var(--input-focus);
      filter: brightness(1);
    }
  }
</style>
