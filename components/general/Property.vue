<template>
  <article>
    <!-- Agrega a favoritos-->
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      :class="{active: isFavorite}"
      @click="toggleFavorite()"
      v-if="$route.fullPath != '/profile?tab=anuncio'"
    />
    <!-- Editar la propiedad/ pero debo validar si esta logueado no solo con la ruta -->
    <NuxtLink :to="{ path: `edit-ad`, query: { slug: property.slug }}"
      class="btn-icon small active absolute left-4 z-10 top-1"
      v-if="$route.fullPath === '/profile?tab=anuncio'"
    >
      <AtomsIcon name="general/pencil" class="text-neutral-white" />
    </NuxtLink>
    <!-- Images slider -->
    <nav v-if="property.images">
      <AtomsButtons :class="`prev-${propertyId}`" class="prev" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-left" btn-size="xsmall" :icon-size=15 />
      <AtomsButtons :class="`next-${propertyId}`" btn-type="btn-icon" btn-style="outline-gray" icon-name="arrows/arrow-right" btn-size="xsmall" :icon-size=15 />
    </nav>
    <Swiper
      v-if="property.images"
      :modules="[SwiperNavigation]"
      class="relative rounded-lg overflow-hidden"
      :slides-per-view="1"
      :navigation="navigation">
      <SwiperSlide v-for="image in property.images" :key="image">
        <NuxtLink class="bg-gray-10" :to="`/search/${property.slug}`">
          <figure class="h-52 bg-gray-10">
            <div v-if="route.path === '/profile' && statusMessage !== ''" class="advertisements">
              <p :class="statusBackground">{{ statusMessage }}</p>
            </div>
            <NuxtImg
              :src="`${image.image}`"
              placeholder="/img/featured-properties-bg.jpg"
              alt="property.name"
              class="object-cover h-full w-full"
            />
          </figure>
        </NuxtLink>
      </SwiperSlide>
      <AtomsPropertyPlans :plan-type="propertyType" planPosition="bottom" class="absolute bottom-0 right-0 z-10" />
    </Swiper>
    <div v-else class="relative rounded-lg overflow-hidden">
      <NuxtImg
        :src="property.image"
        placeholder="/img/featured-properties-bg.jpg"
        alt="property.name"
        class="object-cover h-52 w-full"
      />
      <AtomsPropertyPlans :plan-type="propertyType" planPosition="bottom" class="absolute bottom-0 right-0 z-10" />
    </div>
    <!-- Information Card-->
    <NuxtLink :to="`/search/${property.slug}`" class="block mt-3">
      <h6 class="property-title">{{property.name }}</h6>
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
      <p v-if="currentPicked === 'USD'" class="price">US${{formatCurrency(property.price_us)}}</p>
      <p v-else class="price">RD${{formatCurrency(property.price)}}</p>
    </NuxtLink>
  </article>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/Auth';
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

const props = defineProps({
  property: {
    type: Object,
    default: () => ({})
  },
  propertyId: {
    type: Number
  },
  propertyType: {
    type: String,
    default: ''
  },
  statusMessage: {
    type: String,
    default: ''
  },
  statusBackground: {
    type: String,
    default: ''
  }
});

const currentPicked = useState('currentPicked')
const config = useRuntimeConfig();
const route = useRouter();
const auth = useAuthStore();
const user_store = useUserStore();
const isFavorite = ref(false);
const isLogged = useState('isLogged');

function formatCurrency(price: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price,);
}

const navigation = ref({
  nextEl: `.next-${props.propertyId}`,
  prevEl: `.prev-${props.propertyId}`
});

const token = useState('token');
const addFavorite = async () => {
  const { data, error } = await useFetch('users/favorites', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token.value}`},
    body: { property_id: props.property.id },
    baseURL: config.public.API,
    onResponse({ response }) {
      if (response._data.code === 400) {
        Swal.fire({
          icon: 'error',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }

      if (response._data.code === 200) {
        Swal.fire({
          icon: 'success',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
        useUser().getUser()
      }
    }
  });
  if (data) { isFavorite.value = true; }
};

const deleteFavorite = async () => {
  const { data } = await useFetch('users/favorites', {
    method: 'delete',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: { property_id: props.property.id },
    baseURL: config.public.API,
    onResponse({ response }) {
      if (response._data.code === 400) {
        Swal.fire({
          icon: 'error',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }

      if (response._data.code === 200) {
        isFavorite.value = false;
        Swal.fire({
          icon: 'success',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
  if (data) { isFavorite.value = false; }
};

const toggleFavorite = () => {
  if (isLogged.value) {
    if (isFavorite.value) {
      deleteFavorite();
    } else {
      addFavorite();
    }
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Necesitas iniciar sesion para poder agregar esta propiedad a favoritos',
      showConfirmButton: true,
      timer: 2000
    });
  }
};

onMounted(() => {
  if (useRoute().fullPath === "/profile?tab=favorite") {
    isFavorite.value = true;
  }
});
</script>

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full relative;

  &:hover {
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07);
    nav { @apply flex; }
  }

  .favorite-button {
    @apply absolute right-4 top-4 z-[5] bg-neutral-white border border-primary-50 hover:bg-primary-90 text-[#ADADAD] hover:text-neutral-white !important;

    &.active {
      @apply bg-primary-100 text-neutral-white hover:bg-primary-90 !important;
    }
  }

  .property-title {
    @apply overflow-hidden truncate whitespace-nowrap w-11/12;
  }

  .address {
    @apply flex items-start font-normal text-neutral-black my-3 overflow-hidden truncate whitespace-nowrap w-11/12;
  }

  .price-title {
    @apply text-sm text-neutral-black font-normal;
  }

  .price {
    @apply text-primary-100 font-semibold text-xl uppercase;
  }

  nav {
    @apply hidden justify-between w-full  !text-primary-100 absolute left-0 top-[25%] z-[5] px-4;
  }

  & button {
    @apply bg-neutral-white hover:bg-primary-100 border-none !important;
  }

  .advertisements {
    @apply absolute z-20 text-neutral-white top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-40 bg-neutral-white;

    & p {
      @apply py-1.5 px-[15px] rounded-lg text-base w-fit text-center min-w-[209px];
    }
  }

  .btn-icon {
    @apply bg-primary-100 inline-flex justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none;

    &.small {
      @apply w-8 rounded-full h-8;
    }
  }

}
</style>
