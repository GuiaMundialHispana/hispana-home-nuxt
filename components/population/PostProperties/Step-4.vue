<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
const currencyTab = ref(true);
const name = ref('');
let price = ref(Number);
let price_us = ref(Number);
const bedrooms = ref(Number);
const bathrooms = ref(Number);
const parking = ref(Number);
const meter = ref(Number);
const meter_2 = ref(Number);
const description = ref('');
const property_status = ref('');
const propertyStatus = ['New', 'Used'];
const feature = ref(['']);
let features = [];
let countries = [];
let country = ref(0);
let sectors = reactive([]);
let sector = ref(0);
let displaySector = ref(false);
let cities = reactive([]);
let city = ref([]);
let displayCity = ref(false);
let categories = [];
let lat = null;
let log = null;
let address = ref('');

let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

let featuresApi = await $fetch('generals/features', {
  baseURL: config.public.API
});
features = featuresApi.results;

let categoriesApi = await $fetch('generals/categories', {
  baseURL: config.public.API
});
categoriesApi.results = categories;

async function getStates(country_id) {
  const statesApi = await $fetch(`generals/states/${country_id}`, {
    baseURL: config.public.API
  });
  sectors.push(statesApi.results.data);
};

async function getCities(sector_id) {
  const citiesApi = await $fetch(`generals/cities/${sector_id}`, {
    baseURL: config.public.API
  });
  cities.push(citiesApi.results.data);
};

function getAddress(lant, long, location) {
  lat = lant;
  log = long;
  address.value = location;
};

watch(country,(country_id) => {
  getStates(country_id);
  displaySector.value = true;
});

watch(sector,(sector_id) => {
  getCities(sector_id);
  displayCity.value = true;
});

watch(price,(new_price) => {
  price_us.value = parseInt(new_price / 58);
});

function save_data() {
  use_posts.name = name.value;
  use_posts.price = price.value;
  use_posts.price_us = price_us.value;
  use_posts.lat = lat;
  use_posts.log = log;
  use_posts.address = address.value;
  use_posts.country = country.value;
  use_posts.sector = sector.value;;
  use_posts.city = city.value;
  use_posts.bedrooms = bedrooms.value;;
  use_posts.bathrooms = bathrooms.value;;
  use_posts.parking = parking.value;
  use_posts.property_status = property_status.value;;
  use_posts.feature = feature.value;
  use_posts.meter = meter.value;
  use_posts.meter_2 = meter_2.value;
  use_posts.description = description.value;
};

</script>


<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-primary-100">inmueble</span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-3 sm:mx-auto gap-4 max-w-[995px]">
    <!-- Nombre -->
    <label class="col-span-3 sm:mb-2 mb-5">
      Nombre del proyecto
      <input class="form-control" v-model="name" placeholder="Nombre del proyecto" type="text">
    </label>
    <!-- Price -->
    <div class="flex col-span-3 sm:mb-2 mb-5">
      <label class="w-full">
        Precio
        <input v-if="currencyTab"
          class="form-control"
          v-model="price"
          placeholder="Precio Dominicano"
          type="number"
        >
        <input v-if="!currencyTab"
          class="form-control"
          v-model="price_us"
          placeholder="Precio en Dolares"
          type="number"
        >
      </label>
      <div class="flex items-center ml-2.5">
        <button 
          class="price-btn border-l rounded-l-md" 
          :class="{'active': currencyTab}" 
          @click="currencyTab = true">RD
        </button>
        <button 
          class="price-btn border-r rounded-r-md" 
          :class="{'active': !currencyTab}" 
          @click="currencyTab = false">USD
        </button>
      </div>
    </div>
    <!-- Map -->
    <div class="col-span-3">
      <!-- <ClientOnly>
        <PopulationPostPropertiesMap @send-location="getAddress"/>
      </ClientOnly> -->
    </div>
    <!-- Direccion -->
    <div class="col-span-3">
      <label class="w-full sm:mb-2 mb-5">
      Direccion
      <input class="form-control" readonly v-model="address" placeholder="Direccion" type="text">
    </label>
    </div>
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5">
      País
      <select class="form-control col-span-3" v-model="country">
        <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
        {{ country.name }}
        </option>
      </select>
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5" v-if="displaySector">
      Sector
      <select class="form-control col-span-3" v-model="sector">
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
        {{ sector.name }}
        </option>
      </select>
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5" v-if="displayCity">
      Ciudad
      <select class="form-control" v-model="city">
        <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
        {{ item.name }}
        </option>
      </select>
    </label>
    <!-- Habitaciones, banos, parqueos -->
    <div class="col-span-3 gap-4 sm:grid grid-cols-2">
      <label class="w-full sm:mb-2 mb-5">
        Habitaciones
        <input class="form-control" v-model="bedrooms" placeholder="Cantidad de habitaciones" type="number">
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Baños
        <input class="form-control" v-model="bathrooms" placeholder="Cantidad de baños" type="number">
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Parqueos
        <input class="form-control" v-model="parking" placeholder="Cantidad de parqueos" type="number">
      </label>
      <div class="mb-5 sm:mb-0">
        <label for="propertyStatus" class="mb-2">Estado</label>
        <select class="form-control" v-model="property_status" id="propertyStatus">
          <option v-for="status in propertyStatus" :key="status" :value="status" class="option-label">
            {{ status }}
          </option>
        </select>
      </div>
    </div>
    <!-- Amenidades -->
    <div class="col-span-3">
      <label for="amenities" class="mb-2">Otras amenidades</label>
      <select
        id="amenities"
        class="form-control select-multiple col-span-3 sm:mb-2 mb-5"
        v-model="feature"
        multiple>
        <option
          v-for="item in features"
          :value="item.id"
          :key="item"
          class="option-label"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <!-- Superficie de construccion y total -->
    <div class="col-span-3 w-full gap-4 sm:flex sm:mb-2 mb-5">
      <label class="w-full mb-5 sm:mb-0">
        Superficie de construcción
        <input class="form-control" v-model="meter" placeholder="Metros²" type="number">
      </label>
      <label class="w-full">
        Superficie de total
        <input class="form-control" v-model="meter_2" placeholder="Metros²" type="number">
      </label>
    </div>
    <!-- Descripcion -->
    <div class="flex flex-col col-span-3">
      <label>Descripción</label>
      <textarea type="text" v-model="description" placeholder="Descripcion de la propiedad"></textarea>
    </div>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts'), save_data()">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }

label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
}
.form-control {
  @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
}

.select-multiple { @apply h-40; }
.price-btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}

textarea {
  @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
}
</style>