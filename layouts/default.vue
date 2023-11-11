<template>
  <div>
    <NuxtLoadingIndicator />
    <OrganismHeader />
    <main class="lg:pt-[102px] pt-16">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';
import { useUserStore } from '~/stores/User';

export default {
  setup() {
    const user_store = useUserStore();
    const miFuncionGlobal = () => {
      user_store.refresh_token();
    }

    onMounted(() => {
      useRefresh(miFuncionGlobal)
    })
  },
}
</script>