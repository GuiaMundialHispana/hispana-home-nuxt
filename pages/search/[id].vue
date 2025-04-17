<template>
  <Head v-if="property">
    <Title>{{ property.property.name }}</Title>
    <Meta name="title" :content="property.property.name" />
    <Meta name="description" :content="property.property.description" />
    <Meta property="og:type" content="article" />
    <Meta property="og:url" :content="currentUrl" />
    <Meta property="og:title" :content="property.property.name" />
    <Meta property="og:description" :content="property.property.description" />
    <Meta property="og:image" :content="property.property.image" />
    <Meta property="og:locale" content="es_ES" />
    <Meta name="twitter:card" content="summary_large_image" />
  </Head>
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
    <GeneralExclusiveProperties :property_id='property.property.id' />
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
const config = useRuntimeConfig();

const { data: property, pending, error} = await useLazyFetch(`advertisements/${useRoute().params.id}`, {
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

const url = useRequestURL();
const route = useRoute();
const origin = computed(() => `${url.protocol}//${url.host}`);
const currentUrl = computed(() => `${origin.value}${route.fullPath}`);
watch(property, () => {
  useSchemaOrg({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.value.property.name,
    image: property.value.property.image,
    description: property.value.property.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: property.value.property.price_us,
      itemCondition: 'New',
    }
  })
})
</script>