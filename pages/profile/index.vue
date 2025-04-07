<template>
  <section class="pb-32">
    <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
      <PopulationProfileAdvertisement v-show="route.query.tab === 'anuncio'" />
      <PopulationProfileFavorite v-show="route.query.tab === 'favorite'" />
      <PopulationProfilePlans v-show="route.query.tab === 'plan'" /> 
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'check-auth',
  layout: 'dashboard',
});

const { pendingUserData } = useUser();
const user = useState('user');
const route = useRoute();
</script>