<template>
  <div class="absolute left-0 bottom-[-6%] text-[#232323] z-10">
    <MoleculesFilterStatusProperties class="filterStatus-tabs-lg" />
    <div class="overflow-hidden flex items-center w-fit h-[101px] bg-neutral-white rounded-2xl shadow-xl mt-3">
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
        <OnClickOutside @trigger="toggleList('location')"
        class="dropdown w-[230px]" 
        v-if="dropdownLists.location">
          <button class="sector-filter-btn"  :class="{'active': dropdownLists.city}" @click="toggleList('city')">
            Ciudad <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
          </button>
          <OnClickOutside @trigger="toggleList('city')" v-if="dropdownLists.city" >
            <MoleculesDropDownList class="mt-[5px] h-[273px]"/>
          </OnClickOutside>
          <button class="sector-filter-btn" :class="{'active': dropdownLists.municipality}" @click="toggleList('municipality')">
            Municipio <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
          </button>
          <OnClickOutside @trigger="toggleList('municipality')" v-if="dropdownLists.municipality" >
            <MoleculesDropDownList v-if="dropdownLists.municipality" class="mt-[5px] h-[174px]"/>
          </OnClickOutside>
          <button class="sector-filter-btn" :class="{'active': dropdownLists.sector}" @click="toggleList('sector')">
            Sector <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
          </button>
          <OnClickOutside @trigger="toggleList('sector')" v-if="dropdownLists.sector" >
            <MoleculesDropDownList v-if="dropdownLists.sector" class="mt-[5px] h-[273px]"/>
          </OnClickOutside>
        </OnClickOutside>
      </div>
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
        <OnClickOutside @trigger="toggleList('propertyType')" class="absolute top-[95%] w-[288px] h-[273px]" v-if="dropdownLists.propertyType">
          <MoleculesDropDownList class="shadow-md"/>
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
          <div class="flex justify-between">
            <label class="text-sm leading-[22px]" for="price">Precio</label>
            <div class="flex items-center">
              <button class="price-btn border-l rounded-l-sm" :class="{'active': currencyTab}" @click="changeCurrency">RD</button>
              <button class="price-btn border-r rounded-r-sm" :class="{'active': !currencyTab}" @click="changeCurrency">USD</button>
            </div>
          </div>
          <div>
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
          </div>
          <div class="flex flex-col item-center justify-center mt-2.5">
            <p class="mx-auto text-sm font-medium">Desde {{currency}}{{ showBarMinValue }}</p>
            <p class="mx-auto text-sm font-medium">Hasta {{currency}}{{ showBarMaxValue }} +</p>
          </div>
        </OnClickOutside>
      </div>
      <span class="buttons-separation"></span>
      <button class="filter-btn rounded-btn">
        <AtomsIcon class="text-neutral-white" name="general/search" :size=22 />
      </button>
    </div>
  </div>
</template>

<script setup>
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
  },
  computed: {
      big(){
        return "h-20 font-semibold [&>button]:px-6 w-fit"
      }
    }
  
}
</script>

<style lang="postcss" scoped>
  .filter-btn{
    @apply flex items-center h-full px-6 text-left;
    &.rounded-btn{
      @apply justify-center rounded-full h-14 w-14 mx-6 px-0 bg-primary-100 hover:bg-primary-90 flex-none; 
    }
  }
  h2{
    @apply text-xl leading-8 font-semibold;
  }
  p{
    @apply text-sm leading-[22px] flex items-center whitespace-nowrap;
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
  .price-btn{
    @apply border-y border-gray-300 text-primary-100 w-[37px] h-5 text-[12px];
    &.active{
      @apply bg-primary-100 text-neutral-white border-none;
    }
  }
  .dropdown{
    @apply absolute top-[95%] bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md;
  }
  
</style>