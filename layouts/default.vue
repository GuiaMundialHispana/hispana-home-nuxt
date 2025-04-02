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
console.log(isLogged.value);

onMounted(() => {
  const interval = setInterval(() => {
    if(isLogged.value) {
      refresh_token()
    }
  }, 60000); // 2 minutes

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>