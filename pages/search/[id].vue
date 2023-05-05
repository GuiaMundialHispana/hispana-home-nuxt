<template>
  <PopulationSearchDetailPropertySlides />
  {{ property.property.images }}
  <PopulationSearchDetailPropertyInformation />
  <PopulationSearchDetailPropertyLoan class="md:px-14 px-4" />
  <OrganismExploreProperties />
</template>

<!-- <script setup>
const route = useRoute();
const config = useRuntimeConfig();
let propertyId = Number;

propertyId = route.params.id; 
const { data } = useFetch(`advertisements/${propertyId}`,{
  method: 'GET',
  baseURL: config.public.API,
});
const res = data._value;
console.log(res)
</script> -->

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

      console.log(data._value)
      console.log(data._value.results)
      console.log(this.property = data.value.results)
    }
  },
  created() {
    this.getAdsDetails();
  }
}
</script>