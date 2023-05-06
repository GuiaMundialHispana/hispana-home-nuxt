<template>
  <div class="pb-[75px] 2xl:max-w-6xl">
    <h2 class="text-[28px] leading-[28px] font-semibold mb-12">Calculadora de préstamos</h2>
    <div class="grid lg:grid-cols-2 grid-cols-1">
      <form class="lg:border-r border-[#ECECEC] lg:pr-6">
        <div class="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div class="form-group">
            <label class="mb-2">Monto inicial</label>
            <div class="relative flex">
              <input type="text" class="form-control" value="USD$64,500.00">
              <span class="bg-primary-100 text-neutral-white font-semibold text-sm p-2.5 rounded-tr-lg rounded-br-lg">30.00%</span>
            </div>
          </div>
          <div class="form-group">
            <label class="mb-2">Cantidad de años</label>
            <div class="relative flex">
              <AtomsIcon name="general/calendar_month" :size=19 class="text-primary-100 absolute left-3 top-2.5" />
              <select class="form-control">
                <option value="">10 años</option>
                <option value="">20 años</option>
                <option value="">30 años</option>
              </select>
              <AtomsIcon name="arrows/arrow-down" :size=16 class="text-primary-100 absolute right-3 top-3" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="mb-2">Tasa de interes %</label>
          <div class="relative">
            <AtomsIcon name="general/bank" :size=20 class="text-primary-100 absolute left-3 top-2.5" />
            <input type="text" class="form-control with-icon rounded-lg w-full pl-12" value="15%">
          </div>
        </div>
      </form>
      <div class="lg:pl-6 max-w-3xl lg:mt-0 mt-8">
        <div class="flex md:flex-row flex-col gap-6 md:items-center">
          <div class="flex-none">
            <label class="m-0">Monto inicial</label>
            <p class="text-bx"><b class="text-primary-100">US$64,500.00 |</b> 30.00%</p>
          </div>
          <!--  -->
          <div class="progress">
            <div class="progress-status" style="width: 70px;"></div>
          </div>
          <!--  -->
          <div class="flex-none">
            <label class="m-0">Monto del préstamo</label>
            <p class="text-bx"><b class="text-primary-100">US$150,500.00 |</b> 70.00%</p>
          </div>
        </div>
        <hr class="border-[#ECECEC] my-4">
        <div class="flex md:flex-row flex-col md:items-center md:justify-end">
          <div class="md:mb-0 mb-4">
            <label class="m-0">Cuota mensual estimada</label>
            <p class="text-[28px] text-primary-100 font-semibold md:text-right"> {{ showParsedPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        price: 500000,
      }
    },
    computed: {
      showParsedPrice(price) {
        return this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
}
</script>
<style lang="postcss" scoped>
label {
  @apply text-sm text-neutral-black font-normal block;
}

.form-control {
  @apply flex-grow border-2 border-[#ECECEC] flex items-center rounded-tl-lg rounded-bl-lg pl-2.5 text-sm text-neutral-black h-10 font-medium focus:outline-primary-90;

  &.with-icon { @apply px-12; }
}

select.form-control { @apply rounded-lg pl-11 appearance-none; }

.progress {
  @apply w-full h-1.5 bg-gray-300 rounded-lg overflow-hidden;
  & .progress-status { @apply bg-primary-100 h-full rounded-r-lg; }
}

.btn { @apply rounded-lg !important; }
</style>