<template>
  <section class="px-16 pb-16">
    <h3 class="mt-16">Nuestros planes</h3>
    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="plan in generalPlans" :key="plan">
        <MoleculesPlanCard :plan="plan" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Plans',
  data() {
    return {
      config: useRuntimeConfig(),
      plans: [],
      generalPlans: null,
    }
  },
  methods: {
    async getPlans() {
      const plansApi = await $fetch(this.config.public.API+'generals/plans');
      plansApi.results.pop();
      this.generalPlans = plansApi.results;
    }
  },
  created() {
    this.getPlans();
  }
}

</script>

<style lang="postcss" scoped>
h3 {
  @apply font-semibold text-sm text-neutral-black md:text-[28px] md:leading-[42px] mb-5;
}
</style>