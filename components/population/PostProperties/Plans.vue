<template>
  <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
    Planes disponibles para esta publicación.
  </h4>
  <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16">
    <li v-for="plan in plans" :key="plan">
      <MoleculesPlanCard :plan="plan" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('count', () => $fetch(useRuntimeConfig().API+'generals/plans'))
let plans = ref({})
plans = data.value.results
</script>