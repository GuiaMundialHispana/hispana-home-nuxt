<template>
  <section class="lg:px-16 md:px-8 px-4 md:min-h-screen">
    <AtomsButtons
      v-show="viewport.isLessThan('xl')"
      class="mt-5 font-semibold w-full"
      icon-position="right"
      btn-style="solid-primary"
      icon-name="general/search"
      btn-size="large"
      :icon-size=18
      @click="showFilters = !showFilters"
    >Filtrar propiedades
    </AtomsButtons>
    <OnClickOutside @trigger="showFilters = false" :class="showFilterDrodown" class="filters-overflow">
      <AtomsButtons
        v-show="viewport.isLessThan('xl')"
        btn-type="btn-icon"
        icon-name="general/close"
        :icon-size=20
        btn-size="small"
        class="mr-0 ml-auto"
        @click="showFilters = false"
      />
      <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
        <GeneralPropertySearchType class="filterStatus-tabs-sm" />
        <MoleculesSearchFiltersBar @send-properties="getFilterResults" />
      </div>
    </OnClickOutside>
    <!--  Counts-->
    <div class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black">
        <span class="text-primary-100 font-semibold">
          {{ properties.length }} resultados
        </span>
        encontrados
      </p>
    </div>
    <div class="mt-8 pb-14">
      <!-- Properties-->
      <ul v-if="!isPending" class="property-list">
        <li v-for="property in propertiesVip" :key="property">
          <GeneralProperty
            property-type="vip"
            :property="property.property"
            :property-id="property.advertisement_id"
          />
        </li>
        <li v-for="property in propertiesExclusive" :key="property">
          <GeneralProperty
            property-type="exclusive"
            :property="property.property"
            :property-id="property.advertisement_id"
          />
        </li>
        <li v-for="property in propertiesSilver" :key="property">
          <GeneralProperty
            property-type="silver"
            :property="property.property"
            :property-id="property.advertisement_id"
          />
        </li>
        <li v-for="property in propertiesBasic" :key="property">
          <GeneralProperty
            :property="property.property"
            :property-id="property.advertisement_id"
          />
        </li>
      </ul>
      <!-- Skeleton-->
      <div v-else>
        <GeneralSkeletonProperty />
      </div>
      <!-- Empty Properties-->
      <div v-if="!isPending && properties.length === 0">
        <figure class="mb-4">
          <img alt="Hispana" src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
        </figure>
        <h6 class="text-4xl text-blue-100 font-bold mb-4 text-center">No hemos encontramos propiedades <br/>con estos resultados</h6>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { useAuthStore } from '~/stores/Auth';
import { useUserStore } from '~/stores/User';

const config = useRuntimeConfig();
const route = useRoute();
const viewport = useViewport();
const auth = useAuthStore();
const user_store = useUserStore();

//Mostrar propiedades
let properties = ref([]);
let propertiesVip = ref([]);
let propertiesExclusive = ref([]);
let propertiesSilver = ref([]);
let propertiesBasic = ref([]);
let showFilters = ref(false);
const createQuery = ref({});

const showFilterDrodown = computed(() => {
  return showFilters.value ? 'flex' : 'hidden';
})

function getFilterResults(e) {
  console.log(e);
  createQuery.value = e;
  createQuery.value.type = route.query.type;
}

const { data, status: properties_status } = await useLazyFetch('advertisements/search', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(data) => {
    let response = data.results.data;
    propertiesVip.value = [];
    propertiesExclusive.value = [];
    propertiesSilver.value = [];
    propertiesBasic.value = [];
    response.forEach(element => {
      if(element.plan_id === 1) propertiesVip.value.push(element)
      if(element.plan_id === 2) propertiesExclusive.value.push(element)
      if(element.plan_id === 3) propertiesSilver.value.push(element)
      if(element.plan_id === 4) propertiesBasic.value.push(element)
      properties.value.push(element)
    });
  },
  watch:[createQuery],
  query: createQuery
});

const isPending = computed(() => {
  return properties_status.value === 'pending' || properties_status.value === 'iddle'
})

const propertiesIds = ref([]);
watch(isPending,(newPending)=> {
  if(!newPending) {
    properties.value.forEach(element => {
      propertiesIds.value.push(element.properties_ids)
    })
  }
})

const routeHasQuery = useRoute().query;
if(routeHasQuery) {
  getFilterResults(routeHasQuery);
}
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply flex-none w-[350px] !important;
}

.property-list {
  @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5;
}

.search-button {
  @apply flex bg-primary-100 w-full sm:w-[230px] p-2 h-12 xl:w-10 xl:h-10 rounded-full items-center justify-center hover:bg-primary-90 border-primary-100 border flex-none text-neutral-white;
}

.filters-overflow {
  @apply w-full sm:w-fit xl:mt-12 2xl:h-fit top-0 fixed xl:relative xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white right-0 2xl:mr-0 mt-0 px-4 md:px-6 md:py-12 xl:p-0 py-4 xl:py-0 z-[80] xl:z-10;
  @media (max-width:1280px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300 h-screen;
  }

  @media (max-width:720px) {
    @apply border-l-0;
  }
}

</style>