<template>
  <section>
    <div v-if="!isPlan">
      <figure class="mb-4">
        <img src="/img/not-found.png" class="object-contain max-w-[308px] mx-auto" />
      </figure>
      <h6 class="text-4xl text-blue-100 font-bold mb-8 text-center">Aún no tienes <span class="text-primary-100">planes disponibles.</span></h6>
      <p class="text-sm text-neutral-black text-center">¡No dejes pasar esta oportunidad de mostrar tu propiedad al mundo!</p>
    </div>
    <div v-if="isPlan">
      <h3 class="font-semibold text-sm text-black md:text-[28px] md:leading-[42px] mb-5">Mis planes disponibles</h3>
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="plan in plans" :key="plan" class=" border border-gray-10 rounded-lg p-6">
          <span class="plan-category"
            :class="{
              'vip': plan.plan.name === 'VIP',
              'exclusive': plan.plan.name === 'EXCLUSIVO',
              'silver': plan.plan.name === 'SILVER',
              '': plan.plan.name === 'DESTACADOS'
            }"
          >
            {{ plan.plan.name }}
          </span>
          <div class="bg-primary-100 text-neutral-white text-center w-full text-sm rounded-lg mt-4 py-1" v-if="plan.quantity > 0">
            Cantidad disponible: {{ plan.quantity }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/User';
export default {
  name: 'Plans',
  data() {
    return {
      user:useUserStore(),
      isPlan: false,
      plans: [],
    }
  },
  methods: {
    async getPlans() {
      const {data} = await useFetch(useRuntimeConfig().API+'user-plans',{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
      });
      this.plans = data._value.results;
      this.plans.length > 0 ? this.isPlan = true : this.isPlan = false;
    }
  },
  created() {
    this.getPlans();
  }
}
</script>


<style lang="postcss" scoped>
.plan-category {
  @apply w-full rounded-lg text-neutral-white flex items-center h-10 font-semibold justify-center bg-primary-100;

  &.vip {
    background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
    @apply text-neutral-black;
  }
  &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
  &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
}
</style>