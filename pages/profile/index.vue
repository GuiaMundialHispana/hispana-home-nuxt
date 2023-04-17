<template>
  <section class="pb-32">
    <div class="xl:container mx-auto lg:px-16 md:px-8 px-4">
      <div class="profile-wrapper">
        <figure class="profile-image">
          <img :src="user.userData.profile_pic" :alt="user.userData.name">
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
        <button
          v-for="(buttonTab,index) in tabs"
          :key="buttonTab"
          :class="[{ active: tab === index}]"
          class="btn-tab"
          @click="tab = index"
        >
          {{ buttonTab }}
        </button>
      </nav>
      <PopulationProfileAdvertisement v-show="tab === 0" />
      <PopulationProfileFavorite v-show="tab === 1" />
      <PopulationProfilePlans v-show="tab === 2" />
    </div>
  </section>
</template>

<script setup>
  import { useUserStore } from '~/stores/User';
  const tabs = ref(['Mis anuncios','Favoritos','Mis Planes'])
  const tab = ref(0);
  const user = useUserStore();
  definePageMeta({
    middleware: ["logger"]
  });
  onBeforeMount(() => {
    user.getProfile()
  });
</script>

<style lang="postcss" scoped>
.profile-wrapper {
  @apply flex items-center justify-center gap-5 py-16 border-b border-gray-300 mb-10;
  & .profile-image img { @apply w-[117px] h-[117px] rounded-full border-4 border-primary-50; }
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