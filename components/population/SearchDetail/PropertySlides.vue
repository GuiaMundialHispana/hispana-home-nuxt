<template>
  <section class="swiper-hero-property">
    <Swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[SwiperNavigation,SwiperThumbs, SwiperFreeMode]"
      :effect="'fade'"
      :slides-per-view="1"
      class="swiper-hero relative"
      >
        <swiper-slide
          @click="showModal = true"
          v-for="image in images"
          :key="image"
        >
          <!-- <div class="overlay">
            <AtomsIcon name="general/zoom" :size=35 class="text-neutral-white" />
          </div> -->
          <img :src="`${image.image}`" class="w-full h-full object-cover rounded-lg" />
          <!-- <atoms-property-plans :plan-type="renderPlanText" plan-position="top" class="z-20 top-0 absolute !rounded-none" /> -->
        </swiper-slide>
    </Swiper>
    <!--  -->
    <!-- Thumbs -->
    <swiper
      @swiper="setThumbsSwiper"
      :freeMode="true"
      :modules="[SwiperThumbs, SwiperFreeMode]"
      watch-slides-progress
      :spaceBetween="10"
      class="swiper-thumbs"
      :breakpoints="{
        320: { direction: 'horizontal' },
        1280: { direction: 'vertical' },
      }"
    >
      <swiper-slide v-for="image in images" :key="image">
        <img :src="`${image.image}`" class="w-full h-full object-cover rounded-lg" />
      </swiper-slide>
    </swiper>
    <!-- Zoom image -->
    <PopulationSearchDetailModalZoomSlides
      :modalImages="images"
      @close="showModal = false"
      v-show="showModal"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['images','planType']);

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const showModal = ref(false);
const renderPlanText = computed(() => {
  if(props.planType === 1) {
    return 'vip';
  } else if (props.planType === 3 ) {
    return 'silver';
  } else if ( props.planType === 2) {
    return 'exclusive';
  } else if(props.planType === 4 ) {
    return 'featured';
  }
});
</script>

<style lang="postcss" scoped>

section {
  @apply md:px-14 px-4 mb-10 gap-5 mt-8 2xl:max-w-[1440px] mx-auto grid xl:grid-cols-[1fr,205px] overflow-hidden;
}


.swiper-thumbs {
  @apply xl:w-52 w-full xl:h-[560px] h-32 ;

  & .swiper-wrapper {
    @apply w-52 h-full m-0 !important;

    & .swiper-slide { @apply w-52 h-32 xl:mx-0 mr-4 mb-4 object-cover !important; }
  }
}

.swiper-slide { @apply rounded-lg overflow-hidden relative !important; }
</style>