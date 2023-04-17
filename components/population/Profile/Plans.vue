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
      <h3 class="font-semibold text-sm text-black text-[28px] leading-[42px] mb-5">Nuestros planes</h3>
      <!-- TODO Le vas a enviar el objeto plan -->
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <li v-for="planItem in plans" :key="planItem">
          <MoleculesPlanCard :plan="planItem" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
// TODO advertisimentStatus creo que podemos ponerlo en un js aparte para no repetir codigo en todos los tabs
import { useUserStore } from '~/stores/User';
export default {
  name: 'Plans',
  data() {
    return {
      user:useUserStore(),
      isPlan: false,
      plans: {},
      auth: ''
    }
  },
  methods: {
    async getPlans() {
      const {data} = await useFetch(this.$config.public.API+'user-plans',{
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
      });
      const res = data._value.results;
      if(res.length > 0) {
        this.plans = res;
        this.isPlan = true;
      }
    }
  },
  created() {
    this.auth = useRuntimeConfig();
    this.getPlans();
  }
}
</script>
