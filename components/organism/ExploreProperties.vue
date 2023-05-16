<template>
  <section class="pt-4 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem] pb-8">
    <div class="flex flex-col md:flex-row justify-between border-b border-[#F5F5F5] py-2">
      <h2 class="text-2xl text md:text-[28px] leading-[28px] font-medium text-center md:text-left">
        Descubre que más tenemos <span class="text-primary-100">para ti</span>
      </h2>
      <div class="flex items-center">
        <NuxtLink to="/search?type=All" class="font-normal mx-auto md:mt-0 mt-3 md:mr-5 leading-[22px] text-sm text-primary-100 cursor-pointer text-center">Ver todos</NuxtLink>
        <div class="hidden md:flex gap-4 items-center">
          <AtomsButtons class="prev" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-left" btn-size="xsmall" :icon-size=15 />
          <AtomsButtons class="next" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-right" btn-size="xsmall" :icon-size=15 />
        </div>
      </div>
    </div>
    <Swiper
      class="relative mt-8 pb-3"
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
      }">
      <swiper-slide v-for="property in properties" :key="property">
        <MoleculesProperty :is-favorite="false" :property="property" />
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script>
export default {
  name: 'Explore Properties',
  data() {
    return {
      properties: [],
      config: useRuntimeConfig()
    }
  },
  methods: {
    async getProperties() {
      const { data } = await useFetch('properties', {
        method: 'GET',
        baseURL: this.config.public.API
      });
      const res = data._value.results.data;
      for(const item in res) {
        this.properties.push(res[item])
      }
    }
  },
  created() {
    this.getProperties();
  }
}
</script>

<style lang="postcss" scoped>
.swiper-slide { 
  @apply md:w-max;
  & article {
    @apply md:max-w-[350px];
  }
}
</style>