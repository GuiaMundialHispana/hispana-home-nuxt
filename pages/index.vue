<template>
	<div>
		<section class="hero">
			<div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] mx-auto">
				<h1 class="lg:whitespace-nowrap lg:text-[40px]">Estás más cerca del <span class="text-primary-100 font-bold">hogar de tus sueños</span>
				</h1>
				<p class="text-sm lg:whitespace-nowrap">Busca, encuentra y compra el inmueble perfecto con <strong>Grupo Casas & mas</strong>, el buscador de inmuebles<br class="md:block hidden"> que te ofrece la mejor selección de propiedades. ¡Empieza tu búsqueda hoy mismo!</p>
			</div>
			<img src="/img/hero.jpg" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover object-center md:block hidden">
			<div class="hidden lg:block left-1/2 -translate-x-2/4 absolute bottom-[-6%] text-[#232323] z-10">
				<div class="filterStatus-tabs-lg">
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
									{{locationName}}
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
											@click="countryName = country.name"
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
											@click="stateName = sector.name"
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
											@click="cityName = city.name"
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
							<div class="icon-container flex-none">
								<AtomsIcon class="text-primary-100" name="general/property" :size=20 />
							</div>
							<div>
								<h2 class=" whitespace-nowrap">Tipo de propiedad</h2>
								<p>
									{{ 	categoryName }}
									<AtomsIcon class="pl-2 text-primary-100" name="arrows/arrow-down" :size=15 />
								</p>
							</div>
						</button>
						<OnClickOutside @trigger="toggleList('propertyType')" v-if="dropdownLists.propertyType" class="dropdown w-[288px] h-[273px] !p-0 !m-0">
							<div class="dropdown-wrapper scrollbar min-h-max max-h-[273px]">
								<label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
									<input
										type="radio"
										class="checkbox"
										name="category"
										v-model="category_id"
										:value="category.id"
										:id="category.name"
										@click="categoryName = category.name"
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
							<p>
								{{ priceLabel === '' ? 'Selecciona el rango de precio' : priceLabel }}
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
			<div class="flex justify-center relative z-10 lg:hidden">
				<AtomsLink
					linkTo="/search?type=All" 
					btn-size="large" 
					class="my-5 font-semibold">
					Buscar propiedades
				</AtomsLink>
			</div>
		</section>
		<GeneralExclusiveProperties :properties="exclusive" :pending="exclusive_status" />
		<GeneralVipProperties :properties="vip" :pending="vip_status" />
    <GeneralSilverProperties :properties="silver" :pending="silver_status" />
		<section class="benefits">
			<p class="leading-10 bg-primary-50 text-primary-100 text-sm font-semibold px-2.5 w-fit rounded-lg">Beneficios</p>
			<h2 class="mt-[34px] text-[28px] font-medium leading-7 text-center">¿Conoces los beneficios de<br hidden class="md:block"> <span class="text-primary-100">utilizar Grupo Casas & mas?</span></h2>
			<div class="flex flex-wrap pt-12 md:gap-8 lg:gap-[52px] justify-center">
				<div class="benefit-container">
					<div class="icon-container">
						<AtomsIcon class="text-primary-100" name="general/property" :size=45 />
					</div>
					<h4>Comprar un inmueble</h4>
					<p>Grupo Casas & mas puede ayudarte a encontrar la propiedad perfecta para ti. Con nuestro buscador de inmuebles en línea, podrás buscar entre una amplia selección de propiedades en todo momento.</p>
				</div>
				<div class="benefit-container">
					<div class="icon-container">
						<AtomsIcon class="text-primary-100" name="general/sell-tag" :size=45 />
					</div>
					<h4>Vender un inmueble</h4>
					<p>Grupo Casas & mas puede ayudarte. Ofrecemos una variedad de herramientas y recursos para ayudarte a listar tu propiedad y atraer a los compradores adecuados.</p>
				</div>
				<div class="benefit-container">
					<div class="icon-container">
						<AtomsIcon class="text-primary-100" name="general/house" :size=45 />
					</div>
					<h4>Alquilar un inmueble</h4>
					<p>Grupo Casas & mas te ofrece una amplia selección de propiedades para alquilar en todo momento.</p>
				</div>
			</div> 
		</section>
		<!-- <OrganismExploreProperties :property_id=1 /> -->
	</div>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';
import MultiRangeSlider from 'multi-range-slider-vue';

const config = useRuntimeConfig();

const { data: exclusive, status: exclusive_status } = useFetch('advertisements/home?plan=2', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_data) => data.results.data
});

const { data: vip, status: vip_status } = useFetch('advertisements/home?plan=1', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_data) => data.results.data
});

const { data: silver, status: silver_status } = useFetch('advertisements/home?plan=3', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_data) => data.results.data
});

const router = useRouter();

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

const { countries, getStates, states, getCities, cities } = useGetCountry();
const country_id = ref(0);
const state_id = ref(0);
const city_id = ref(0);
const countryName = ref('');
const cityName = ref('');
const stateName = ref('');

const locationName = computed(() => {
  return countryName.value ? `${countryName.value} ${stateName.value} ${cityName.value}` : 'Selecciona la ubicación';
})

const categoryName = computed(() => {
	return category_id.value ? categories.value.find((category) => category.id === category_id.value).name : 'Selecciona el tipo de propiedad';
})

watch(country_id, (newCountryId: number | string) => {
  getStates(newCountryId);
  queryBody.country_id = newCountryId;
});

watch(state_id, (newStateId: number | string) => {
  getCities(newStateId);
  queryBody.town_id = newStateId;
});

watch(city_id, (newCityId: number | string) => {
  queryBody.city_id = newCityId;
});

const queryBody = reactive({});
const sendPath = ref('/resultados?type=All');

const priceLabel = ref('');
const UpdateValues = (e: any) => {
  barMinValue.value = e.minValue;
  barMaxValue.value = e.maxValue;
  showBarMinValue.value = barMinValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  showBarMaxValue.value = barMaxValue.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  price.value = barMinValue.value.toString() + '-' + barMaxValue.value.toString();
	priceLabel.value = showBarMinValue.value + '-' + showBarMaxValue.value;
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

const barMinValue = ref(0);
const barMaxValue = ref(10000000);
const showBarMinValue = ref('0');
const showBarMaxValue = ref('10,000,000');
const maxPrice = ref(50000000);
const picked = ref('RD');
const price = ref('');
const priceRangeSteps = ref(500000);
watch(picked, (newPicked:any) => {
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

watch(price, (newPrice:any) => {
  queryBody.price = newPrice;
});

const categories = ref([]);
const category_id = ref(0);
watch(category_id, (newCategoryId:any) => {
  queryBody.property_category_id = newCategoryId;
});

const sendType = ref('All');
watch(sendType, (newRoute:any) => {
  queryBody.type = newRoute;
});

onMounted(() => {
  getCategories();
  queryBody.type = sendType.value;
  queryBody.price_type = picked.value;
});
</script>

<style lang="postcss" scoped>
section.hero {
	@apply relative w-full md:min-h-[400px] pt-6 sm:pt-16 mx-auto mb-[50px] border-b border-gray-300;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #FFFFFF 50.6%, rgba(255, 255, 255, 0) 97.73%);
		z-index: 10;
	}
}

section.benefits {
	@apply flex flex-col items-center w-full px-4 md:px-4 mt-11 lg:mt-16 pb-4 md:pb-[50px];
	.benefit-container{
		@apply flex flex-col items-center text-center w-[370px] pb-4 lg:pb-0 px-4;
		& h4{
			@apply text-xl font-semibold pt-3;
		} & p{
			@apply leading-[22px] pt-3 text-sm font-normal;
		}
	}
	.icon-container{
		@apply bg-primary-50 rounded-full flex items-center justify-center w-[90px] h-[90px] md:w-[118px] md:h-[118px];
	}
}

.filter-home-wrapper {
  @apply overflow-hidden flex items-center w-fit h-[101px] bg-neutral-white rounded-2xl shadow-xl mt-3;
}
.filter-btn {
  @apply flex items-center h-full px-6 text-left;

  & h2{ @apply text-xl leading-8 font-semibold; }
  & p { @apply text-sm leading-[22px] flex items-center whitespace-nowrap;}

  &.rounded-btn{
    @apply justify-center rounded-full h-14 w-14 mx-6 px-0 bg-primary-100 hover:bg-primary-90 flex-none; 
  }
}
.icon-container {
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