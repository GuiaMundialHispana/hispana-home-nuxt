<template>
  <section class="lg:px-16 md:px-8 px-4">
    <!--  -->
    <MoleculesSearchFiltersBar @submit="getSubmite" />
    <!-- <div class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black"><span class="text-primary-100 font-semibold">{{ total }} resultados</span> encontrados</p>
      <div>
        <label for="filter" class="text-black mr-2">Ordena por:</label>
        <select name="filter" class="appearance-none text-primary-100 focus:outline-none cursor-pointer px-2">
          <option value="">Más recientes</option>
          <option value="">Mas Baratas</option>
        </select>
      </div>
    </div> -->
    <div class="mt-20 pb-14">
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <li v-for="property in properties" :key="property">
          <MoleculesProperty :is-favorite="false" :property="property" />
        </li>
      </ul>
      <!-- Pagination -->
      <ul class="flex items-center gap-2 mt-16 justify-center">
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
      </ul>
    </div>
  </section>
</template>

<script setup>
// const {data: item } = await useFetch(useRuntimeConfig().API+'properties',{
//   method: 'get'
// });
// let total = item._value.results.total;

function getSubmite(e) {
  console.log(e)
}

let properties = ref({});
const {data: item } = await useFetch(useRuntimeConfig().API+'properties',{
  method: 'get'
});
properties = item._value.results.data;
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply flex-none w-[350px] !important;
}
.navigation-button {
  @apply rounded-sm cursor-pointer hover:text-neutral-white hover:font-bold hover:bg-primary-100 !important;
  &.active { @apply text-neutral-white font-bold bg-primary-100 !important; }
}
</style>