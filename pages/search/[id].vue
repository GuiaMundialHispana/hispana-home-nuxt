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
    <PopulationSearchDetailPropertyLoan class="md:px-14 px-4" />
    <OrganismExploreProperties />
  </div>
  <div class="p-16" v-if="pending">
    <OrganismSkeleton class="w-16 h-5" />
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const { data: property, pending, error} = await useLazyFetch(`advertisements/${route.params.id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results,
  onResponse({response}){
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
  }
});


definePageMeta({
  middleware: ["not-found"]
});
</script>