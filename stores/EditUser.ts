import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User'

export const useUserEditStore = defineStore('UserEdit', {
  state: () => {
    return {
      user: useUserStore(),
      editUserData: {
        user_id: useUserStore().userData.id,
        name: useUserStore().userData.name,
        lastname: useUserStore().userData.lastname,
        birthdate: useUserStore().userData.birthdate,
        country_id: useUserStore().userData.country_id,
        cellphone: useUserStore().userData.cellphone,
        phone: useUserStore().userData.phone,
        email: useUserStore().userData.email,
        profile_pic: useUserStore().userData.profile_pic,
        oldPassword: Number,
        password:  Number,
        password_confirmation: Number,
      },
      token: '',
      auth: useRuntimeConfig(),
      images: null
    }
  },
  // name: this.editUserData.name,
  // lastname: this.editUserData.lastname,
  // profile_pic: this.editUserData.profile_pic,
  // password: this.editUserData.password,
  // password_confirmation: this.editUserData.password_confirmation,
  // phone: this.editUserData.phone,
  // cellphone: this.editUserData.cellphone,
  // birthdate: this.editUserData.birthdate,
  // country_id: 50,
  actions: {
    async updateUser() {
      const formData = new FormData();
      formData.append('file', this.images);
      await useFetch(this.auth.API+'users/update',{
        method: 'put',
        body: {
          user_id: this.editUserData.user_id,
          email: this.editUserData.email,
          name: this.editUserData.name,
          lastname: this.editUserData.lastname,
          password: this.editUserData.password,
          password_confirmation: this.editUserData.password_confirmation,
          phone: this.editUserData.phone,
          cellphone: this.editUserData.cellphone,
          birthdate: this.editUserData.birthdate,
          country_id: 50,
          profile_pic: formData,
        },
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
          'Accept': 'application/json',
        },
        onResponseError({ request, response, options }) {
          const res = response._data;
          Swal.fire({
            icon: 'error',
            text: 'Tenemos un error para validar tus datos, por favor intente mas tarde',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserEditStore, import.meta.hot))
}