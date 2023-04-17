<template>
  <article>
    <!-- Favorite -->
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      :class="{active: isFavorite}"
      @click="toggleFavorite, $emit('propertyChanged')"
    />
    <Swiper
      class="relative rounded-lg overflow-hidden"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }">
      <SwiperSlide>
        <figure class="h-52">
          <img :src="property.property.image" :alt="property.property.name" class="object-cover h-full w-full">
        </figure>
      </SwiperSlide>
      <AtomsPropertyPlans class="absolute bottom-0 right-0 z-10" />
      <nav>
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-left"
          :icon-size=15
        />
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-right"
          :icon-size=15
        />
      </nav>
    </Swiper>
    <NuxtLink to="/search/propiedad-1">{{ property.property.name }}</NuxtLink>
    <p class="flex items-start font-normal text-neutral-black my-3">
      <AtomsIcon name="general/share-location" :size=20 class="text-primary-100 mr-2.5 pt-1"/>
      {{ property.property.address }}
    </p>
    <!-- Caracteristicas -->
    <MoleculesCharacteristics class="my-3"
      :bedroom="property.property.bedroom"
      :bath="property.property.bathroom"
      :area="property.property.solar_meters"
    />
    <!-- Price -->
    <p class="text-sm text-neutral-black font-normal">Desde:</p>
    <p class="text-primary-100 font-semibold text-xl uppercase">US${{property.property.price}}</p>
  </article>
</template>

<script>
import { useUserStore } from '~/stores/User';
export default {
  name: 'Property',
  data() {
    return {
      user: useUserStore(),
      favorite: false,
    }
  },
  props: {
    property: {
      type: Object,
      default: () => {}
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async addFavorite() {
      const {data} = await useFetch(this.user.auth.API+'users/favorites',{
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
        body: {
          property_id: this.property.property.id
        }
      });

      if(data) {
        this.$swal({
          icon: 'success',
          text: data._value.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    async deleteFavorite() {
      const {data} = await useFetch(this.user.auth.API+'users/favorites',{
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
        },
        body: {
          property_id: this.property.property.id
        }
      });

      if(data) {
        this.$swal({
          icon: 'success',
          text: data._value.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  },
  computed: {
    toggleFavorite() {
      if(this.isFavorite) {
        return this.deleteFavorite();
      } else { return this.addFavorite(); }
    }
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full lg:max-w-[350px] relative;

  &:hover { box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07); }

  & > button.favorite-button {
    @apply absolute right-4 top-4 z-10 bg-neutral-white border-none hover:bg-primary-90 text-[#ADADAD] hover:text-neutral-white !important;
    &.active { @apply bg-primary-100 text-neutral-white hover:bg-primary-90 !important; }
  }

  & a, & h6 { @apply font-semibold text-neutral-black mt-3 text-base block; }

  & .swiper:hover > nav { @apply flex; }

  & nav { @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
  }
}
</style>
