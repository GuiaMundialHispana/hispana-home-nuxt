<template>
  <div v-if="property != null">
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
</template>

<script>
export default {
  data() {
    return {
      route: useRoute(),
      config: useRuntimeConfig(),
      propertyId: Number,
      property: null,
    }
  },
  methods: {
    async getAdsDetails() {
      this.propertyId = this.route.params.id; 
      const { data }  = await useFetch(`advertisements/${this.propertyId}`,{
        method: 'GET',
        baseURL: this.config.public.API,
      });
      this.property = data.value.results;
    }
  },
  created() {
    this.getAdsDetails();
  }
}
</script>