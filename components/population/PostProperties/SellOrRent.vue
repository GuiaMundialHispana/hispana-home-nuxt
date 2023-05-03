
<template>
  <div class="flex flex-col text-center items-center justify-center">
    <h4 class="font-semibold text-[28px] leading-[42px] my-20">
      <span class="text-primary-100">
        Vamos a comenzar
      </span>
      <br>
      ¿Vas a vender o alquilar?
    </h4>
    <div class="flex gap-2.5">
      <label class="option" :class="[{checked: optionSelected === 'sell'}]">Vender
        <input
          type="radio"
          value="Sell"
          name="sell"
          @click="$emit('optionSelected', 'Sell'); optionSelected = 'sell'"
        >
      </label>
      <label class="option" :class="[{checked: optionSelected === 'rent'}]">Alquilar
        <input
          type="radio"
          value="rent"
          name="rent"
          @click="$emit('optionSelected', 'Rent'); optionSelected = 'rent'"
        >
      </label>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      optionSelected: ""
    }
  }
}
</script>
<style lang="postcss" scoped>
.option {
  @apply sm:w-56 w-36  text-center text-base mb-14 cursor-pointer select-none flex items-center justify-center font-normal leading-[22px] border h-10 border-gray-300 rounded-md hover:bg-primary-100 hover:text-neutral-white hover:border-none
  ;
  &.checked {
    @apply bg-primary-100 text-neutral-white font-semibold text-lg hover:bg-primary-90 !important;
  }
  & input { @apply appearance-none; }
}
</style>
