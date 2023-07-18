<template>
  <div>
    <NuxtLoadingIndicator />
    <OrganismHeader />
    <main class="lg:pt-[102px] pt-16">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>