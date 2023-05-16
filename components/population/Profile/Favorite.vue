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
      <h3 class="font-semibold text-sm text-black md:text-[28px] md:leading-[42px] mb-5">Mis Favoritos</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="item in properties" :key="item">
          <MoleculesProperty 
            :property="item.property"
            :property-id="item.id"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "~/stores/Auth";
export default {
  data() {
    return {
      auth: useAuthStore(),
      config: useRuntimeConfig(),
      favorite: false,
      properties: []
    }
  },
  methods: {
    async getFvorites() {
      const data = await $fetch('users/favorites',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        baseURL: this.config.public.API
      });
      this.properties = data.results;
      this.properties.length > 0 ? this.favorite = true : this.favorite = false;
    }
  },
  beforeMount() {
    this.getFvorites();
  }
}
</script>

<!-- <script setup>
import { useAuthStore } from "~/stores/Auth";

let config = useRuntimeConfig();
let favorite = ref(false);
let properties = ref([]);
const auth = useAuthStore();

async function getFvorites() {
  const item = await $fetch('users/favorites', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    baseURL: config.public.API
  });
  properties = item.results;
  properties.length > 0 ? favorite = true : favorite = false;
}



getFvorites();
</script> -->

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