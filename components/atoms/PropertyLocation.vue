<template>
  <span class="w-44">
    <AtomsIcon name="general/share-location" class="mr-2" />
    {{ location }}
  </span>
</template>

<script setup>
const props = defineProps({
  location: {
    type: String,
    default: 'Location'
  },
});
</script>

<style lang="postcss" scoped>
span {
  @apply bg-neutral-black bg-opacity-50 text-neutral-white text-xs p-1 rounded-lg flex items-center font-normal;
}
</style>