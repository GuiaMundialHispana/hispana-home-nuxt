<template>
  <div class="plan-wrapper">
    <!-- <span class="user-quantity" v-if="">1</span> -->
    <span class="plan-category" :class="[renderPlanText]">
      {{ plan.name }}
    </span>
    <ul class="plan-benefits">
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Fotos por anuncio: {{plan.pictures }}
      </li>
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Duración del anuncio: {{plan.duration }} días
      </li>
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Opción para subir videos
      </li>
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Cantidades de inmuebles: 1
      </li>
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Exclusividad en página de inicio
      </li>
    </ul>
    <AtomsButtons :isDisabled="disabledPayment" @click="payment()" v-if="$route.path != '/profile'" btn-style="outline-gray" btn-size="xsmall" class="w-full my-4">
      Seleccionar
    </AtomsButtons>
    <div class="action-buttons" v-if="$route.path != '/profile' && plan.price != 0">
      <div class="cantidad">
        <button @click="planQuantity--">-</button>
        <input type="number" :value="planQuantity">
        <button @click="planQuantity++">+</button>
      </div>
      <!--  -->
      <AtomsButtons btn-size="xsmall" class="flex-none">
        <span class="total-plans">{{planQuantity}}</span>
        RD$ {{ updatePrice  }}
      </AtomsButtons>
    </div>
    <p class="price"
      v-if="$route.path === '/profile'">
      <span class="text-base">
      RD$ </span>{{ updatePrice  }}
    </p>
    <p v-if="plan.price === 0" class="text-primary-100 text-3xl text-center font-semibold">
      Gratis
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planQuantity: 0,
      priceUpdated: 0
    }
  },
  props: {
    plan: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    renderPlanText() {
      if(this.plan.name === 'VIP') {
        return 'vip';
      } else if (this.plan.name === 'SILVER') {
        return 'silver';
      } else if (this.plan.name === 'EXCLUSIVO') {
        return 'exclusive';
      } else if(this.plan.name === 'DESTACADOS') {
        return '';
      }
    },
    updatePrice() {
      return parseInt(this.plan.price * this.planQuantity);
    },
    disabledPayment() {
     if(this.planQuantity <= 0) { return true } else { false}
    }
  },
  methods: {
    payment() {
      this.$swal.fire({
        title: 'Que deseas hacer?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Pagar plan',
        denyButtonText: 'Seleccionar otro plan',
      }).then((result) => {
        if (result.isConfirmed) {
        this.$emit(
          'pay', 
          this.plan.id,
          this.planQuantity,
          this.plan.name,
          this.updatePrice
        )
        } else if (result.isDenied) {
          this.planQuantity = 0;
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.plan-wrapper {
  @apply border border-gray-10 rounded-lg p-6 max-w-[345px] relative;

  & .plan-category {
    @apply w-full rounded-lg text-neutral-white flex items-center h-10 font-semibold justify-center bg-primary-100;

    &.vip {
      background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
      @apply text-neutral-black;
    }
    &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
    &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }

  }

  & .plan-benefits {
    @apply border-t border-gray-10 mt-4 pt-4;
    & li { @apply flex items-center text-sm text-neutral-black font-normal mb-6; }
    & li:last-child { @apply mb-0; }
  }

  & .price { @apply text-neutral-black text-3xl font-semibold text-center mb-4; }

  & .action-buttons {
    @apply flex items-center gap-1.5 md:flex-row flex-col flex-wrap justify-center;

    & .cantidad {
      @apply md:w-20 w-full h-8 border border-[#ADADAD] rounded-lg flex items-center justify-between px-3 py-1;

      & input { @apply w-4 h-full text-neutral-black text-center font-semibold; }

      & button {
        @apply text-lg flex-grow;
        &:disabled {
          @apply text-gray-300 cursor-not-allowed;
        }
      }
    }
  }

  & .user-quantity { @apply w-9 h-9 rounded-full flex items-center justify-center absolute -top-7 -right-4 bg-primary-90 text-base text-neutral-white; }
}

.total-plans {
  @apply w-6 h-6 border border-neutral-white rounded-full flex items-center justify-center text-sm font-semibold mr-1.5;
}
</style>
