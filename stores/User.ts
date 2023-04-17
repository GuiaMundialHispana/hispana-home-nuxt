import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      userData: {
        id: Number,
        name: '',
        lastname: '',
        birthdate: '',
        country_id: Number,
        cellphone: Number,
        phone: Number,
        email: '',
        profile_pic: null
      },
      token: '',
      auth: useRuntimeConfig(),
      getEmail: '',
      nextStep: false,
      emailPassword: '',
      passwordToken: '',
      newPassword: '',
      repeatPassword: ''
    }
  },
  actions: {
    async getProfile(){
      const { data }  = await useFetch(this.auth.API+'auth/profile',{
        method: 'POST',
        body: {
          token: this.token
        }
      });
      const res = data.value.results.user;
      this.userData = res;
    },
    async getGoogle(){
      const { data,error }  = await useFetch(this.auth.API+'auth/social/google',{
        method: 'GET',
        headers: {
          'access-control-allow-origin': "*",
          'Content-Type':"application/json",
          'Accept': "application/json",
        }

      });
      const res = error;
      console.log(res)
      const res2 = data;
      console.log(res2)
    },
    async logOut() {
      await useFetch(this.auth.API+'auth/logout',{
        method: 'POST',
        body: {
          token: this.token
        }
      });
      this.isLoggedIn = false;
      useRouter().push("/")
    },
    async sendPassWordEmail() {
      const { data, pending } = await useFetch(this.auth.API+'auth/forgot-password',{
        method: 'POST',
        body: {
          email: this.getEmail
        },
        onResponseError({ request, response, options }) {
          const res = response._data;
          Swal.fire({
            icon: 'error',
            text: res.message,
            showConfirmButton: false,
            timer: 3000
          });
        },
      });
      if(data.value.status === true ) {
        this.nextStep = true;
        Swal.hideLoading();
      }
    },
    async changePassword() {
      const { data }  = await useFetch(this.auth.API+'auth/change-password',{
        method: 'POST',
        body: {
          email: this.emailPassword,
          password: this.newPassword,
          password_confirmation: this.repeatPassword,
          token: this.token
        }
      });

      if(data) {
        Swal.fire({
          icon: 'success',
          title: 'Hemos validado tus datos correctamente, intenta acceder otra vez',
          timer: 3000
        })
        useRouter().push("/");
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}