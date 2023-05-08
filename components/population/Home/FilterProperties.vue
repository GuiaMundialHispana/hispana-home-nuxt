<template>
  <div class="absolute left-0 bottom-[-6%] text-[#232323] z-10">
    <MoleculesFilterStatusProperties
      @send-route="getRoute"
      class="filterStatus-tabs-lg"
    />
  </div>
</template>
<!-- 
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
        <OnClickOutside @trigger="toggleList('location')" class="dropdown w-[230px]" v-if="dropdownLists.location">
          <button class="sector-filter-btn" :class="{'active': dropdownLists.country}" @click="toggleList('country')">
            Pais <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
          </button>
          <OnClickOutside @trigger="toggleList('country')" v-if="dropdownLists.country">
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
              {{ country_id }}
              <label class="checkbox-labels" :for="country.name" v-for="country in countries" :key="country">
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
          <button class="sector-filter-btn" :class="{'active': dropdownLists.sector}" @click="toggleList('sector')">
            Sector <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
          </button>
          <OnClickOutside @trigger="toggleList('sector')" v-if="dropdownLists.sector" >
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
              {{ state_id }}
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
          <button class="sector-filter-btn" :class="{'active': dropdownLists.city}" @click="toggleList('city')">
            Ciudad <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
          </button>
          <OnClickOutside @trigger="toggleList('city')" v-if="dropdownLists.city" >
            <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
              {{ city_id }}
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
      <span class="buttons-separation" v-if="categories.length > 0"></span>
      <div class="flex justify-center" v-if="categories.length > 0">
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
        <OnClickOutside @trigger="toggleList('propertyType')" class="absolute top-[95%] w-[288px] h-[273px]" v-if="dropdownLists.propertyType">
          <div class="dropdown-wrapper scrollbar mt-[5px] min-h-max max-h-[273px]">
            categorias: {{ categories }}
            <label class="checkbox-labels" :for="country.name" v-for="country in countries" :key="country">
              <input
                type="radio"
                class="checkbox"
                name="country"
                v-model="country_id"
                :value="country.id"
                :id="country.name"
              >
              {{ country.name }}
          </div>
        </OnClickOutside>
      </div>
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
              <input type="radio" id="RD" value="RD" v-model="picked">
            </label>
            <label for="USD" class="price-btn">
              <input type="radio" id="USD" value="USD" checked v-model="picked">
            </label>
          </p>
          <MultiRangeSlider class="mx-auto mt-[14px] w-[200px]"
            baseClassName="multi-range-slider-bar-only"
            :min="0"
            :max="55000000"
            :step="500000"
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
    </div> -->

<!-- <script setup>
  import { OnClickOutside } from '@vueuse/components';
</script>
<script>
import MultiRangeSlider from "multi-range-slider-vue";
export default{
  data() {
    return {
      dropdownLists: {
        location: false,
        propertyType: false,
        priceRange: false,
        city: false,
        municipality: false, 
        sector: false,
      },
      currencyTab: true,
      currency: "RD$",
      barMinValue: 0,
      barMaxValue: 40000000,
      showBarMinValue: "0",
      showBarMaxValue: "40,000,000",
    }
  },
  components: {
    MultiRangeSlider
  },
  methods: {
    UpdateValues(e) {
      this.barMinValue = e.minValue;
      this.barMaxValue = e.maxValue;
      this.showBarMinValue = this.barMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.showBarMaxValue = this.barMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    changeCurrency(){
      if(this.currencyTab === true){
        this.currencyTab = false;
        this.currency = "USD$"
      }else{
        this.currencyTab = true;
        this.currency = "RD$"
      }
    },
    toggleList(list) {
      if (this.dropdownLists[list]) {
        setTimeout(() => {
          this.dropdownLists[list] = false;
        }, 50);
      }else{
          this.dropdownLists[list] = true;
      }
    },
  }
}
</script> -->

<script setup>
import { OnClickOutside } from '@vueuse/components';
import  MultiRangeSlider  from "multi-range-slider-vue";

MultiRangeSlider;
const config = useRuntimeConfig();
let propertyType = ref('/search');
let dropdownLists = ref({
  location: false,
  propertyType: false,
  priceRange: false,
  country: false,
  city: false,
  municipality: false, 
  sector: false,
})
let barMinValue = ref(0);
let barMaxValue = ref(40000000);
let showBarMinValue =  ref(0);
let showBarMaxValue = ref(0);
let countries;
let country_id = ref(63);
let cities;
let city_id = ref(0);
let states;
let state_id = ref(0);
let picked = ref('USD');
let price = ref('');
const param1 = ref('value1')

function getRoute(e) {
  propertyType = e;
  console.log(propertyType)
}

function UpdateValues(e) {
  barMinValue = e.minValue;
  barMaxValue = e.maxValue;
  showBarMinValue.value = barMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  showBarMaxValue.value = barMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  price = showBarMinValue.value+"-"+showBarMaxValue.value;
  // console.log(showBarMaxValue,showBarMinValue)
  console.log(price)
};

console.log(price)

function toggleList(list) {
  if (this.dropdownLists[list]) {
    setTimeout(() => {
      this.dropdownLists[list] = false;
    }, 50);
  }else{
      this.dropdownLists[list] = true;
  }
};

async function getCountries() {
  const { data: countriesApi } = await useFetch('generals/countries', {
    method: 'GET',
    baseURL: config.public.API,
    transform:(_countriesApi) => _countriesApi.results.data
  });
  countries = countriesApi;
  getStates(63);
  //
}

async function getStates(country_id) {
  const { data:statesApi } = await useFetch('generals/states/'+`${country_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    transform:(_statesApi) => _statesApi.results.data
  })
  states = statesApi;
  getCities(1074);
  //
};

async function getCities(state_id) {
  const { data:citiesApi } = await useFetch('generals/cities/'+`${state_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    transform:(_citiesApi) => _citiesApi.results.data
  })
  cities = citiesApi;
  //
};

const { data:categories, pending, error } = await useFetch('generals/categories', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_categories) => _categories.results
})

async function searchProperties() {
  const { data } = await useFetch('advertisements/search?bedroom=4', {
    method: 'GET',
    baseURL: config.public.API,
  })
  console.log(data)
};

// onBeforeMount(()=>{
//   getCountries();
// });

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