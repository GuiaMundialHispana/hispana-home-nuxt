<template>
  <section class="pb-32">
    <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
      <div class="profile-wrapper">
        <figure class="profile-image">
          <img :src="`https://seal-app-4mhut.ondigitalocean.app/${user.userData.profile_pic}`" v-if="user.userData.profile_pic != null || ''" :alt="user.userData.name">
          <img src="/img/user.jpg" v-if="user.userData.profile_pic === null || ''" :alt="user.userData.name">
        </figure>
        <div class="profile-information">
          <h3>
            <span class="text-primary-100">Hola,</span><br class="md:block hidden">
            {{user.userData.name}} {{user.userData.lastname}}
          </h3>
          <AtomsLink btn-style="outline-primary" link-to="/profile/editProfile">Editar perfil</AtomsLink>
        </div>
      </div>
      <nav class="user-filter">
        <NuxtLink
          class="btn-tab"
          :class="{ active: $route.fullPath === '/profile?tab=anuncio'} "
          :to="{ path: 'profile', query: { tab: 'anuncio' }}"
        >
          Mis anuncios
        </NuxtLink>
        <NuxtLink
          class="btn-tab"
          :to="{ path: 'profile', query: { tab: 'favorite' }}"
          :class="{ active: $route.fullPath === '/profile?tab=favorite'} "
        >
          Mis favoritos
        </NuxtLink>
        <NuxtLink
          class="btn-tab"
          :to="{ path: 'profile', query: { tab: 'plan' }}"
          :class="{ active: $route.fullPath === '/profile?tab=plan'} "
        >
          Mis planes
        </NuxtLink>
      </nav>
      <PopulationProfileAdvertisement v-show="$route.query.tab === 'anuncio'" />
      <PopulationProfileFavorite v-show="$route.query.tab === 'favorite'" />
      <PopulationProfilePlans v-show="$route.query.tab === 'plan'" /> 
    </div>
  </section>
</template>

<script setup>
  import { useUserStore } from '~/stores/User';
  definePageMeta({
    middleware: 'check-auth'
  });
  const user = useUserStore();
</script>

<style lang="postcss" scoped>
.profile-wrapper {
  @apply flex items-center justify-center gap-5 py-16 border-b border-gray-300 mb-10;
  & .profile-image img { @apply overflow-hidden w-[117px] h-[117px] rounded-full object-cover object-center border-4 border-primary-50; }
  & h3 { @apply text-[28px] leading-[28px] font-semibold mb-4; }
}

.user-filter {
  @apply border-b border-gray-300 mb-10 flex md:overflow-hidden overflow-x-scroll;
  & .btn-tab {
    @apply flex-none mr-8 hover:text-primary-100 hover:border-b hover:border-primary-100 text-neutral-black text-base pb-2;
    &.active { @apply text-primary-100 border-b border-primary-100;}
  }
}
</style>