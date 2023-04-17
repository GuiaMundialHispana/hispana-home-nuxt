<template>
  <section class="md:px-14 px-4 mb-10 flex gap-5 mt-8 xl:flex-row flex-col 2xl:max-w-6xl">
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[SwiperFreeMode,SwiperNavigation,SwiperThumbs]"
      class="swiper-hero"
    >
      <swiper-slide @click="showModal = true">
        <div class="overlay">
          <AtomsIcon name="general/zoom" :size=35 class="text-neutral-white" />
        </div>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
      <swiper-slide @click="showModal = true">
        <div class="overlay">
          <AtomsIcon name="general/zoom" :size=35 class="text-neutral-white" />
        </div>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
      <swiper-slide @click="showModal = true">
        <div class="overlay">
          <AtomsIcon name="general/zoom" :size=35 class="text-neutral-white" />
        </div>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
      <atoms-property-plans plan-type="vip" plan-position="top" />
    </swiper>
    <!--  -->
    <!-- Thumbs -->
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      class="swiper-thumbs"
    >
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
      <swiper-slide>
        <img src="/img/property-1.jpg" class="w-full h-full object-cover" />
      </swiper-slide>
    </swiper>
    <!--  -->
    <!-- Zoom image -->
    <PopulationSearchDetailModalZoomSlides @close="showModal = false" v-show="showModal" />
  </section>
</template>

<script>
import { ref } from 'vue';
import { Thumbs } from 'swiper';
export default {
  setup() {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const showModal = ref(false);
    return { Thumbs, thumbsSwiper, setThumbsSwiper, showModal };
  }
}
</script>

<style lang="postcss">

.swiper-hero {
  @apply md:h-[560px] h-[360px] flex-grow m-0 !important;

  & .swiper-wrapper {
    @apply h-full w-full rounded-lg  m-0;
  }

  & > span { @apply absolute z-10 rounded-lg top-4 left-4 h-8 !important; }

  & .overlay { @apply bg-neutral-black bg-opacity-50 z-[65] absolute w-full h-full bottom-0 left-0 hidden items-center justify-center p-4 cursor-pointer; }

  & .swiper-slide:hover > .overlay { @apply flex; }

}

.swiper-thumbs {
  @apply xl:w-52 w-full xl:h-[560px] h-32 xl:overflow-x-hidden xl:flex-none;

  & .swiper-wrapper {
    @apply w-52 h-full flex-none xl:flex-col m-0 xl:overflow-y-scroll xl:translate-x-0 xl:overflow-x-hidden !important;

    & .swiper-slide { @apply w-full h-32 xl:mx-0 mr-4 mb-4 object-cover !important; }
  }
}

.swiper-slide { @apply rounded-lg overflow-hidden relative !important; }
</style>