<template>
  <article>
    <Swiper
      class="relative rounded-lg overflow-hidden"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }">
      <SwiperSlide v-for="slide in 10" :key="slide">
        <NuxtLink to="/search/propiedad-1" class="h-[305px] block">
          <img src="/img/property-1.jpg" alt="" class="object-cover h-full w-full">
        </NuxtLink>
      </SwiperSlide>
      <AtomsPropertyPlans
        class="absolute right-0 z-10"
        :planType="plantype"
        planPosition="top" 
      />
      <AtomsPropertyLocation class="absolute top-2.5 left-2 z-10" />
      <nav>
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-left"
          :icon-size=15
        />
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-right"
          :icon-size=15
        />
      </nav>
    </Swiper>
    <!-- Caracteristicas -->
    <MoleculesCharacteristics class="my-3 justify-center" />
    <!-- Price -->
    <p class="text-sm text-neutral-black text-center font-normal">Desde:</p>
    <p class="text-primary-100 font-semibold text-xl uppercase text-center">US$84,192.00</p>
  </article>
</template>

<script>
export default {
  props: {
    plantype: {
      type: String,
      default: "exclusive"
    }
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full sm:max-w-[350px] relative;
  &:hover {
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07);
  }
  & nav { @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }}
  & .swiper:hover > nav { @apply flex; }
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
}
</style>