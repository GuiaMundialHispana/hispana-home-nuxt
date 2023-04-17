<template>
  <div class="flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none">
  <AtomsButtons
    v-for="(buttonTab,index) in tabs" :key="buttonTab"
    :class="[{active: tab === index}]"
    @click="tab = index">{{ buttonTab }}
  </AtomsButtons>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['Todos', 'Comprar', 'Alquiler'],
      tab: 0
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn { @apply  text-neutral-black border-none bg-neutral-white relative before:w-0.5 before:h-3/4 before:bg-primary-100 before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-2/4 hover:bg-primary-90 hover:text-neutral-white hover:before:hidden first:before:hidden rounded-none !important;
  &.active {
    @apply bg-primary-100 text-neutral-white before:hidden font-semibold !important;
    & + button { @apply before:hidden !important }
  }
}
</style>