<template>
  <section>
    <!-- No results -->
    <div v-if="!test">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-blue-100 font-bold mb-8 text-center">Aún no publicas <span class="text-primary-100">nada.</span></h6>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="test">
      <div class="flex gap-3 mb-14 flex-wrap md:flex-row flex-col">
        <AtomsButtons
          v-for="(item, index) in advertisimentStatus"
          :key="item"
          btn-size="small"
          btn-style="outline-gray"
          :class="[{ active: tab === index}]"
          class="md:max-w-[270px]"
          @click="checkAdvertisement(item)"
        >
          Anuncios {{item}} <span>3</span>
        </AtomsButtons>
      </div>
      <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios {{selectedTab}}</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="slide in 10" :key="slide">
          <!-- <MoleculesProperty /> -->
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
// TODO advertisimentStatus creo que podemos ponerlo en un js aparte para no repetir codigo en todos los tabs
import { useUserStore } from '~/stores/User';
export default {
  name: 'Advertisement',
  data() {
    return {
      tab: 0,
      selectedTab: 'activos',
      advertisimentStatus: [
        'activos',
        'expirados',
        'en revision',
        'rechazados',
        'borrados'
      ],
      user:useUserStore(),
      test: false,
      propertys: [],
      auth: ''
    }
  },
  methods: {
    checkAdvertisement(value) {
      this.tab = value.index;
      this.selectedTab = value;
      //aqui haremos el fetch para cada vez que le den click enviarle al endpoint el parametro que recivimos
    },
    async getAdvertisement() {
      const {data} = await useFetch(this.$config.public.API+'advertisements',{
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
      });
      const res = data._value.results;
      
      if(res.length > 0) {
        this.propertys = res;
        this.test = true;
      }
    }
  },
  created() {
    this.getAdvertisement();
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