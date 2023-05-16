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

<script setup>
import { useAuthStore } from '~/stores/Auth';
import { useUserStore  } from '~/stores/User';
import Swal from 'sweetalert2';
const isAuthenticated = ref('');
const auth = useAuthStore();
const user = useUserStore();
const config = useRuntimeConfig();

onMounted(() => {
  // Obtener el token de localStorage al cargar la página
  isAuthenticated.value = window.localStorage.getItem('token');
  
  if(isAuthenticated.value != null) {
    Swal.fire({
      icon: 'success',
      text: 'Bienvenido',
      showConfirmButton: false,
      timer: 3000
    });
    auth.token = isAuthenticated.value;
    async function getProfile() {
      const data = await $fetch('auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + isAuthenticated.value
        },
        baseURL: config.public.API
      });
      const res = data.results.user;
      user.userData = res;
    }
    getProfile();
    auth.isLoggedIn = true;
  } else {
    auth.isLoggedIn = false;
  }
  // final del script
});
</script>