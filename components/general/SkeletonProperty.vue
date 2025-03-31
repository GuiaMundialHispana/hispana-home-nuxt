<template>
  <div class="pt-6 md:pt-14 lg:px-16 md:px-6 px-4 mx-auto max-w-[97rem];">
    <div class="container flex flex-wrap gap-8">
      <div v-for="index in 3" :key="index">
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-date"></div>
          <div class="skeleton-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.skeleton {
  @apply border border-neutral-10 rounded-lg p-3 w-[350px];
  & .skeleton-image { @apply w-full md:h-72 h-[230px] bg-neutral-10 mb-3; }
  & .skeleton-date { @apply w-32 h-4 bg-neutral-10 mb-2; }
  & .skeleton-body { @apply w-4/5 h-4 bg-neutral-10; }
}
</style>