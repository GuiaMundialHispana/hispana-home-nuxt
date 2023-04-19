<template>
  <section class="lg:px-16 md:px-8 px-4">
    <!--  -->
    <MoleculesSearchFiltersBar />
    <div class="flex items-center justify-between mt-8 2xl:mt-11 text-sm font-normal">
      <p class="text-neutral-black"><span class="text-primary-100 font-semibold">{{ total }} resultados</span> encontrados</p>
      <div>
        <label for="filter" class="text-black mr-2">Ordena por:</label>
        <select name="filter" class="appearance-none text-primary-100 focus:outline-none cursor-pointer px-2">
          <option value="">Más recientes</option>
          <option value="">Mas Baratas</option>
        </select>
      </div>
    </div>
    <!-- <PopulationSearchFeatured /> -->
    <PopulationSearchProperties />
  </section>
</template>

<script setup>
const {data: item } = await useFetch(useRuntimeConfig().API+'properties',{
  method: 'get'
});
let total = item._value.results.total
</script>

<style lang="postcss" scoped>
.swiper-slide {
  @apply flex-none w-[350px] !important;
}
</style>