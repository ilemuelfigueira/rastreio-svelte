<script lang="ts">
  export let value: string;
  export let placeholder: string;
</script>

<input type="text" bind:value {placeholder} />

<style type="text/scss">
  input {
    border: 1px solid var(--border-inactive);
    padding: 5px;
    outline: none !important;

    border-radius: 5px;

    font-weight: 600;

    width: 100%;

    background: var(--background);

    &::placeholder {
      font-size: small;
      font-weight: 500;
    }

    &:hover {
      border: 1px solid var(--input-hover);
    }

    &:focus {
      border: 1px solid var(--input-focus);
      background: var(--background-content);
    }
  }
</style>
