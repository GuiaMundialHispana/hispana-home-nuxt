<template>
  <section class="lg:px-16 md:px-8 px-4">
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
    <OnClickOutside @trigger="showFilters = false" :class="{'hidden': !showFilters, 'flex' : showFilters}" class="filters-overflow">
      <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
        <MoleculesFilterStatusProperties class="filterStatus-tabs-sm" />
        <MoleculesSearchFiltersBar @send-properties="getFilterResults" />
        <button class="search-button" @click="searchProperties(); showFilters = !showFilters">
          <p class="xl:hidden mr-3 font-semibold">Buscar propiedades</p>
          <AtomsIcon name="general/search" :size=17  />
        </button>
      </div>
    </OnClickOutside>
    <div class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black">
        <span class="text-primary-100 font-semibold">
          {{ testProperty[0].length }} resultados
        </span> encontrados
      </p>
      <!-- <div>
        <label for="filter" class="text-black mr-2">Ordena por:</label>
        <select name="filter" class="appearance-none text-primary-100 focus:outline-none cursor-pointer px-2">
          <option value="">Más recientes</option>
          <option value="">Mas Baratas</option>
        </select>
      </div> -->
    </div>
    <div class="mt-8 pb-14">
      <ul class="property-list">
        <li v-for="property in testProperty[0] " :key="property">
          <MoleculesProperty :is-favorite="false" :property="property" />
        </li>
      </ul>
      <div v-if="pending">
        <h6 class="text-4xl text-blue-100 font-bold mb-4 text-center">No hemos encontramos propiedades <br/>con estos resultados</h6>
      </div>
      <div v-if="testProperty[0].length === 0">
        <figure class="mb-4">
          <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
        </figure>
        <h6 class="text-4xl text-blue-100 font-bold mb-4 text-center">No hemos encontramos propiedades <br/>con estos resultados</h6>
        <div class="flex justify-center mb-4">
          <AtomsButtons class="mx-auto">Borrar filtros</AtomsButtons>
        </div>
      </div>
      <!-- Pagination -->
      <!-- <ul class="flex items-center gap-2 mt-16 justify-center">
        <li>
          <AtomsButtons
            class="navigation-button"
            btn-style="outline-gray"
            btn-type="btn-icon"
            icon-name="arrows/arrow-left"
            :icon-size=15
          />
        </li>
        <li v-for="page in 5" :key="page" class="navigation-button">
          {{page}}
        </li>
        <li>
          <AtomsButtons
            class="navigation-button"
            btn-style="outline-gray"
            btn-type="btn-icon"
            icon-name="arrows/arrow-right"
            :icon-size=15
          />
        </li>
      </ul> -->
    </div>
  </section>
</template>

<script setup>
import { OnClickOutside } from '@vueuse/components';
const config = useRuntimeConfig();
const route = useRoute();
let test = ref(null);
let testProperty = reactive([]);
let showFilters = ref(false)
const viewport = useViewport();

const { data, pending } = await useFetch('advertisements/search', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_data) => _data.results.data,
  query: route.query
});
testProperty.push(data.value);

function getFilterResults(e) {
  test = e;
}

async function searchProperties() {
  const { data } = await useFetch('advertisements/search?type=All', {
    method: 'GET',
    baseURL: config.public.API,
    transform:(_data) => _data.results.data,
    query: test
  })
  testProperty.splice(0,1);
  testProperty.push(data.value);
};
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

.navigation-button {
  @apply rounded-sm cursor-pointer hover:text-neutral-white hover:font-bold hover:bg-primary-100 !important;
  &.active { @apply text-neutral-white font-bold bg-primary-100 !important; }
}

.filters-overflow {
  @apply w-full sm:w-fit h-full xl:mt-12 2xl:h-fit top-0 absolute xl:relative xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white right-0 2xl:mr-0 mt-0 px-4 md:px-6 md:py-12 xl:p-0 py-4 xl:py-0 z-[80] xl:z-10;
  @media (max-width:992px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300;
  }

  @media (max-width:720px) {
    @apply border-l-0;
  }
}
</style>