<!-- <template>
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
</template> -->

<!-- <script>
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
      this.$swal.showLoading();
      this.propertyId = this.route.params.id; 
      const { data }  = await useFetch(`advertisements/${this.propertyId}`,{
        method: 'GET',
        baseURL: this.config.public.API,
      });
      this.property = data.value.results;
      this.$swal.close();
    }
  },
  created() {
    this.getAdsDetails();
  }
}
</script> -->

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

const { data: property, pending, error} = await useFetch(`advertisements/${route.params.id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results
});
</script>