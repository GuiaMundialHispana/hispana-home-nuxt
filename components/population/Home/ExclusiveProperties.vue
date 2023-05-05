<template>
  <section class="pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] text-center md:text-left leading-8 mx-auto md:mx-0 font-medium">
        Propiedades Exclusivas
      </h2>
      <nav class="hidden md:flex gap-4">
        <AtomsButtons 
          btn-type="btn-icon"
          btn-style="outline-gray" 
          icon-name="arrows/arrow-left"
          btn-size="xsmall"
          :icon-size=15
        />
        <AtomsButtons
          btn-type="btn-icon"
          btn-style="outline-gray"
          icon-name="arrows/arrow-right"
          btn-size="xsmall"
          :icon-size=15
        />
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
        delay: 4000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.next',
        prevEl: '.prev'
      }"
    >
      <swiper-slide v-for="plan in plans" :key="plan">
        <MoleculesFeaturedProperties :property-id="plan.id" plantype="exclusive" :property="plan.property" />
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script>
export default {
  name: 'Exclusive',
  data() {
    return {
      plans: [],
      config: useRuntimeConfig()
    }
  },
  methods: {
    async getPlansExclusive() {
      const { data } = await useFetch('advertisements/home?plan=2', {
        method: 'GET',
        baseURL: this.config.public.API
      });
      const res = data._value.results.data;
      for(const item in res) {
        this.plans.push(res[item])
      }
    }
  },
  created() {
    this.getPlansExclusive();
  }
}
</script>

<style lang="postcss" scoped>
.swiper-slide { @apply md:w-max; }
</style>