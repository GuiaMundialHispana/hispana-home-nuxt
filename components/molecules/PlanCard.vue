<template>
  <div class="plan-wrapper">
    <span class="plan-category" :class="[renderPlanText]">
      {{ plan.plan.name }}
    </span>
    <ul class="plan-benefits">
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Fotos por anuncio: {{plan.plan.pictures }}
      </li>
      <li>
        <AtomsIcon name="general/check" :size=16 class="text-[#FFAE10] mr-2" />
        Duración del anuncio: {{plan.plan.duration }} días
      </li>
      <!-- <li>
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
      </li> -->
    </ul>
    <p
      v-if="$route.path === '/profile'"
      class="text-xs mt-4 font-bold"
    >
      Actualmente tienes {{ plan.quantity }} cantidades de este plan
    </p>
    <AtomsButtons
      v-if="$route.path != '/profile'"
      btn-style="outline-gray"
      btn-size="xsmall"
      class="w-full my-4"
    >
      Seleccionar
    </AtomsButtons>
    <p
      class="price"
      v-if="$route.path != '/profile'"
    >
      <span class="text-base">RD$ </span>
      2,400
    </p>
    <div class="action-buttons" v-if="$route.path != '/profile'">
      <div class="cantidad">
        <button @click="planQuantity--">-</button>
        <input type="number" :value="planQuantity">
        <button @click="planQuantity++">+</button>
      </div>
      <AtomsButtons btn-size="medium" class="flex-none">
        <span class="total-plans">{{planQuantity}}</span>
        RD$2,593
      </AtomsButtons>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planQuantity: 1,
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
      if(this.plan.plan.name === 'VIP') {
        return 'vip';
      } else if (this.plan.plan.name === 'SILVER') {
        return 'silver';
      } else if (this.plan.plan.name === 'EXCLUSIVO') {
        return 'exclusive';
      } else if(this.plan.plan.name === 'DESTACADOS') {
        return '';
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.plan-wrapper {
  @apply border border-gray-10 rounded-lg p-6 max-w-[345px];

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
    @apply flex items-center gap-3 md:flex-row flex-col flex-wrap justify-center;

    & .cantidad {
      @apply md:w-28 w-full h-11 border border-neutral-black rounded-lg flex items-center justify-between px-6 py-2.5;
      & input { @apply w-4 h-full text-neutral-black text-center font-semibold; }
      & button {
        @apply text-lg;
        &:disabled {
          @apply text-gray-300;
        }
      }
    }
  }
}

.total-plans {
  @apply w-6 h-6 border border-neutral-white rounded-full flex items-center justify-center text-base font-semibold mr-6;
}
</style>