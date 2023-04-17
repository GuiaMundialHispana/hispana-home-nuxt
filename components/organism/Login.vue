<template>
  <div class="flex flex-col w-full  items-center justify-center">
    <div class="relative w-full">
      <input placeholder="Correo electrónico" type="email" v-model="email">
      <AtomsIcon
        name="general/user"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <div class="relative w-full">
      <input placeholder="Contraseña" type="password" v-model="password">
      <AtomsIcon
        name="general/lock"
        :size=14
        class="absolute text-primary-100 z-50 top-1/4 left-2"
      />
    </div>
    <NuxtLink to="/forgotPassword" @click="$emit('close')" class="text-primary-100 ml-auto w-max block">Olvidé la contraseña</NuxtLink>
    <AtomsButtons btn-size="medium" @click="login()">
      Entrar
    </AtomsButtons>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '~/stores/User';
export default {
  data() {
    return {
      user: useUserStore(),
      auth: {},
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const { data, pending }  = await useFetch(this.auth.API+'auth/login',{
        method: 'POST',
        body: {
          email: this.email,
          password: this.password
        }
      });

      try {
        const res = data.value.results;
        if(pending) { this.$swal.showLoading(); }
        this.$swal({
          icon: 'success',
          text: 'Bienvenido',
          showConfirmButton: false,
          timer: 2000
        });
        this.user.isLoggedIn = true;
        this.user.token = res.access_token.original.access_token;
        useRouter().push("/profile");
        this.$emit('close');
      } catch (error) {
        this.$swal({
          icon: 'error',
          text: 'Confirma que tus datos esten correctos'
        });
      }
    }
  },
  created() {
    this.auth = useRuntimeConfig();
    console.log(this.user.auth.API)
    console.log(this.auth.API)
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-sm mt-6 !important;
}
input {
  @apply w-full mb-2 border border-gray-100 rounded-sm placeholder:text-center focus:outline-primary-100 h-10 px-8 py-2;
}
</style>