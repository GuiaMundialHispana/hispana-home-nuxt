import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';

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
  actions: {
    async login() {
      const { data}  = await useFetch('auth/login',{
        method: 'POST',
        body: {
          email: this.email,
          password: this.password
        },
        baseURL: this.config.public.API
      });

      try {
        const res = data.value.results;
        Swal.fire({
          icon: 'success',
          text: 'Bienvenido',
          showConfirmButton: false,
          timer: 2000
        });
        //Save data in localStorage
        navigateTo('/profile?tab=anuncio')
        localStorage.setItem('token', res.access_token.original.access_token);
      } 
      catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Confirma que tus datos esten correctos'
        });
      }
    },
    async logOut() {
      await useFetch(useRuntimeConfig().API+'auth/logout',{
        method: 'POST',
        body: {
          token: localStorage.getItem('token')
        }
      });
      this.isLoggedIn = false;
      localStorage.removeItem('token')
      useRouter().push("/")
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}