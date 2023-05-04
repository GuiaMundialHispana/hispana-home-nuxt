<template>
  <section class="pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem]">
    <div class="flex justify-between border-b border-[#F5F5F5] py-2">
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
    <!-- <Swiper
      class="relative mt-8 pb-3"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      slidesPerView="auto"
      :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }">
      <SwiperSlide v-for="slide in 10" :key="slide">
        <MoleculesFeaturedProperties plantype="silver" />
      </SwiperSlide>
    </Swiper> -->
  </section>
</template>

<style lang="postcss" scoped>
.swiper-slide { @apply md:w-max; }
</style>