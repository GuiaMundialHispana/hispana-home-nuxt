<template>
  <div class="flex justify-end 2xl:justify-start">
    <AtomsButtons 
      v-show="viewport.isLessThan('2xl')"
      class="mt-5 font-semibold"
      icon-position="right"
      btn-style="solid-primary" 
      icon-name="general/search"
      btn-size="large"
      :icon-size=18
      @click="showFilters = !showFilters"
      >Filtrar propiedades
    </AtomsButtons>
    <OnClickOutside @trigger="showFilters = false" :class="{'hidden': !showFilters, 'flex' : showFilters}" class="filters-overflow">
      <AtomsButtons 
        v-show="viewport.isLessThan('2xl')"
        class="flex-none"
        btn-style="outline-gray" 
        btn-type="btn-icon"
        icon-name="general/close"
        btn-size="xsmall"
        :icon-size=20
        @click="showFilters = false"
      />
      <MoleculesFilterStatusProperties class="filterStatus-tabs-sm mx-auto" />
      <div class="flex w-full mx-auto sm:w-[230px] 2xl:w-fit relative">
        <div class="w-full mx-auto sm:w-[230px] 2xl:w-fit">
          <button class="flex gap-2.5 filter-btn w-full" @click="toggleList('location')" :class="{'active': dropdownLists.location}">
            <AtomsIcon name="general/sector" class="text-primary-100" :size=20  />
            <p>Sector</p>
            <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
          </button>
          <OnClickOutside @trigger="toggleList('location')" class="dropdown w-full sm:w-[230px] h-fit" v-if="dropdownLists.location">
            <button class="filter-btn" :class="{'active': dropdownLists.city}" @click="toggleList('city')">
              Ciudad <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
            </button>
            <OnClickOutside @trigger="toggleList('city')" v-if="dropdownLists.city">
              <MoleculesDropDownList class="mt-[5px] h-[273px]"/>
            </OnClickOutside>
            <button class="filter-btn" :class="{'active': dropdownLists.municipality}" @click="toggleList('municipality')">
              Municipio <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
            </button>
            <OnClickOutside @trigger="toggleList('municipality')" v-if="dropdownLists.municipality">
              <MoleculesDropDownList class="mt-[5px] h-[174px]"/>
            </OnClickOutside>
            <button class="filter-btn" :class="{'active': dropdownLists.sector}" @click="toggleList('sector')">
              Sector <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
            </button>
            <OnClickOutside @trigger="toggleList('sector')" v-if="dropdownLists.sector">
              <MoleculesDropDownList v-if="dropdownLists.sector" class="mt-[5px] h-[273px]"/>
            </OnClickOutside>
          </OnClickOutside>
        </div>
      </div>
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit items-center">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('propertyType')" :class="{'active': dropdownLists.propertyType}">
          <AtomsIcon name="general/property" class="text-primary-100" :size=20  />
          <p>Inmueble</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('propertyType')" v-if="dropdownLists.propertyType" class="h-[273px] w-full 2xl:w-[205px]">
          <MoleculesDropDownList :class="importedDropdownLists" />
        </OnClickOutside>
      </div>  

      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('bedroom')" :class="{'active': dropdownLists.bedroom}">
          <AtomsIcon name="general/bed" class="text-primary-100" :size=20  />
          <p>Habitaciones</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('bedroom')"  v-if="dropdownLists.bedroom"  class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit 2xl:w-[220px] w-full" >
          <p class="mb-[5px]">Cantidad de habitaciones</p>
          <div class="flex flex-nowrap">
            <label class="property-quantity-btn" :class="{'active':(bedroomQuantity == 1)}">
              <input type="radio" value=1 v-model="bedroomQuantity">1
            </label>
            <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 2)}">
              <input type="radio" value=2 v-model="bedroomQuantity">2
            </label>
            <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 3)}">
              <input type="radio" value=3 v-model="bedroomQuantity">3
            </label>
            <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 4)}">
              <input type="radio" value=4 v-model="bedroomQuantity">4<span class="text-primary-100">+</span>
            </label>
          </div>
        </OnClickOutside>
      </div>  
      
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('bathroom')" :class="{'active': dropdownLists.bathroom}">
          <AtomsIcon name="general/bathtub" class="text-primary-100" :size=20  />
          <p>Baños</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('bathroom')" v-if="dropdownLists.bathroom"  class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit w-full 2xl:w-[170px]" >
          <p class="mb-[5px]">Cantidad de baños</p>
          <div class="flex flex-nowrap">
            <label class="property-quantity-btn" :class="{'active':(bathroomQuantity == 1)}">
              <input type="radio" value=1 v-model="bathroomQuantity">1
            </label>
            <label class="property-quantity-btn" :class="{'active': (bathroomQuantity == 2)}">
              <input type="radio" value=2 v-model="bathroomQuantity">2
            </label>
            <label class="property-quantity-btn" :class="{'active': (bathroomQuantity == 3)}">
              <input type="radio" value=3 v-model="bathroomQuantity">3<span class="text-primary-100">+</span>
            </label>
          </div>
        </OnClickOutside>
      </div>  
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit">
        <button class="flex relative gap-2.5 filter-btn" @click="toggleList('parkingLot')" :class="{'active': dropdownLists.parkingLot}">
          <AtomsIcon name="general/car" class="text-primary-100" :size=20  />
          <p>Parqueo</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('parkingLot')" v-if="dropdownLists.parkingLot" class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit w-full 2xl:w-[190px]" >
          <p class="mb-[5px]">Cantidad de parqueos</p>
          <div class="flex">
            <label class="property-quantity-btn" :class="{'active':(parkingLotQuantity == 1)}">
              <input type="radio" value=1 v-model="parkingLotQuantity">1
            </label>
            <label class="property-quantity-btn" :class="{'active': (parkingLotQuantity == 2)}">
              <input type="radio" value=2 v-model="parkingLotQuantity">2
            </label>
            <label class="property-quantity-btn" :class="{'active': (parkingLotQuantity == 3)}">
              <input type="radio" value=3 v-model="parkingLotQuantity">3<span class="text-primary-100">+</span>
            </label>
          </div>
        </OnClickOutside>
      </div>  
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('priceRange')" :class="{'active': dropdownLists.priceRange}">
          <AtomsIcon name="general/price" class="text-primary-100" :size=20  />
          <p>Rango de precio</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('priceRange')" v-if="dropdownLists.priceRange" class="dropdown 2xl:w-[238px] w-full h-fit">
          <div class="flex justify-between">
            <label class="text-sm leading-[22px]" for="price">Precio</label>
            <div class="flex items-center">
              <button class="price-btn border-l rounded-l-sm" :class="{'active': currencyTab}" @click="changeCurrency">RD</button>
              <button class="price-btn border-r rounded-r-sm" :class="{'active': !currencyTab}" @click="changeCurrency">USD</button>
            </div>
          </div>
          <div>
            <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px] w-[300px]"
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
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit" :class="{'modal-open': dropdownLists.status}">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('status')" :class="{'active': dropdownLists.status}">
          <AtomsIcon name="general/status" class="text-primary-100" :size=20  />
          <p>Estado</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('status')" v-if="dropdownLists.status">
          <MoleculesDropDownList class="h-[174px] 2xl:w-[168px]" :class="importedDropdownLists" />
        </OnClickOutside>
      </div>  
      <div class="flex flex-col relative w-full mx-auto sm:w-[230px] 2xl:w-fit">
        <button class="flex gap-2.5 filter-btn" @click="toggleList('other')" :class="{'active': dropdownLists.other}">
          <AtomsIcon name="general/tune" class="text-primary-100" :size=20  />
          <p>Otros</p>
          <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
        </button>
        <OnClickOutside @trigger="toggleList('other')" v-if="dropdownLists.other">
          <MoleculesDropDownList class="h-fit 2xl:w-[205px]" :class="importedDropdownLists"/>
        </OnClickOutside>
      </div>
      <button class="flex bg-primary-100 w-full mx-auto sm:w-[230px] p-2 h-12 2xl:w-10 2xl:h-10 rounded-full items-center justify-center hover:bg-primary-90 border-primary-100 border flex-none text-neutral-white">
        <p class="2xl:hidden mr-3 font-semibold">Buscar propiedades</p>
        <AtomsIcon name="general/search" :size=17  />
      </button>
    </OnClickOutside>
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
          bedroom: false,
          bathroom: false,
          parkingLot: false, 
          priceRange: false,
          status: false,
          other: false,
          city: false,
          municipality: false,
          sector: false,
        },
        viewport: useViewport(),
        showFilters: false,
        bedroomQuantity: 0,
        bathroomQuantity: 0,
        parkingLotQuantity: 0,
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
      importedDropdownLists(){
        return "2xl:absolute 2xl:top-[95%] mt-[5px] left-0 z-10"
      }      
    },
    watch: {
      showFilters: function() {
      if(this.showFilters) {
        document.body.classList.add('modal-open')        
      }else {
        document.body.classList.remove('modal-open')
      }      
    }
    }
}
</script>
<style lang="postcss" scoped>
.filter-btn {
  @apply flex justify-between w-full items-center border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-primary-50 hover:border-primary-100 bg-neutral-white whitespace-nowrap mx-auto text-neutral-black !important;
  &.active { @apply border-primary-100 bg-neutral-white !important; }
  & p { @apply flex-none !important; }
}
.price-btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-5 text-[12px];
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}
.dropdown {
  @apply 2xl:absolute right-full 2xl:left-0 2xl:top-[95%] bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md mt-[5px] mr-1.5 2xl:mr-0 z-10;
}
.property-quantity-btn {
  @apply m-0 w-full h-10 flex items-center justify-center border-gray-300 border-r border-t border-b first:border-l first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm hover:bg-primary-50 checked:bg-primary-50;
  &.active {
    @apply bg-primary-50 font-bold text-primary-100;
    & span { @apply text-neutral-black; }
  }

  & input { @apply appearance-none; }
}
.filters-overflow {
  @apply w-full sm:w-fit h-screen 2xl:mt-12 lg:mt-[102px] 2xl:h-fit py-4 2xl:py-0 fixed top-0 md:absolute 2xl:relative 2xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white z-[80] right-0 2xl:mr-0 mt-0 px-4 md:px-6 2xl:px-0;
  @media (max-width:1536px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300;
  }
}
</style>
