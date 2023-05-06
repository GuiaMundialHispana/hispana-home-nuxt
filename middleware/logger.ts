import { useUserStore } from '~/stores/User';
import Swal from 'sweetalert2';

const user = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
  if(!user.isLoggedIn) {
    Swal.fire({
      icon: 'error',
      text: 'Debes iniciar sesion',
      showConfirmButton: false,
      timer: 3000
    });
    return navigateTo('/')
  }
})