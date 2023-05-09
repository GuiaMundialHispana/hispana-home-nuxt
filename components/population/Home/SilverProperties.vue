<!-- <template>
  <section class="pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] leading-8 text-center md:text-left mx-auto md:mx-0 font-medium">
        Propiedades silver
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
        delay: 5000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.next',
        prevEl: '.prev'
      }"
    >
      <swiper-slide v-for="plan in plans" :key="plan">
        <MoleculesFeaturedProperties :property-id="plan.id" plantype="silver" :property="plan.property" />
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script>
export default {
  name: 'Silver',
  data() {
    return {
      plans: [],
      config: useRuntimeConfig()
    }
  },
  methods: {
    async getPlansSilver() {
      const { data } = await useFetch('advertisements/home?plan=3', {
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
    this.getPlansSilver();
  }
}
</script>

<style lang="postcss" scoped>
.swiper-slide { @apply md:w-max; }
</style> -->

<template>
  <section v-if="property">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2 mb-6">
      <h2 class="text-[28px] leading-8 text-center md:text-left mx-auto md:mx-0 font-medium">
        Propiedades silver
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
        delay: 4000,
        disableOnInteraction: true
      }"
      :navigation="{
        nextEl: '.next',
        prevEl: '.prev'
      }"
    >
      <swiper-slide v-for="plan in property" :key="plan">
        <MoleculesFeaturedProperties :property-id="plan.id" plantype="silver" :property="plan.property" />
      </swiper-slide>
    </Swiper>
  </section>
  <!-- TODO Skeleton -->
  <div v-if="pending">
    <OrganismSkeleton class="w-12 h-8"></OrganismSkeleton>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: property, pending, error} = await useFetch('advertisements/home?plan=3', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});
</script>

<style lang="postcss" scoped>
section { @apply pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]; }
.swiper-slide { @apply md:w-max; }
</style>