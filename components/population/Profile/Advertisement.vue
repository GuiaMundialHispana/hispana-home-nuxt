<template>
  <section>
    <!-- No results -->
    <div v-if="!advertisement">
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
    <!-- Results -->
    <div v-if="advertisement" class="ads">
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
      <div v-if="tab === 0">
        <div v-if="actives.length > 0">
          <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios Activos</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in actives" :key="item">
              <MoleculesProperty
                :property="item.property"
                :property-id="item.id"
              />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="actives.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-blue-100 font-bold mb-4 text-center">No tienes anuncios activos</h6>
        </div>
      </div>
      <div v-if="tab === 1">
        <div v-if="expired.length > 0">
          <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios Expirados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in expired" :key="item">
              <MoleculesProperty
                :property="item.property"
                :property-id="item.id"
              />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="expired.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-blue-100 font-bold mb-4 text-center">No tienes anuncios expirados</h6>
        </div>
      </div>
      <!--  -->
      <div v-if="tab === 2">
        <div v-if="revision.length > 0">
          <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios en revision</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in revision" :key="item">
              <MoleculesProperty :property="item.property" :property-id="item.id" />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="revision.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-blue-100 font-bold mb-4 text-center">No tienes anuncios en revision</h6>
        </div>
      </div>
      <!--  -->
      <div v-if="tab === 3">
        <div v-if="rejected.length > 0">
          <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios rechazados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in rejected" :key="item">
              <MoleculesProperty :property="item.property" :property-id="item.id" />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="rejected.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-blue-100 font-bold mb-4 text-center">No tienes anuncios rechazados</h6>
        </div>
      </div>
      <!--  -->
      <div v-if="tab === 4">
        <div v-if="inactive.length > 0">
          <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] md:mb-12 mb-5">Anuncios borrados</h3>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <li v-for="item in inactive" :key="item">
              <MoleculesProperty :property="item.property" :property-id="item.id" />
            </li>
          </ul>
        </div>
        <div class="empty-state" v-if="inactive.length <= 0">
          <figure class="mb-4">
            <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
          </figure>
          <h6 class="text-xl text-blue-100 font-bold mb-4 text-center">No tienes anuncios borrados</h6>
        </div>
      </div>
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
      advertisement: false,
      propertys: [],
      auth: '',
      actives: [],
      expired: [],
      revision: [],
      rejected: [],
      inactive: []
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
      for (let i = 0; i < res.length; i++) {
        const objeto = res[i];
        
        // Aplica tu condición aquí
        if (objeto.status === 'active') {
          this.actives.push(objeto);
        }
        if(objeto.status === 'expired') {
          this.expired.push(objeto)
        }
        if(objeto.status === 'revision') {
          this.revision.push(objeto)
        }
        if(objeto.status === 'rejected' || objeto.status === 'rechazado') {
          this.rejected.push(objeto)
        }

        if(objeto.status === 'inactive' || objeto.status === 'borrados') {
          this.inactive.push(objeto)
        }
      }
      
      if(res.length > 0) {
        this.propertys = res;
        this.advertisement = true;
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


<!-- <template>
  <section>
    {{ actives }}
  </section>
</template>


<script setup>
import { useUserStore } from '~/stores/User';
const config = useRuntimeConfig();
const user = useUserStore();
let actives = ref([]);
let expired = [];
let revision = [];
let rejected = [];
let inactive = [];


const { data: properties, pending, error} = await useFetch('advertisements', {
  headers: {
    'Authorization': 'Bearer ' + user.token,
  },
  method: 'GET',
  baseURL: config.public.API,
  transform:(_properties) => _properties.results
});

function test() {
  console.log(properties)
  for (let i = 0; i < properties.length; i++) {
    const objeto = res[i];
    console.log(objeto)
    
    // Aplica tu condición aquí
    if (objeto.status === 'active') {
      // actives.push(objeto);
      // console.log(objeto)
    }
    if(objeto.status === 'expired') {
      expired.push(objeto)
    }
    if(objeto.status === 'revision') {
      revision.push(objeto)
    }
    if(objeto.status === 'rejected' || objeto.status === 'rechazado') {
      rejected.push(objeto)
    }

    if(objeto.status === 'inactive' || objeto.status === 'borrados') {
      inactive.push(objeto)
    }
  }
}
test()
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

</style> -->