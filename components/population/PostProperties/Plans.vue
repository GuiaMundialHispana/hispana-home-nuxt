<template>
  <div v-if="!showPaymentProcess">
    <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center">
      Planes disponibles para esta publicación.
    </h4>
    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16">
      <li v-for="plan in plans" :key="plan">
        <MoleculesPlanCard @pay="tes" :plan="plan" />
      </li>
    </ul>
  </div>
  <!-- Process payment -->
  <div v-if="showPaymentProcess">
    <div class="grid grid-cols-2">
      <div>
        <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center">Información de pago</h4>
      </div>
      <!--  -->
      <div class="bg-[#F8F8F8]">
        payment card
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/User';
import Swal from 'sweetalert2';
const user = useUserStore();
let showPaymentProcess:boolean = ref(false);

// Get plans
const { data } = await useAsyncData('count', () => $fetch(useRuntimeConfig().API+'generals/plans'))
let plans = ref({})
plans = data.value.results;

// Procesamiento de pagos
console.log(showPaymentProcess)
function tes(planId:any, quantity:any) {
  showPaymentProcess = true;
  console.log(showPaymentProcess)
  // addPayment(planId,quantity);
}

async function addPayment(planId:number, quantity:number) {
  console.log("plan id"+planId);
  console.log("cantidad"+quantity);
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
    console.log(res)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: 'Confirma que tus datos esten correctos'
    });
  }
}


console.log(user.token)
</script>