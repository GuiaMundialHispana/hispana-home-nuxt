<template>
  <div class="modal-container">
    <!-- <atoms-buttons class="absolute left-4 top-4" @click="$emit('close')">
      <AtomsIcon name="general/close"></AtomsIcon>
    </atoms-buttons> -->
    <AtomsButtons btn-type="btn-icon" icon-name="general/close" />
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :modules="[SwiperFreeMode,SwiperNavigation]"
      class="swiper-hero"
    >
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-contain" />
      </swiper-slide>
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-contain" />
      </swiper-slide>
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-contain" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="postcss" scoped>
.modal-container {
  @apply bg-neutral-black bg-opacity-60 left-0 fixed z-[60] top-0 w-full h-full pt-20 pb-16 px-4;

  & .swiper-hero {
    @apply max-w-5xl mx-auto !important;
  }
}
</style>