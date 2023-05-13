<template>
  <section class="min-h-screen">
    <div class="grid lg:grid-cols-2 h-full">
      <div class="w-full lg:px-8 px-4 lg:py-16 py-8">
        <h4 class="flex items-center">
          <AtomsButtons @click="useRouter().back()" btn-type="btn-icon" class="mr-2" iconName="arrows/arrow-left"></AtomsButtons>
          Información de pago
        </h4>
        <ul class="payment-plan-resume">
          <li class="plan-price-card">
            <div class="plan-name-card vip">
              <p>{{plan.name}}</p>
            </div>
            <div class="plan-information">
              <p class="capitalize">Plan {{ plan.name }}</p>
              <select>
                <option value="1">Cantidad: 1</option>
                <option value="1">Cantidad: 2</option>
                <option value="1">Cantidad: 3</option>
                <option value="1">Cantidad: 4</option>
                <option value="1">Cantidad: 5</option>
              </select>
            </div>
            <h6 class="plan-price">
              RD$ {{ plan.price }}
            </h6>
          </li>
        </ul>
        <p class="total-price max-w-max md:ml-auto mr-auto">
          <span class="text-sm font-normal block text-left mt-8">Pago total</span>
          RD$ 100000
        </p>
      </div>
      <!--  -->
      <form class="payment-wrapper">
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
        <AtomsButtons class="w-full">Pagar</AtomsButtons>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      plan: {}
    }
  },
  methods: {
    decodeInnerObject() {
      const decodedValue = decodeURIComponent(this.$route.query.plans);
      const innerObject = JSON.parse(decodedValue);
      this.plan = innerObject;
    }
  },
  created() {
    this.decodeInnerObject();
  }
}
</script>

<style lang="postcss" scoped>
h4 {
  @apply font-bold text-[28px] leading-[42px] md:mb-14 mb-4;
}

.payment-plan-resume {
  & .plan-price-card {
    @apply py-4 border-b border-[#D9D9D9] w-full flex gap-3 md:items-center items-start md:flex-row flex-col;

    & .plan-name-card {
      @apply rounded-lg md:w-[100px] w-full md:h-[70px] h-8 flex items-center justify-center font-medium;
      
      &.vip {
        background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
        @apply text-neutral-black;
      }
      &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
      &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
    }

    & .plan-information {
      @apply flex md:flex-col flex-row md:items-start items-center mr-auto;
      & p { @apply text-neutral-black text-sm font-medium md:mb-3 mb-0 md:mr-0 mr-4; }
      & select { @apply bg-[#FFE9E9] text-primary-100 px-1.5 text-sm font-normal rounded-lg min-w-[123px] focus:outline-none h-10; }
    }

    & .plan-price { @apply md:ml-auto text-sm text-neutral-black font-medium; }
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

.total-price {
  @apply font-bold text-neutral-black text-[28px] leading-[42px] text-right;
}

.payment-wrapper {
  @apply bg-[#F8F8F8] w-full lg:py-40 py-8 lg:px-8 px-4;
}
</style>