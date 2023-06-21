<script setup>
const emit = defineEmits(['plan_selected'])
let plans = [];
const config = useRuntimeConfig();
const {data} = await useFetch('user-plans',{
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  baseURL: config.public.API
});
plans = data._value.results;

let next = ref(false);
function send_plan(plan_id, plan_picture) {
  emit('plan_selected',  {plan_id, plan_picture});
  next.value = true;
}

// const renderPlanText = computed (()=> {
//   if(this.planSelected.name === 'VIP') {
//     return 'vip';
//   } else if (this.planSelected.name === 'SILVER') {
//     return 'silver';
//   } else if (this.planSelected.name === 'EXCLUSIVO') {
//     return 'exclusive';
//   } else if(this.planSelected.name === 'DESTACADOS') {
//     return '';
//   }
// });
</script>

<template>
  <h4> Planes disponibles para esta publicación.</h4>
  <ul class="plans-list">
    <li v-for="plan in plans" :key="plan">
      <MoleculesPlanCard
        @pay="send_plan"
        :plan="plan.plan"
        :user-quantity="plan.quantity"
      />
    </li>
  </ul>
  <div class="flex justify-center">
    <AtomsLink link-to="/plans" class="mx-auto my-6">Adquirir mas planes</AtomsLink>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts')" :disabled="!next">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center; }

.plans-list { @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-16; }
</style>