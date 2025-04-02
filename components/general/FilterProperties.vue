<template>
  <div class="absolute left-0 bottom-[-6%] text-[#232323] z-10">
    <div class=" filterStatus-tabs-lg">
      <AtomsButtons
        v-for="(btn,i) in types"
        @click="sendPath = btn.getPath, sendType = btn.getType, btnSelected = i"
        :class="{active: i === btnSelected}"
        :key="i">
        {{btn.name}}
      </AtomsButtons>
    </div>
    <div class="filter-home-wrapper">
      <div class="h-full flex justify-center">
        <button class="filter-btn" @click="toggleList('location')">
          <div class="icon-container">
            <AtomsIcon class="text-primary-100" name="general/location" :size=20 />
          </div>
          <div>
            <h2>Ubicación</h2>
            <p>
              Selecciona el Sector 
              <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
            </p>
          </div>
        </button>
        <OnClickOutside @trigger="toggleList('location')" v-if="dropdownLists.location" class="dropdown w-[240px]">
          <!-- Country -->
          <button class="sector-filter-btn" :class="{'active': dropdownLists.country}" @click="toggleList('country')">
            Pais <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
          </button>
          <OnClickOutside v-if="dropdownLists.country" @trigger="toggleList('country')">
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[283px]">
              <label class="checkbox-labels" v-for="country in countries" :key="country" :for="country.name">
                <input
                  type="radio"
                  class="checkbox"
                  name="country"
                  v-model="country_id"
                  :value="country.id"
                  :id="country.name"
                >
                {{ country.name }}
              </label>
            </div>
          </OnClickOutside>
          <!-- States -->
          <button v-if="states.length > 0" class="sector-filter-btn" :class="{'active': dropdownLists.sector}" @click="toggleList('sector')">
            Ciudad <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
          </button>
          <OnClickOutside v-if="dropdownLists.sector" @trigger="toggleList('sector')">
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
              <label class="checkbox-labels" :for="sector.name" v-for="sector in states" :key="sector">
                <input
                  type="radio"
                  class="checkbox"
                  name="sector"
                  v-model="state_id"
                  :value="sector.id"
                  :id="sector.name"
                >
                {{ sector.name }}
              </label>
            </div>
          </OnClickOutside>
          <!-- Citys -->
          <button v-if="cities.length > 0" class="sector-filter-btn" :class="{'active': dropdownLists.city}" @click="toggleList('city')">
            Sector <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
          </button>
          <OnClickOutside v-if="dropdownLists.city" @trigger="toggleList('city')">
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
              <label class="checkbox-labels" :for="city.name" v-for="city in cities" :key="city">
                <input
                  type="radio"
                  class="checkbox"
                  name="city"
                  v-model="city_id"
                  :value="city.id"
                  :id="city.name"
                >
                {{ city.name }}
              </label>
            </div>
          </OnClickOutside>
        </OnClickOutside>
      </div>
      <!-- Categoria -->
      <span class="buttons-separation"></span>
      <div class="flex justify-center">
        <button class="filter-btn" :class="{'active': dropdownLists.propertyType}" @click="toggleList('propertyType')">
          <div class="icon-container">
            <AtomsIcon class="text-primary-100" name="general/property" :size=20 />
          </div>
          <div>
            <h2>Tipo de propiedad</h2>
            <p>Selecciona el tipo de propiedad
              <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
            </p>
          </div>
        </button>
        <OnClickOutside @trigger="toggleList('propertyType')" v-if="dropdownLists.propertyType" class="dropdown w-[288px] h-[273px]">
          <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
              <input
                type="radio"
                class="checkbox"
                name="category"
                v-model="category_id"
                :value="category.id"
                :id="category.name"
              >
              {{ category.name }}
            </label>
          </div>
        </OnClickOutside>
      </div>
      <!-- Precio -->
      <span class="buttons-separation"></span>
      <div class="h-full flex justify-center">
        <button class="filter-btn" :class="{'active': dropdownLists.priceRange}" @click="toggleList('priceRange')">
          <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/price" :size=20 />
        </div>
        <div>
          <h2>Rango de precio</h2>
          <p>Selecciona el rango de precio
            <AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
          </p>
        </div>
        </button>
        <OnClickOutside @trigger="toggleList('priceRange')" v-if="dropdownLists.priceRange" class="dropdown w-[238px] h-fit">
          <p class="flex justify-between text-base text-neutral-black">
            Precio
            <label for="RD" class="price-btn ml-auto">
              <input type="radio" id="RD" value="RD" name="currency" checked v-model="picked">
            </label>
            <label for="USD" class="price-btn">
              <input type="radio" id="USD" value="USD" name="currency" v-model="picked">
            </label>
          </p>
          <MultiRangeSlider class="mx-auto mt-[14px] w-[200px]"
            baseClassName="multi-range-slider-bar-only"
            :min="0"
            :max="maxPrice"
            :step="priceRangeSteps"
            :ruler="false"
            :label="false"
            :minValue="barMinValue"
            :maxValue="barMaxValue"
            @input="UpdateValues"
          />
          <p class="whitespace-normal text-sm font-medium">
            Desde <b>{{picked}}${{ showBarMinValue }}</b>
            hasta <b>{{picked}}${{ showBarMaxValue }}</b>+
            {{publishedBooksMessage  }}
          </p>
        </OnClickOutside>
      </div>
      <span class="buttons-separation"></span>
      <button class="filter-btn rounded-btn" @click="searchProperties()">
        <AtomsIcon class="text-neutral-white" name="general/search" :size=22 />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import MultiRangeSlider from 'multi-range-slider-vue';

const router = useRouter();
const config = useRuntimeConfig();

const btnSelected = ref(0);
const types = [
  { getPath: '/resultados?type=All', getType: 'All', name: 'Todo' },
  { getPath: '/resultados?type=Sale', getType: 'Sale', name: 'Comprar' },
  { getPath: '/resultados?type=Rent', getType: 'Rent', name: 'Rentar' }
];

const dropdownLists = reactive({
  location: false,
  propertyType: false,
  priceRange: false,
  country: false,
  city: false,
  municipality: false,
  sector: false,
});

const barMinValue = ref(0);
const barMaxValue = ref(10000000);
const showBarMinValue = ref('0');
const showBarMaxValue = ref('10,000,000');
const maxPrice = ref(50000000);
const { countries, getStates, states, getCities, cities } = useGetCountry();
const country_id = ref(0);

const city_id = ref(0);
const categories = ref([]);
const category_id = ref(0);
const state_id = ref(0);
const picked = ref('RD');
const price = ref('');
const priceRangeSteps = ref(500000);
const queryBody = reactive({});
const sendPath = ref('/resultados?type=All');
const sendType = ref('All');

const UpdateValues = (e: any) => {
  barMinValue.value = e.minValue;
  barMaxValue.value = e.maxValue;
  showBarMinValue.value = barMinValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  showBarMaxValue.value = barMaxValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  price.value = barMinValue.value.toString() + '-' + barMaxValue.value.toString();
};

const toggleList = (list: string) => {
  if (dropdownLists[list]) {
    setTimeout(() => {
      dropdownLists[list] = false;
    }, 50);
  } else {
    dropdownLists[list] = true;
  }
};

const searchProperties = async () => {
  router.push({
    path: sendPath.value,
    query: queryBody
  });
};

const getCategories = async () => {
  const categoriesApi = await $fetch(config.public.API + 'generals/categories');
  categories.value = categoriesApi.results;
};

watch(picked, (newPicked) => {
  queryBody.price_type = newPicked;
  if (newPicked === 'USD') {
    barMinValue.value = 0;
    barMaxValue.value = 1000000;
    showBarMinValue.value = '0';
    showBarMaxValue.value = '1,000,000';
    maxPrice.value = 3000000;
    priceRangeSteps.value = 50000;
  } else {
    barMinValue.value = 0;
    barMaxValue.value = 10000000;
    showBarMinValue.value = '0';
    showBarMaxValue.value = '10,000,000';
    maxPrice.value = 50000000;
    priceRangeSteps.value = 500000;
  }
});

watch(price, (newPrice) => {
  queryBody.price = newPrice;
});

watch(country_id, (newCountryId) => {
  getStates(newCountryId);
  queryBody.country_id = newCountryId;
});

watch(state_id, (newStateId) => {
  getCities(newStateId);
  queryBody.town_id = newStateId;
});

watch(city_id, (newCityId) => {
  queryBody.city_id = newCityId;
});

watch(sendType, (newRoute) => {
  queryBody.type = newRoute;
});

watch(category_id, (newCategoryId) => {
  queryBody.property_category_id = newCategoryId;
});

onMounted(() => {
  // getCountries();
  getCategories();
  queryBody.type = sendType.value;
  queryBody.price_type = picked.value;
});
</script>

<style lang="postcss" scoped>
.filter-home-wrapper {
  @apply overflow-hidden flex items-center w-fit h-[101px] bg-neutral-white rounded-2xl shadow-xl mt-3;
}
.filter-btn{
  @apply flex items-center h-full px-6 text-left;

  & h2{ @apply text-xl leading-8 font-semibold; }
  & p { @apply text-sm leading-[22px] flex items-center whitespace-nowrap;}

  &.rounded-btn{
    @apply justify-center rounded-full h-14 w-14 mx-6 px-0 bg-primary-100 hover:bg-primary-90 flex-none; 
  }
}
.icon-container{
  @apply w-9 h-9 flex items-center justify-center mr-2.5 border-2 rounded-lg border-gray-300;
}
.buttons-separation{
  @apply w-[2px] h-16 bg-gray-300;
}
.sector-filter-btn{
  @apply flex justify-between items-center w-full border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-primary-50 hover:border-primary-100;
  &.active{
    @apply border-primary-100 hover:bg-neutral-white;
  }
}

/*  */

.filterStatus-tabs-lg {
  @apply flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none;
  & .btn { @apply flex items-center text-neutral-black border-none bg-neutral-white relative before:w-0.5 before:h-3/4 before:bg-primary-100 before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-2/4 hover:bg-primary-90 hover:text-neutral-white hover:before:hidden first:before:hidden rounded-none !important;
    &.active {
      @apply bg-primary-100 text-neutral-white before:hidden font-semibold !important;
      & + button { @apply before:hidden !important }
    }
  }
}
.price-btn {
  @apply cursor-pointer select-none flex items-center font-normal text-xs;

  & input {
    @apply relative appearance-none flex-none w-10 h-5 border border-gray-300 rounded-sm cursor-pointer hover:bg-primary-90 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none checked:after:text-neutral-white overflow-hidden
    after:w-full
    after:h-full
    after:flex
    after:justify-center
    after:items-center
    after:hover:text-neutral-white
  }
}
.price-btn:first-child {
  & input { @apply after:content-['RD'] border-r-0 rounded-tr-none rounded-br-none; }
}
.price-btn:last-child {
  & input { @apply after:content-['USD'] rounded-tl-none rounded-bl-none; }
}
.dropdown{
  @apply absolute top-[95%] bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md;
}
</style>