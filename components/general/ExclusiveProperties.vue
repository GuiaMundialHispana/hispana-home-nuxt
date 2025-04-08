<template>
  <GeneralSkeletonProperty v-if="isPending" />
  <section v-if="!isPending && properties">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] leading-8 text-center md:text-left mx-auto md:mx-0 font-medium">
        Propiedades Exclusivas
      </h2>
      <nav class="hidden md:flex gap-4" v-if="properties.length >= 4">
        <AtomsButtons class="prevExcl" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-left" btn-size="xsmall" :icon-size=15 />
        <AtomsButtons class="nextExcl" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-right" btn-size="xsmall" :icon-size=15 />
      </nav>
    </div>
    <Swiper
      :modules="[SwiperFreeMode, SwiperNavigation, SwiperAutoplay]"
      :effect="'fade'"
      :lazy="true"
      :space-between="32"
      slides-per-view="auto"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.nextExcl',
        prevEl: '.prevExcl'
      }"
    >
      <swiper-slide v-for="(property, index) in properties" :key="index">
        <GeneralFeaturedProperties :property-id="property.id" plantype="exclusive" :property="property.property" />
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  properties: {
    type: Array,
    required: true
  },
  pending: {
    type: String,
    required: true
  },
});

const isPending = computed(() => {
  return props.pending === 'pending' || props.pending === 'iddle'
})
</script>

<style lang="postcss" scoped>
section { @apply pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]; }
.swiper-slide { @apply md:w-max; }
</style>