<template>
  <div class="mx-4 sm:w-[568px] mb-6 sm:grid sm:grid-cols-2 sm:mx-auto gap-4">
    <div class="flex flex-col">
      <label for="name">Nombre</label>
      <input class="form-control mt-2" placeholder="Nombre" type="text" id="name">
    </div>
    <div class="flex flex-col">
      <label for="email">Correo</label>
      <input class="form-control mt-2" placeholder="Correo" type="email"  id="email">
    </div>
    <div class="flex flex-col col-span-2">
      <label for="message">Mensaje</label>
      <textarea v-model="message" class="mt-2 border border-[#D9D9D9] text-sm rounded-sm px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal h-14 focus:outline-primary-100" type="text" id="message" maxlength="100"></textarea>
      <p :class="[{limit: message.length === 100}]" class="ml-auto text-neutral-black text-base opacity-25">{{ message.length }}/100</p>
    </div>
    <div class="mr-auto mt-4 sm:mt-1 col-start-2 sm:mr-0 ml-auto flex justify-end">
      <AtomsButtons
          class="font-semibold"
          btn-size="xsmall"
          btn-style="solid-primary"
          >Enviar
      </AtomsButtons>
    </div>
  </div>
  
</template> 
<script>
export default{
  data() {
    return {
      message: '',
    }
  }
}
</script>
<style lang="postcss" scoped>
  label {
    @apply font-normal text-sm mr-2 text-opacity-[0.85];
  }
  .form-control {
    @apply h-8 border border-[#D9D9D9] text-sm rounded-sm px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
  }
  .btn { @apply rounded-sm !important; }
  .limit { @apply font-semibold text-primary-100 opacity-100}
</style>
