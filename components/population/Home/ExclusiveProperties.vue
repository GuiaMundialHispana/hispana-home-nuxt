<template>
  <section v-if="property && property.length > 0">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] leading-8 text-center md:text-left mx-auto md:mx-0 font-medium">
        Propiedades Exclusivas
      </h2>
      <nav class="hidden md:flex gap-4">
        <AtomsButtons class="prev" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-left" btn-size="xsmall" :icon-size=15 />
        <AtomsButtons class="next" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-right" btn-size="xsmall" :icon-size=15 />
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
        nextEl: '.next',
        prevEl: '.prev'
      }"
    >
      <swiper-slide v-for="plan in property" :key="plan">
        <MoleculesFeaturedProperties :property-id="plan.id" plantype="exclusive" :property="plan.property" />
      </swiper-slide>
    </Swiper>
  </section>
  <!-- TODO Skeleton -->
  <div v-if="pending">
    cargando
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: property, pending, error} = await useFetch('advertisements/home?plan=2', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});
</script>

<style lang="postcss" scoped>
section { @apply pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]; }
.swiper-slide { @apply md:w-max; }
</style>