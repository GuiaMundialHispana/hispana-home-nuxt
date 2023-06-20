<script lang="ts" setup>
import { watch } from 'vue';
const emit = defineEmits(['send-user-do', 'nexts']);
let optionSelected = ref('');
// <!-- TODO cambiar ese nombre del emit -->
watch(optionSelected,(value) => {
  emit('send-user-do', value);
});
</script>

<template>
  <div class="flex flex-col text-center items-center justify-center">
    <h4 class="my-20">
      <span class="text-primary-100">Vamos a comenzar</span>
      <br>
      ¿Vas a vender o alquilar?
    </h4>
    <div class="flex gap-2.5">
      <label class="option" :class="[{checked: optionSelected === 'sell'}]">
        Vender
        <input
          type="radio"
          value="Sell"
          name="sell"
          @click="optionSelected = 'sell'"
        >
      </label>
      <label class="option" :class="[{checked: optionSelected === 'rent'}]">
        Alquilar
        <input
          type="radio"
          value="rent"
          name="rent"
          @click="optionSelected = 'rent'"
          >
      </label>
    </div>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsLink btn-style="outline-primary" link-to="/profile?tab=anuncio">
      Cancelar
    </AtomsLink>
    <AtomsButtons :disabled="optionSelected === ''" @click="$emit('nexts')">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }
.option {
  @apply sm:w-56 w-36 text-center text-base mb-14 cursor-pointer select-none flex items-center justify-center font-normal leading-[22px] border h-10 border-gray-300 rounded-md hover:bg-primary-100 hover:text-neutral-white hover:border-none;

  &.checked {
    @apply bg-primary-100 text-neutral-white font-semibold text-lg hover:bg-primary-90 !important;
  }

  & input { @apply appearance-none; }
}
</style>
