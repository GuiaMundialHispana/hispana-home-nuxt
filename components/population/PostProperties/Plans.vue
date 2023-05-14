<template>
  <div v-if="!showPaymentProcess">
    <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center">
      Planes disponibles para esta publicación.
    </h4>
    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16">
      <li v-for="plan in plans" :key="plan">
        <MoleculesPlanCard @pay="planInformation" :plan="plan" />
      </li>
    </ul>
  </div>
  <!-- Process payment -->
  <div v-if="showPaymentProcess" class="lg:px-16">
    <div class="grid lg:grid-cols-2 lg:px-0 px-8 gap-x-16">
      <div class="w-full">
        <h4 class="font-bold text-[28px] leading-[42px] mb-14">Información de pago</h4>
        <ul class="payment-plan-resume">
          <li class="plan-price-card">
            <div class="plan-name-card" :class="[renderPlanText]">
              <p>{{ planSelected.name }}</p>
            </div>
            <div class="plan-information">
              <p class="capitalize">Plan {{ planSelected.name }}</p>
              <select>
                <option value="1">Cantidad: 1</option>
                <option value="1">Cantidad: 2</option>
                <option value="1">Cantidad: 3</option>
                <option value="1">Cantidad: 4</option>
                <option value="1">Cantidad: 5</option>
              </select>
            </div>
            <h6 class="plan-price">
              RD$ {{ planSelected.planPrice }}
            </h6>
          </li>
        </ul>
        <p class="text-sm block text-right mt-8">Pago total</p>
        <p class="font-bold text-neutral-black text-[28px] leading-[42px] text-right">
          RD$ {{ planSelected.planPrice }}
        </p>
      </div>
      <!--  -->
      <div class="bg-[#F8F8F8] w-full">
        <div class="form-group">
          <label>Correo</label>
          <input type="email">
        </div>
        <div class="form-group card-information">
          <label>Información de la tarjeta</label>
          <input type="text" class="border-b-0" placeholder="1234 4567 1234 4567">
          <div class="flex items-center">
            <input type="text" placeholder="MM/YY7">
            <input type="text" placeholder="CVC">
          </div>
        </div>
        <div class="form-group">
          <label>Nombre de la tarjeta</label>
          <input type="text">
        </div>
        <AtomsButtons class="w-full" @click="processPayment()">Pagar</AtomsButtons>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '~/stores/User';
export default {
  data() {
    return {
      user: useUserStore(),
      plans: [],
      planSelected: {},
      plansSelected: [],
      showPaymentProcess: false,
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
    planInformation(planId, quantity, planName, price) {
      this.showPaymentProcess = true;
      this.planSelected = {
        id: planId,
        planQuantity: quantity,
        name: planName,
        planPrice: price
      }
    },
    async getPlans() {
      const { data }  = await useFetch(useRuntimeConfig().API+'generals/plans');
      this.plans = data._value.results;
    },
    async processPayment() {
      const form = new FormData();
      form.append('plan_id', this.planSelected.id);
      form.append('quantity', this.planSelected.planQuantity)
      const { data }  = await useFetch(useRuntimeConfig().API+'user-plans',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.user.token
        },
        body: form,
      });

      try {
        const res = data.value.results;
        this.$emit('plan', this.planSelected.id);
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          text: 'En estos momentos estamos presentando un error, intente mas tarde'
        })
      }
    }
  },
  mounted() {
    this.getPlans();
  }
}
</script>

<style lang="postcss" scoped>
.payment-plan-resume {
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

.form-group {
  @apply mb-4 w-full;
  & label { @apply text-neutral-black text-sm mb-1 block; }
  & input { @apply w-full border border-[#D9D9D9] rounded-sm block px-4 h-8 font-light placeholder:text-[#D9D9D9]; }
}

.card-information {
  & input:first-child { @apply border-t-0 border-r-0; }
  & input:last-child { @apply border-t-0; }
}

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