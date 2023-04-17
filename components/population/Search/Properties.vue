<template>
  <!-- Featured propertys -->
  <div class="mt-20 pb-14">
    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <li v-for="slide in 10" :key="slide">
        <!-- <MoleculesProperty /> -->
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
</template>
<script>
export default {
  name: 'SearchProperty'
}
</script>

<style lang="postcss" scoped>
.navigation-button {
  @apply rounded-sm cursor-pointer hover:text-neutral-white hover:font-bold hover:bg-primary-100 !important;
  &.active { @apply text-neutral-white font-bold bg-primary-100 !important; }
}
</style>