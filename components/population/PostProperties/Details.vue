<template>
  <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
    Cuéntanos sobre tu
    <span class="text-primary-100">
      inmueble
    </span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-3 sm:mx-auto gap-4 max-w-[995px]">
    <label class="col-span-3">
      Nombre del proyecto
      <input class="form-control" v-model="name" placeholder="Nombre del proyecto" type="text">
    </label>
    <div class="flex col-span-3">
      <label class="w-full">
        Precio
        <input
          v-if="currencyTab"
          class="form-control"
          v-model="price"
          placeholder="Precio Dominicano"
          type="number"
        >
        <input
          v-if="!currencyTab"
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
    <!-- <div class="col-span-3">
      <iframe class="rounded-2xl w-full h-[195px] sm:my-2 my-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.565950258251!2d-69.94201623463833!3d18.45800652590105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56202c17cd707%3A0x9abe65a34f683f5c!2sOficina%20Gubernamental%20de%20Tecnolog%C3%ADas%20de%20la%20Informaci%C3%B3n%20y%20Comunicaci%C3%B3n%20(OGTIC)!5e0!3m2!1ses-419!2sdo!4v1676248377093!5m2!1ses-419!2sdo"></iframe>
    </div> -->
    <select class="form-control sm:mb-2 mb-5 col-span-3">
      <option>Sector</option>
      <option v-for="(sector) in sectors" value="sector" :key="sector" class="option-label">
      {{ sector }}
      </option>
    </select>
    <div class="col-span-3 w-full gap-4 sm:flex">
      <select class="form-control sm:mb-2 mb-5">
        <option>Ciudad</option>
        <option v-for="(city) in cities" :key="city" class="option-label">
        {{ city }}
        </option>
      </select>
      <select class="form-control sm:mb-2 mb-5">
        <option>Municipio</option>
        <option v-for="(municipality) in municipalities" :key="municipality" class="option-label">
        {{ municipality }}
        </option>
      </select>
    </div>
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
    <div class="col-span-3">
      <label for="amenities" class="mb-2">Otras amenidades</label>
      <select class="form-control col-span-3 sm:mb-2 mb-5" v-model="ameniti" multiple id="amenities">
        <option v-for="(item) in amenities" :value="item" :key="item" class="option-label">
        {{ item }}
        </option>
      </select>
    </div>
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
    <div class="flex flex-col col-span-3">
      <label>Descripción</label>
      <textarea type="text" v-model="description" placeholder="Descripcion de la propiedad"></textarea>
    </div>
  </div>
  <div class="flex justify-center w-full mt-4">
    <AtomsButtons
      btn-style="solid-primary"
      btn-size="xsmall"
      @click="sendPropertyData()"
      >confirmar
    </AtomsButtons>
  </div>
</template> 
<script>
export default{
  data() {
    return {
      currencyTab: true,
      name: '',
      price: Number,
      price_us: Number,
      sector: '',
      bedrooms: Number,
      bathrooms: Number,
      parking: Number,
      meter: Number,
      meter_2: Number,
      description: '',
      property_status: '',
      propertyStatus: ['New', 'Used'],
      ameniti: [],
      amenities: ['Piscina','Terraza comun','Terraza exclusiva','Gimnasio','Cisterna','Estudio','Gazebo','Escaleras','Ascensor','Family Room'],
      sectors: [],
      cities: [],
      municipalities: [],
      propertyData: {}
    }
  },
  methods: {
    sendPropertyData() {
      this.propertyData = {
        name: this.name,
        price: this.price,
        price_us: this.price_us,
        sector: 39,
        city_id: 40,
        country_id: 22,
        bedroom: this.bedrooms,
        bathrooms: this.bathrooms,
        parking: this.parking,
        status: this.property_status,
        aminiti: this.ameniti,
        meters: this.meter,
        solar_meters: this.meter_2,
        description: this.description
      },
      this.$emit('sendProperty', this.propertyData)
    }
  }
}
</script>
<style lang="postcss" scoped>
  label {
    @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
  }
  .form-control {
    @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
  }
  .price-btn {
    @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
    &.active { @apply bg-primary-100 text-neutral-white border-none; }
  }
  textarea {
    @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
  }
</style>
