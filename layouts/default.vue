<template>
  <div>
    <NuxtLoadingIndicator />
    <GeneralHeader />
    <main class="lg:pt-[102px] pt-16">
      <slot />
    </main>
    <GeneralFooter />
  </div>
</template>

<script setup lang="ts">
import useRefresh from '~/composables/RefreshToken';

const isLogged = useState<boolean>('isLogged', () => false);
const { refresh_token } = useRefresh();
const route = useRoute();
const refer = useState<string>('refer', () => '');

if(import.meta.client) {
  let tokenReferClient = localStorage.getItem('ref');

  if(route.query.ref) {
    localStorage.setItem('ref', route.query.ref);
    refer.value = route.query.ref;
  }

  if(tokenReferClient) {
    refer.value = tokenReferClient;
  }
}

setInterval(async () => {
  if (isLogged.value) {
    console.log('Refreshing token...');
    await refresh_token();
  }
}, 120000);

onMounted(() => {
  const handleBeforeUnload = () => {
    localStorage.removeItem('ref');
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
});
</script>