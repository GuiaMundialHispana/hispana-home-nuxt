<template>
  <section>
    <!-- No results -->
    <div v-if="!test">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-blue-100 font-bold mb-4 text-center">Aún no publicas
        <span class="text-primary-100">nada.</span>
      </h6>
      <div class="flex justify-center mb-4">
        <AtomsLink link-to="/postProperty" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="test" class="ads">
      <nav class="flex gap-3 mb-14 flex-wrap md:flex-row flex-col">
        <AtomsButtons
          v-for="(item, index) in status"
          :key="item"
          btn-size="small"
          btn-style="outline-gray"
          :class="[{ active: tab === index}]"
          class="md:w-full md:max-w-[230px]"
          @click="checkAdvertisement(item,index)"
        >
          Anuncios {{item}}
        </AtomsButtons>
      </nav>
      <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios {{selectedTab}}</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="item in propertys" :key="item">
          <MoleculesProperty
            :property="item.property"
            v-if="selectedTab === 'revision' && item.status === 'revision'"
          />
          <MoleculesProperty
            :property="item.property"
            v-if="selectedTab === 'activos' && item.status === 'activos'"
          />
          <MoleculesProperty
            :property="item.property"
            v-if="selectedTab === 'rechazados' && item.status === 'rechazados'"
          />
          <MoleculesProperty
            :property="item.property"
            v-if="selectedTab === 'borrados' && item.status === 'borrados'"
          />
          <MoleculesProperty
            :property="item.property"
            v-if="selectedTab === 'expirados' && item.status === 'expirados'"
          />
        </li>
      </ul>
      <div class="flex justify-center my-8">
        <AtomsLink link-to="/postProperty" class="mx-auto">Crear un anuncio</AtomsLink>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/User';
export default {
  name: 'Advertisement',
  data() {
    return {
      tab: 0,
      selectedTab: 'activos',
      status: [
        'activos',
        'expirados',
        'revision',
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
    checkAdvertisement(value,index) {
      console.log(value)
      this.tab = index;
      this.selectedTab = value;
    },
    async getAdvertisement() {
      const {data} = await useFetch(this.$config.public.API+'advertisements',{
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
      });
      const res = data._value.results;
      console.log(res)
      for(item in res) {
        console.log(res)
      }
      // console.log( res)
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
.ads {
  & nav {
    & .btn {
      @apply flex-grow justify-between border-2 hover:border-primary-100 text-neutral-black;
      & span { @apply w-6 h-6 flex items-center justify-center rounded-full font-medium text-sm bg-[#F5F5F5] text-[#ADADAD]; }
      &.active {
        @apply bg-primary-100 text-neutral-white border-primary-100 hover:text-neutral-black !important;
        & span { @apply text-primary-100 bg-primary-50; }
      }
    }
  }
}

</style>