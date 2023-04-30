<template>
  <nav class="bg-[#F0F0F073] shadow-inner">
    <div class="steps-wrapper">
      <div class="active">
        <span>1</span>
        <p>Vender o alquilar</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 2}]">
      <div :class="[{active: step >= 2}]">
        <span>2</span>
        <p>Categoría</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 3}]">
      <div  :class="[{active: step >= 3}]">
        <span>3</span>
        <p>Paquete</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 4}]">
      <div :class="[{active: step >= 4}]">
        <span>4</span>
        <p>Detalles</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{active: step >= 5}]">
      <div :class="[{active: step >= 5}]">
        <span>5</span>
        <p>Fotos</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{active: step === 6}]">
      <div class="last-step">
        <span>&#x2713</span>
        <p>Finalizado</p>
        <hr class="hidden lg:block border-primary-100 border w-12 ml-2" :class="[{'w-20': step === 6}]">
        <img v-if="step < 6" class="hidden lg:block w-[177px]" src="/img/property-post.png" alt="Property">
      </div>
    </div>
  </nav>
  <PopulationPostPropertiesSellOrRent @option-selected="getSentOrRent" v-if="step === 1" />
  <PopulationPostPropertiesCategory v-if="step === 2" />
  <PopulationPostPropertiesPlans v-if="step === 3" />
  <PopulationPostPropertiesDetails v-if="step === 4" />
  <PopulationPostPropertiesUploadPhotos v-if="step === 5" />
  <PopulationPostPropertiesFinalStep v-if="step === 6" />
  <nav class="flex gap-2.5 mx-auto w-fit mt-6 mb-11">
    <AtomsButtons
      v-if="step === 1"
      link-to="/"
      btn-style="outline-gray"
      btn-size="xsmall"
      >Cancelar
    </AtomsButtons>
    <AtomsButtons
      v-if="step >= 2 && step <= 5"
      @click="step--"
      btn-style="outline-gray"
      btn-size="xsmall"
      >Atrás
    </AtomsButtons>
    <AtomsButtons
      v-if="step <= 5"
      @click="step++"
      btn-style="solid-primary"
      btn-size="xsmall"
      >Continuar
    </AtomsButtons>
    <AtomsButtons
      v-if="step >= 6"
      link-to="/"
      btn-style="solid-primary"
      btn-size="xsmall"
      >Volver a inicio
    </AtomsButtons>
  </nav>
</template>

<script setup>
definePageMeta({
  middleware: ["logger"]
});
</script>

<script>
import { useUserStore } from '~/stores/User';
export default {
  data() {
    return {
      user: useUserStore(),
      type: '',
      step: 1
    }
  },
  methods: {
    getSentOrRent(n) {
      this.type = n;
    }
  },
  watch: {
    type() {
      console.log(this.type)
      this.step++;
    }
  },
  mounted() {
    this.user.getProfile()
  }
}
</script>

<style lang="postcss" scoped>
.steps-wrapper{
  @apply flex justify-between  items-center lg:h-48 h-20 w-fit mx-auto lg:px-8;
  & div{
    @apply flex items-center flex-none whitespace-nowrap gap-2 lg:pl-5 md:pl-3 first:pl-0;
    & p {
      @apply hidden md:block text-[#888888];
    }
    & span {
      @apply border border-[#bababa] text-[#bababa] rounded-full w-8 h-8 flex flex-none justify-center items-center; 
    }
  }
}
.active {
  & p{ @apply text-neutral-black !important; }
  & span{ @apply text-neutral-white bg-primary-100 border-none !important; }
}
.last-step {
  & p{ @apply hidden lg:block text-neutral-black !important; }
  & span{ @apply text-primary-100 border-primary-100 !important; }
};
.progress{
  @apply border-primary-100 !important;
}
</style>