<template>
  <section>
    <div v-if="!favorite">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-blue-100 font-bold mb-8 text-center">Aún no tienes <span class="text-primary-100">publicaciones favoritas.</span></h6>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="favorite">
      <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] mb-5">Mis Favoritos</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="property in properties" :key="property">
          <MoleculesProperty :property="property" :is-favorite="true" @propertyChanged="getFavorites" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/User';
export default {
  name: 'Favorite',
  data() {
    return {
      user:useUserStore(),
      favorite: false,
      properties: {},
      auth: ''
    }
  },
  methods: {
    // TODO no agregar favoritos con el mismo id
    async getFavorites() {
      const {data} = await useFetch(this.auth.API+'users/favorites',{
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
      });
      const res = data._value.results;
      if(res.length > 0) {
        this.favorite = true;
        this.properties = res;
      }
    }
  },
  created() {
    this.auth = useRuntimeConfig();
    this.getFavorites();
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @apply flex-grow justify-between border-2 hover:border-primary-100 text-neutral-black;
  & span { @apply w-6 h-6 flex items-center justify-center rounded-full font-medium text-sm bg-[#F5F5F5] text-[#ADADAD]; }
  &.active {
    @apply bg-neutral-transparent hover:text-neutral-black !important;
    & span { @apply text-primary-100 bg-primary-50; }
  }
}
</style>