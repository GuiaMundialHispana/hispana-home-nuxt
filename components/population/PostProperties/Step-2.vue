<script setup>
const config = useRuntimeConfig()
let categories = ref([]);
let categorySelected = ref(0);
const categoriesApi = await $fetch('generals/categories', {
  baseURL: config.public.API
});
categories = categoriesApi.results;
console.log(categories)

</script>

<template>
  <h4>
    ¿Cuál es tu tipo de <span class="text-primary-100"> inmueble?</span>
  </h4>
  <div class="wrapper scrollbar">
    <label
      v-for="category in categories"
      :key="category"
      class="option"
      :class="[{checked: categorySelected === category.id}]">
      <input type="radio" :value="category.id" v-model="categorySelected">
      {{ category.name }}
    </label>
  </div>
</template>

<style lang="postcss" scoped>
h4 {
  @apply font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center;
}
.wrapper {
  @apply max-w-[971px] h-[490px]  overflow-y-scroll hover:overscroll-contain mx-auto px-5;
}
.option {
  @apply cursor-pointer select-none flex items-center font-normal text-base  leading-[22px] border-b h-[70px] border-b-gray-100 hover:bg-primary-50 px-4;
  &.checked {
    @apply bg-primary-100 text-neutral-white font-semibold text-lg;
  }
  & input { @apply appearance-none; }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply lg:w-[68px] w-[28px];
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply lg:border-[30px] border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}
</style> 