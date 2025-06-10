<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
const emit = defineEmits(['nexts'])
const currencyTab = ref(true);
let price = ref(Number);
let price_us = ref(Number);
let price_temp = ref(Number);
const propertyStatus = [
  {
    name: 'Nuevo',
    value: 'New'
  },
  {
    name: 'Usado',
    value: 'Used'
  },
];
const countries = useGetCountry().countries;
const country = ref("");
const features = useGetFeatures().features;
const feature = ref([]);
let sector = ref(0);
let displaySector = ref(false);
let displayCity = ref(false);
const mapNotSupported = ref(false);

let address = ref('');
let pricePlaceholder = ref('pesos dominicanos');
let priceInput = ref('');

const schema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  address: yup.string().required("La dirección es requerida"),
  country: yup.string().required("El pais es requerido"),
  sector: yup.string().required("El sector es requerido"),
  city: yup.string().required("La ciudad es requerida"),
  bedrooms: yup.number().required("Este campo es requerido y debe ser un numero"),
  bathrooms: yup.number().required("Este campo es requerido y debe ser un numero"),
  parking: yup.number().required("Este campo es requerido y debe ser un numero"),
  property_status: yup.string().required("Este campo es requerido"),
  meter: yup.number().required("Este campo es requerido y debe ser un numero"),
  meter_2: yup.number().required("Este campo es requerido y debe ser un numero"),
  description: yup.string().required("La descripción es requerida")
});

const { handleSubmit, setFieldValue} = useForm({
  validationSchema: schema,
});

function getAddress(lat:any, long:any, location:string) {
  use_posts.lat = lat;
  use_posts.log = long;
  address.value = location;
  setFieldValue('address', location);
}

function currencyFormat() {
  let valor = priceInput.value.replace(/[^\d.]/g, '');
  let numero = parseFloat(valor);
  if (!isNaN(numero)) {
    priceInput.value = numero.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    price_temp.value = numero;
  }
}

function validateInput(event) {
  const inputValue = event.target.value;
  const regex = /^[0-9.]*$/;
  if (inputValue === '' || event.inputType === 'deleteContentBackward') {
    priceInput.value = inputValue;
    return;
  }
  if (!regex.test(inputValue)) {
    priceInput.value = inputValue.replace(/[^\d.]/g, '');
  };
  return {
    priceInput,
    validateInput,
  };
}

let sectors = ref([])
watch(country,(country_id) => {
  displaySector.value = true;
  sectors.value = [];
  const { data } = useFetch(`generals/states/${country_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      sectors.value.push(data.results.data)
    }
  })
});

let cities = ref([]);
watch(sector,(sector_id) => {
  displayCity.value = true;
  cities.value = [];
  const { data } = useFetch(`generals/cities/${sector_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      cities.value.push(data.results.data)
    }
  })
});

watch(currencyTab,(new_value) => {
  priceInput.value = '';
  price_temp.value = 0;
  price.value = 0;
  price_us.value = 0;
  if (new_value === true) {
    pricePlaceholder = "pesos dominicanos DOP";
  } else{
    pricePlaceholder = "dólares USD";
  }
});

watch(price_temp,(new_price) => {
  if (currencyTab.value === true) {
    price.value = parseInt(new_price);
    price_us.value = parseInt(new_price / 58);
  } else {
    price_us.value = parseInt(new_price);
    price.value = parseInt(new_price * 58);
  }
});

const onSubmit = handleSubmit((values) => {
  if( use_posts.lat === 0 || use_posts.log === 0) {
    window.scrollTo(0, 0);
    return alert('Por favor mueva el indicador en el mapa a la ubicación de la propiedad');
  }
  use_posts.name = values.name;
  use_posts.price = price.value;
  use_posts.price_us = price_us.value;
  use_posts.lat;
  use_posts.log;
  use_posts.address = values.address;
  use_posts.country = values.country;
  use_posts.sector = values.sector;
  use_posts.city = values.city;
  use_posts.bedrooms = values.bedrooms;
  use_posts.bathrooms = values.bathrooms;
  use_posts.parking = values.parking;
  use_posts.property_status = values.property_status;
  use_posts.feature = feature.value;
  use_posts.meter = values.meter;
  use_posts.meter_2 = values.meter_2;
  use_posts.description = values.description;
  emit('nexts');
});

</script>

<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-primary-100">inmueble</span>
  </h4>
  <form @submit="onSubmit" class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-3 sm:mx-auto gap-4 max-w-[995px]" :validation-schema="schema">
    <label class="col-span-3 sm:mb-2 mb-5">
      Nombre del proyecto
      <Field class="form-control" name="name" type="text" placeholder="Nombre del proyecto" />
      <ErrorMessage name="name" />
    </label>
    <div class="flex col-span-3 sm:mb-2 mb-5">
      <label class="w-full">
        Precio
        <input
          class="form-control"
          v-model="priceInput" 
          @blur="currencyFormat"
          @input="validateInput"
          :placeholder="`Precio en `+ pricePlaceholder"
        >
      </label>
      <div class="flex items-center ml-2.5">
        <button
          type="button"
          class="price-btn border-l rounded-l-md" 
          :class="{'active': currencyTab}" 
          @click="currencyTab = true">RD
        </button>
        <button
          type="button"
          class="price-btn border-r rounded-r-md" 
          :class="{'active': !currencyTab}" 
          @click="currencyTab = false">USD
        </button>
      </div>
    </div>
    <!-- Map -->
    <div class="col-span-3">
      <ClientOnly>
        <PopulationPostPropertiesMap v-if="!mapNotSupported" @send-location="getAddress" @mapNotSupported="mapNotSupported = true" />
      </ClientOnly>
      <div v-if="!mapNotSupported && use_posts.lat === 0 && use_posts.log === 0" class="bg-[yellow] bg-opacity-35 border-[yellow] border rounded-sm p-4 text-sm mt-3 text-center mb-5">
        Por favor mueva el indicador en el mapa a la ubicación de la propiedad, esto nos ayudará a mostrarla en el mapa.
      </div>
      <div v-if="mapNotSupported" class="bg-[red] bg-opacity-35 border-[red] border rounded-sm p-4 text-sm mt-3 font-medium text-black text-center mb-5">
        Por favor active la geolocalización en su navegador para poder ubicar la propiedad en el mapa.
      </div>
    </div>
    <!-- Direccion -->
    <div class="col-span-3">
      <label class="w-full sm:mb-2 mb-5">
      Direccion
      <Field class="form-control" v-model="address" name="address" type="text" placeholder="Direccion" />
      <ErrorMessage name="address" />
    </label>
    </div>
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5">
      País
      <Field name="country" as="select" v-model="country" class="form-control">
        <option v-for="country in countries" :key="country" :value="country.id" class="option-label">
          {{ country.name }}
        </option>
      </Field>
      <ErrorMessage name="country" />
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5" v-if="displaySector">
      Ciudad
      <Field name="sector" as="select" v-model="sector" class="form-control">
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
          {{ sector.name }}
        </option>
      </Field>
      <ErrorMessage name="sector" />
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5" v-if="displayCity">
      Sector
      <Field name="city" as="select" class="form-control">
        <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
          {{ item.name }}
        </option>
      </Field>
      <ErrorMessage name="city" />
    </label>
    <!---->
    <div class="col-span-3 gap-4 sm:grid grid-cols-2">
      <label class="w-full sm:mb-2 mb-5">
        Habitaciones
        <Field class="form-control" name="bedrooms" type="number" placeholder="Cantidad de habitaciones" />
        <ErrorMessage name="bedrooms" />
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Baños
        <Field class="form-control" name="bathrooms" type="number" placeholder="Cantidad de baños" />
        <ErrorMessage name="bathrooms" />
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Parqueos
        <Field class="form-control" name="parking" type="number" placeholder="Cantidad de parqueos" />
        <ErrorMessage name="parking" />
      </label>
      <div class="mb-5 sm:mb-0">
        <label for="propertyStatus" class="mb-2">Estado</label>
        <Field class="form-control" name="property_status" as="select" id="propertyStatus">
          <option v-for="status in propertyStatus" :key="status" :value="status.value" class="option-label">
            {{ status.name }}
          </option>
        </Field>
        <ErrorMessage name="property_status" />
      </div>
    </div>
    <!-- Amenidades -->
    <div class="col-span-3">
      <label for="amenities" class="mb-2">Otras amenidades</label>
      <div class="amenities-wrapper scrollbar">
        <label 
          v-for="item in features"
          :value="item.id"
          :key="item" 
          id="amenities" 
          class="checkbox-labels">
          <input 
            type="checkbox"
            class="checkbox"
            v-model="feature"
            :value="item.id"
          >
          {{ item.name }}
        </label>
      </div>
    </div>
    <!-- Superficie de construccion y total -->
    <div class="col-span-3 w-full gap-4 sm:flex sm:mb-2 mb-5">
      <label class="w-full mb-5 sm:mb-0">
        Superficie de construcción
        <Field class="form-control" name="meter" placeholder="Metros²" />
        <ErrorMessage name="meter" />
      </label>
      <label class="w-full">
        Superficie de total
        <Field class="form-control" name="meter_2" type="number" placeholder="Metros²" />
        <ErrorMessage name="meter_2" />
      </label>
    </div>
    <!-- Descripción -->
    <div class="flex flex-col col-span-3">
      <label>Descripción</label>
      <Field as="textarea" name="description" type="text" placeholder="Descripcion de la propiedad" />
      <ErrorMessage name="description" />
    </div>
    <!--  -->
    <div class="col-span-3 flex justify-center w-full gap-4">
      <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
        Atrás
      </AtomsButtons>
      <AtomsButtons @click="onSubmit">
        Continuar
      </AtomsButtons>
    </div>
  </form>
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
.amenities-wrapper {
  @apply bg-neutral-white border border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain h-56  ;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex flex-row items-center font-normal text-sm leading-[22px] mb-3;

  & .checkbox {
    @apply relative appearance-none flex-none w-4 h-4 border border-gray-300 rounded-sm mr-2 cursor-pointer hover:bg-primary-90 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none
    after:w-full
    after:h-full
    after:absolute
    after:bg-no-repeat
    after:bg-center
    after:bg-[length:10px]
    after:bg-[url('~/assets/icons/general/check.svg')];
  }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply w-7;
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}

span[role=alert] {
  @apply text-[red] font-medium text-sm;
}
</style>