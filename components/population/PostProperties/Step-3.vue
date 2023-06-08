<script>
  export default {
    data() {
      return {
        config: useRuntimeConfig(),
        token: '',
        plans: [],
        planSelected: {
          id: 4,
          quantity: 4
        },
        plansSelected: [],
      }
    },
    computed: {
      renderPlanText() {
        if(this.planSelected.name === 'VIP') {
          return 'vip';
        } else if (this.planSelected.name === 'SILVER') {
          return 'silver';
        } else if (this.planSelected.name === 'EXCLUSIVO') {
          return 'exclusive';
        } else if(this.planSelected.name === 'DESTACADOS') {
          return '';
        }
      },
    },
    methods: {
      async getUserPlans() {
        const {data} = await useFetch('user-plans',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          baseURL: this.config.public.API
        });
        this.plans = data._value.results;
      },
    },
    beforeMount() {
      this.getUserPlans();
    }
  }
</script>

<template>
  <h4> Planes disponibles para esta publicación.</h4>
  <ul class="plans-list">
    <li v-for="plan in plans" :key="plan">
      <MoleculesPlanCard
        @pay="planInformation"
        :plan="plan.plan"
        :user-quantity="plan.quantity"
      />
    </li>
  </ul>
  <div class="flex justify-center">
    <AtomsLink link-to="/plans" class="mx-auto my-6">Adquirir mas planes</AtomsLink>
  </div>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center; }

.plans-list { @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-16; }
/* .payment-plan-resume {
  & .plan-price-card {
    @apply py-4 border-b border-[#D9D9D9] w-full flex gap-3 items-center;

    & .plan-name-card {
      @apply rounded-lg w-[100px] h-[70px] flex items-center justify-center font-medium;
      &.vip {
        background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
        @apply text-neutral-black;
      }
      &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
      &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
    }

    & .plan-information {
      & p { @apply text-neutral-black text-sm font-medium mb-3; }
      & select { @apply bg-[#FFE9E9] text-primary-100 px-1.5 text-sm font-normal rounded-lg min-w-[123px] focus:outline-none h-10; }
    }

    & .plan-price { @apply ml-auto text-sm text-neutral-black font-medium; }
  }
}

& .form-group {
  @apply mb-4 w-full;
  & label { @apply text-neutral-black text-sm mb-1 block; }
  & input { @apply w-full border border-[#D9D9D9] rounded-sm block px-4 h-8 font-light placeholder:text-[#D9D9D9]; }
}

& .card-information {
  & input:first-child { @apply border-t-0 border-r-0; }
  & input:last-child { @apply border-t-0; }
} */
</style>

<!-- <script setup>
import { useUserStore } from '~/stores/User';
import Swal from 'sweetalert2';
const user = useUserStore();
let showPaymentProcess = false;

// Get plans
const { data } = await useAsyncData('count', () => $fetch(useRuntimeConfig().API+'generals/plans'))
let plans = ref({})
plans = data.value.results;

// Procesamiento de pagos
function tes(planId, quantity) {
  this.showPaymentProcess = true;
  // addPayment(planId,quantity);
}

async function addPayment(planId, quantity) {
  const { data }  = await useFetch(useRuntimeConfig().API+'user-plans',{
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + user.token },
    body: {
      plan_id: planId,
      quantity: quantity
    }
  });

  try {
    const res = data.value.results;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: 'Confirma que tus datos esten correctos'
    });
  }
}


</script> -->