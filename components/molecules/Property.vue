<template>
  <article>
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      :class="{active: isFavorite}"
      @click="toggleFavorite()"
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
        <NuxtLink :to="`/search/${propertyId}`">
          <figure class="h-52">
            <img :src="`https://walrus-app-e2bxo.ondigitalocean.app/${property.image}`" :alt="property.name" class="object-cover h-full w-full">
          </figure>
        </NuxtLink>
      </SwiperSlide>
      <AtomsPropertyPlans class="absolute bottom-0 right-0 z-10" />
      <nav v-if="property.images">
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
    <NuxtLink :to="`/search/${propertyId}`">
      <p class="property-title">{{property.name }}</p>
      <p class="address">
        <AtomsIcon
          name="general/share-location"
          :size=20
          class="text-primary-100 mr-2.5 pt-1"
        />
        {{ property.address }}
      </p>
      <!-- Caracteristicas -->
      <MoleculesCharacteristics class="my-3"
        :bedroom="property.bedroom"
        :parking="property.parking"
        :bath="property.bathroom"
        :area="property.solar_meters"
      />
      <!-- Price -->
      <p class="price-title">Desde:</p>
      <p class="price">
        US${{showParsedPrice(property.price_us)}}
      </p>
      <p class="price">
        RD${{showParsedPrice(property.price)}}
      </p>
    </NuxtLink>
  </article>
</template>

<script>
import { useAuthStore } from '~/stores/Auth';
import Swal from 'sweetalert2';
export default {
  props: {
    property: {
      type: Object,
      default: () => {}
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    propertyId: {
      type:Number
    }
  },
  data() {
    return {
      config: useRuntimeConfig(),
      route: useRouter(),
      auth: useAuthStore()
    }
  },
  methods: {
    showParsedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async addFavorite() {
      const {data} = await useFetch('users/favorites',{
        method: 'post',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: { property_id: this.property.id},
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response._data.code === 400 ) {
            Swal.fire({
              icon: 'error',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }

          if(response._data.code === 200) {
            Swal.fire({
              icon: 'success',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
            this.isFavorite = true;
          }
        }
      });
    },
    async deleteFavorite() {
      const {data} = await useFetch('users/favorites',{
        method: 'delete',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        body: { property_id: this.property.id},
        baseURL: this.config.public.API,
        onResponse({response}) {
          if(response._data.code === 400 ) {
            Swal.fire({
              icon: 'error',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }

          if(response._data.code === 200) {
            Swal.fire({
              icon: 'success',
              text: response._data.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      });
    },
    toggleFavorite() {
      if(this.auth.isLoggedIn) {
        if(this.isFavorite) {
          this.deleteFavorite();
        } else {
          this.addFavorite();
        }

      } else {
        this.$swal.fire({
          icon: 'error',
          text: 'Necesitas iniciar sesion para poder agregar esta propiedad a favoritos',
          showConfirmButton: true,
          timer: 2000
        });
      }
    }
    //end methods
  },
  mounted() {
    console.log(this.property)
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full  relative;

  &:hover { box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07); }

  & > button.favorite-button {
    @apply absolute right-4 top-4 z-[5] bg-neutral-white border border-primary-50 hover:bg-primary-90 text-[#ADADAD] hover:text-neutral-white !important;
    &.active { @apply bg-primary-100 text-neutral-white hover:bg-primary-90 !important; }
  }

  & > a, & h6 { @apply font-semibold text-neutral-black mt-3 text-base block; }

  & .property-title {
    @apply overflow-hidden truncate whitespace-nowrap w-11/12;
  }

  & .address { @apply flex items-start font-normal text-neutral-black my-3 overflow-hidden truncate whitespace-nowrap w-11/12; }

  & .price-title { @apply text-sm text-neutral-black font-normal; }
  & .price { @apply text-primary-100 font-semibold text-xl uppercase; }

  & .swiper:hover > nav { @apply flex; }

  & nav { @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
  }
}
</style>
