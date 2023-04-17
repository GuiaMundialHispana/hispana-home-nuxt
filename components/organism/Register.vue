<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="relative w-full">
      <input placeholder="Nombre" type="text" v-model="name">
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Apellido" type="text" v-model="lastname">
      <AtomsIcon name="general/user" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Correo electrónico" type="email" v-model="email">
      <AtomsIcon name="general/email-slim" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Contraseña" type="password" v-model="password">
      <AtomsIcon name="general/lock" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <div class="relative w-full">
      <input placeholder="Repite contraseña" type="password" v-model="password_confirmation">
      <AtomsIcon name="general/lock" :size=14 class="absolute text-primary-100 z-50 top-1/4 left-2" />
    </div>
    <AtomsButtons btn-size="medium"  @click="register()">
      Registrar
    </AtomsButtons>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '~/stores/User';

export default {
  data() {
    return {
      user: useUserStore(),
      name: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    async register() {
      this.$emit('close');
      const {pending, data} = await useFetch(this.user.auth.API+'auth/register',
        {
          method: 'POST',
          body: {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          },
        }
      );

      try {
        const res = data.value.results;
        if(pending) {
          this.$swal({ icon: 'success', text: 'Estamos comprobando tu informacion'});
        }
        this.$swal({
          icon: 'success',
          text: 'Hemos validados tus datos correctamente'
        });
        this.user.isLoggedIn = true;
        this.user.token = res.access_token.original.access_token;
        useRouter().push("/profile");
        this.user.getProfile();
      } catch (error) {
        this.$swal({
          icon: 'error',
          text: 'Confirma que tus datos esten correctos'
        });
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm my-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>