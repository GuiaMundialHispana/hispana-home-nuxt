<template>
  <article>
    <AtomsPropertyPlans class="property-type-component" :planType="plantype" planPosition="top" />
    <span v-if="property.address" class="property-location-component">
      <AtomsIcon name="general/share-location" class="mr-2" />
      {{property.address}}
    </span>
    <Swiper
      :lazy="true"
      slides-per-view="auto"
      :space-between="2"
      :autoplay="{
        delay: 4000,
      }"
    >
      <swiper-slide v-for="image in property.images" :key="image">
        <NuxtLink :to="`/search/${property.slug}`" class="h-[305px] relative flex justify-center pb-2 bg-gray-10 rounded-lg figure">
          <NuxtImg
            :src="`${image.image}`"
            placeholder="/img/featured-properties-bg.jpg"
            :alt="property.name"
            class="object-cover h-full w-full absolute top-0 left-0 rounded-lg"
          />
          <p class="property-name">{{ property.name }}</p>
        </NuxtLink>
      </swiper-slide>
    </Swiper>
    <MoleculesCharacteristics
      :bedroom="property.bedroom"
      :bath="property.bathroom"
      :parking="property.parking"
      :area="property.meters"
      class="my-3 justify-center"
    />
    <p class="title-price">Desde:</p>
    <p class="price">US${{ formatCurrency(property.price_us) }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps({
  plantype: {
    type: String,
    required: true,
  },
  property: {
    type: Object as PropType<Property>,
    required: true,
  },
  propertyId: {
    type: Number,
    required: true,
  },
})

function formatCurrency(price: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price,);
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl w-full sm:w-[350px] bg-neutral-white relative;

  & .property-type-component { @apply absolute right-0 z-10 top-0 rounded-tr-lg; }

  .property-location-component {
    @apply truncate bg-neutral-black bg-opacity-50 text-neutral-white text-xs p-2 rounded-lg flex items-center font-normal absolute w-44 top-3 left-3 z-10;
  }

  & .swiper {
    & .property-name {
      @apply text-neutral-white z-10 relative font-semibold text-2xl mt-auto text-center overflow-hidden truncate whitespace-nowrap w-11/12;
    } 
  }
  & .swiper:hover > nav { @apply flex; }
  
  & .title-price { @apply text-sm text-neutral-black text-center font-normal; }
  & .price { @apply text-primary-100 font-semibold text-xl uppercase text-center; }

  & .figure {
    @apply relative;
    @apply before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[5] before:rounded-lg;
    &::before {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 72.76%, #000 100%);
    }
  }
}
</style>