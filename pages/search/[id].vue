<template>
  <div v-if="property">
    <PopulationSearchDetailPropertySlides
      :plan-type="property.plan_id"
      :images="property.property.images"
    />
    <PopulationSearchDetailPropertyInformation
      :property="property.property"
      :user="property.user"
    />
    <PopulationSearchDetailPropertyLoan :property="property.property" class="md:px-14 px-4" />
    <OrganismExploreProperties :property_id='property.plan_id' />
  </div>
  <div class="p-16" v-if="pending">
    <OrganismSkeleton class="md:h-[560px] h-[360px] max-w-6xl mb-7" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-96 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-24 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8" />
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: property, pending, error} = await useLazyFetch(`advertisements/${route.query.property_id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results,
  onResponse({response}){
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
  }
});

console.log(property)


definePageMeta({
  middleware: ["not-found"]
});
</script>