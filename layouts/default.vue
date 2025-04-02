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
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';
import { useUserStore } from '~/stores/User';
import { useAuthStore  } from '~/stores/Auth';

const user_store = useUserStore();
const auth_store = useAuthStore();
const isLogged = useState<boolean>('isLogged', () => false);
const token = useState<string>('token', () => '');

const miFuncionGlobal = () => {
  if(auth_store.isLoggedIn) {
    user_store.refresh_token();
  }
}

onMounted(() => {
  useRefresh(miFuncionGlobal)
})
</script>