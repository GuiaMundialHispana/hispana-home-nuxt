import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state:() => {
    return {
      isLoggedIn: false,
      email: '',
      password: '',
      config: useRuntimeConfig(),
      token: '',
      route: useRouter(),
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}