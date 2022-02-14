<script lang="ts">
  import { objectList, status } from '../stores/object';
  import { getObjectsFromEmail, isSigned, userStore } from '../supabase.client';

  async function getObjects() {
    const { data, error } = await getObjectsFromEmail($userStore.email);

    if (error) {
      alert('erro ao buscar por objetos do usuário');
    }

    const response = data[0].j;

    console.log('objetos', response);

    objectList.set(response);
    status.set('success');
  }

  $: if (!Boolean($objectList) && $isSigned) {
    getObjects();
  }
</script>

{#if $objectList !== undefined && $status === 'success'}
  {#each $objectList as object}
    <span>{object.codigo}</span>
  {/each}
{:else if $status === 'loading'}
  <span>Carregando</span>
{:else if $status === 'error'}
  <span>Erro ao carregar objetos</span>
{/if}
