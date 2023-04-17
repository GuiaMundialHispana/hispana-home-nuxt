<template>
  <footer class="w-full bg-primary-100 py-16">
    <div class="xl:px-24 lg:px-16 px-4 grid md:grid-cols-12 grid-cols-1 xl:gap-x-16 md:gap-x-10 gap-y-6 items-center 2xl:max-w-screen-2xl 2xl:mx-auto">
      <figure class="xl:col-span-2 lg:col-span-3 col-span-12">
        <NuxtLink to="/">
          <img src="/img/logo-footer.png" class="w-56 lg:mx-0 mx-auto object-contain" alt="Guia Mundial Hispana" />
        </NuxtLink>
      </figure>
      <div class="xl:col-span-4 lg:col-span-9 col-span-12">
        <p class="text-neutral-white text-sm font-normal lg:text-left text-center">
          {{ description.description }}
        </p>
      </div>
      <!--  -->
      <nav class="flex xl:flex-col md:flex-row flex-col gap-4 xl:justify-start justify-center xl:items-start items-center flex-none xl:col-span-2 col-span-12">
        <h6 class="uppercase text-neutral-white font-medium text-sm xl:block hidden">NAVEGACIÓN</h6>
        <NuxtLink class="link-to" :to="item.route" v-for="item in navigation" :key="item">
          {{ item.name }}
        </NuxtLink>
      </nav>
      <nav class="flex xl:flex-col md:flex-row flex-col gap-4 xl:justify-start justify-center xl:items-start items-center flex-none xl:col-span-2 col-span-12">
        <h6 class="uppercase text-neutral-white font-medium text-sm xl:block hidden">ACCESOS DIRECTOS</h6>
        <NuxtLink class="link-to" :to="item.route" v-for="item in directAccess" :key="item">
          {{ item.name }}
        </NuxtLink>
      </nav>
      <!--  -->
      <nav class="flex flex-none items-center xl:justify-start justify-center gap-2 xl:col-span-2 col-span-12">
        <a :href="socialLink.route" v-for="socialLink in socialMedia" :key="socialLink" class="social-link">
          <AtomsIcon :name="`social-media/${socialLink.icon}`" />
        </a>
      </nav>
    </div>
  </footer>
</template>

<script>
import Footer from '~/assets/mocks/Footer';
export default {
  name: 'AppFooter',
  data() {
    return {
      navigation: Footer.navigation,
      directAccess: Footer.directAccess,
      socialMedia: Footer.socialLinks,
      description: Footer.information
    }
  }
}
</script>

<style lang="postcss" scoped>
.link-to {
  @apply text-neutral-white text-sm block whitespace-nowrap;
}

.social-link {
  @apply w-8 h-8 border-2 border-neutral-white rounded-full flex items-center justify-center text-neutral-white flex-none;
}

.router-link-active {
  @apply font-bold !important;
}
</style>