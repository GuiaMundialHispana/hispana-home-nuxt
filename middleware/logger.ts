import { useUserStore } from '~/stores/User';
const user = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
  if(!user.isLoggedIn) {
    return navigateTo('/')
  }
})