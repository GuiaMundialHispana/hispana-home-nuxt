<template>
  <nav class="bg-[#F0F0F073] shadow-inner">
    <div class="steps-wrapper">
      <div class="active">
        <span>1</span>
        <p>Vender o alquilar</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 2}]">
      <div :class="[{active: step >= 2}]">
        <span>2</span>
        <p>Categoría</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 3}]">
      <div  :class="[{active: step >= 3}]">
        <span>3</span>
        <p>Paquete</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{progress: step >= 4}]">
      <div :class="[{active: step >= 4}]">
        <span>4</span>
        <p>Detalles</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{active: step >= 5}]">
      <div :class="[{active: step >= 5}]">
        <span>5</span>
        <p>Fotos</p>
      </div>
      <hr class="md:hidden border-[#bababa] border w-3" :class="[{active: step === 6}]">
      <div class="last-step">
        <span>&#x2713</span>
        <p>Finalizado</p>
        <hr class="hidden lg:block border-primary-100 border w-12 ml-2" :class="[{'w-20': step === 6}]">
        <img v-if="step < 6" class="hidden lg:block w-[177px]" src="/img/property-post.png" alt="Property">
      </div>
    </div>
  </nav>
  <KeepAlive>
    <div>
      <div class="step-1" v-if="step === 1">
        <div class="flex flex-col text-center items-center justify-center">
          <h4 class="font-semibold text-[28px] leading-[42px] my-20">
            <span class="text-primary-100">
              Vamos a comenzar
            </span>
            <br>
            ¿Vas a vender o alquilar?
          </h4>
          <div class="flex gap-2.5">
            <label class="option" :class="[{checked: optionSelected === 'sell'}]">Vender
              <input type="radio" value="Sell" name="sell" @click="optionSelected = 'sell'">
            </label>
            <label class="option" :class="[{checked: optionSelected === 'rent'}]">Alquilar
              <input type="radio" value="rent" name="rent" @click="optionSelected = 'rent'">
            </label>
          </div>
        </div>
      </div>
      <div class="step-2" v-if="step === 2">
        <div class="wrapper scrollbar">
          <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
            ¿Cuál es tu tipo de<span class="text-primary-100">inmueble?</span>
          </h4>
          <label v-for="(category) in categories" :key="category" class="option" :class="[{checked: categorySelected === category}]">
            <input type="radio" :value="category" v-model="categorySelected">
            {{ category }}
          </label>
        </div>
      </div>
      <div class="step-3" v-if="step === 3">
        <div v-if="!showPaymentProcess">
          <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-14 text-center">
            Planes disponibles para esta publicación.
          </h4>
          <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16">
            <li v-for="plan in plans" :key="plan">
              <MoleculesPlanCard @pay="planInformation" :plan="plan" />
            </li>
          </ul>
        </div>
        <!-- Process payment -->
        <div v-if="showPaymentProcess">
          {{ planSelected.id }}
          <div class="grid lg:grid-cols-2 lg:px-0 px-8 gap-x-16">
            <div class="w-full lg:px-8 lg:py-16">
              <h4 class="font-bold text-[28px] leading-[42px] mb-14">Información de pago</h4>
              <ul class="payment-plan-resume">
                <li class="plan-price-card">
                  <div class="plan-name-card" :class="[renderPlanText]">
                    <p>{{ planSelected.name }}</p>
                  </div>
                  <div class="plan-information">
                    <p class="capitalize">Plan {{ planSelected.name }}</p>
                    <select>
                      <option value="1">Cantidad: 1</option>
                      <option value="1">Cantidad: 2</option>
                      <option value="1">Cantidad: 3</option>
                      <option value="1">Cantidad: 4</option>
                      <option value="1">Cantidad: 5</option>
                    </select>
                  </div>
                  <h6 class="plan-price">
                    RD$ {{ planSelected.planPrice }}
                  </h6>
                </li>
              </ul>
              <p class="text-sm block text-right mt-8">Pago total</p>
              <p class="font-bold text-neutral-black text-[28px] leading-[42px] text-right">
                RD$ {{ planSelected.planPrice }}
              </p>
            </div>
            <!--  -->
            <div class="bg-[#F8F8F8] w-full lg:py-16 lg:px-8">
              <div class="form-group">
                <label>Correo</label>
                <input type="email">
              </div>
              <div class="form-group card-information">
                <label>Información de la tarjeta</label>
                <input type="text" class="border-b-0" placeholder="1234 4567 1234 4567">
                <div class="flex items-center">
                  <input type="text" placeholder="MM/YY7">
                  <input type="text" placeholder="CVC">
                </div>
              </div>
              <div class="form-group">
                <label>Nombre de la tarjeta</label>
                <input type="text">
              </div>
              <AtomsButtons class="w-full" @click="processPayment()">Pagar</AtomsButtons>
            </div>
          </div>
        </div>
      </div>
      <div class="step-4" v-if="step === 4">
        <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
          Cuéntanos sobre tu<span class="text-primary-100">inmueble</span>
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
      </div>
      <div class="step-5" v-if="step === 5">
        <div class="w-fit mx-auto lg:px-8 px-4">
          <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
            Sube buenas fotos de tu 
            <span class="text-primary-100">inmueble</span>
          </h4>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            <div class="upload-button" v-if="previewImages.length <= 10">
              <div class="flex items-center justify-center rounded-full bg-primary-50 w-14 h-14">
                <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
              </div>
              <p class="text-[#707070]"><span class="text-primary-100">Click para subir</span> o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)</p>
              <input type="file" @change="previewFiles" ref="file" multiple="multiple" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
            </div>
            <figure v-for="(img, index) in previewImages" :key="index">
              <img :src="img" class="w-full h-full object-cover">
              <AtomsButtons  class="absolute top-2 right-2" icon-name="general/trash-can" btn-type="btn-icon" @click="previewImages.splice(index, 1)"/>
              <p :class="[{cover: index === 0}]">
                Portada
              </p>
            </figure>
          </div>
          <p class="text-center mt-16 mb-8"> {{ previewImages.length }}/10 Fotos</p>
        </div>
      </div>
      <div class="step-6" v-if="step === 6">
        <div class="flex flex-col text-center items-center justify-center">
          <img class="w-[311px] mb-8 mt-11" src="/img/property-post.png" alt="Property">
          <h4 class="text-4xl leading-[42px] mb-7 font-medium">
            Anuncio enviado
            <br>
            <span class="text-primary-100">
              con éxito
            </span>
          </h4>
          <p class="text-sm leading-[22px]">Tu anuncio fue enviado con éxito a revisión.</p>
        </div>
      </div>
    </div>
  </KeepAlive>
  <nav class="flex gap-2.5 mx-auto w-fit mt-6 mb-11">
    <AtomsLink v-if="step === 1" link-to="/profile?tab=anuncio">
      Cancelar
    </AtomsLink>
    <AtomsButtons v-if="step >= 2 && step <= 5" @click="step--">
      Atrás
    </AtomsButtons>
    <AtomsButtons v-if="step <= 4" @click="step++">
      Continuar
    </AtomsButtons>
    <AtomsButtons v-if="step === 5" @click="createAdvertisement()">
      Crear Anuncio
    </AtomsButtons>
    <AtomsLink v-if="step >= 6" link-to="/">
      Volver a inicio
    </AtomsLink>
  </nav>
</template>

<script setup>
definePageMeta({
  middleware: ["logger"]
});
</script>

<script>
import { useUserStore } from '~/stores/User';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      user: useUserStore(),
      step: 1,
      optionSelected: "",
      categorySelected: 'Casa',
      categories: ["Casa", "Apatamento", "Villa", "Bohio", "Tiendita de acampar", "Penthouse", "Mansión", "Vecindad", "Casa rodante"],
      plans: [],
      planSelected: {},
      showPaymentProcess: false,
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
      propertyData: {},
      images: null,
      previewImages: []
    }
  },
  methods: {
    planInformation(planId, quantity, planName, price) {
      this.planSelected = {
        id: planId,
        planQuantity: quantity,
        name: planName,
        planPrice: price
      }

      if(this.planSelected.planPrice > 0) {
        this.showPaymentProcess = true;
      } else {
        const form = new FormData();
        form.append('plan_id', this.planSelected.id);
        form.append('quantity', this.planSelected.planQuantity)
        useFetch(useRuntimeConfig().API+'user-plans',{
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.user.token
          },
          body: form,
        });
        this.step++;
      }
    },
    async getPlans() {
      const { data }  = await useFetch(useRuntimeConfig().API+'generals/plans');
      this.plans = data._value.results;
    },
    async processPayment() {
      const form = new FormData();
      form.append('plan_id', this.planSelected.id);
      form.append('quantity', this.planSelected.planQuantity)
      const { data }  = await useFetch(useRuntimeConfig().API+'user-plans',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.user.token
        },
        body: form,
      });

      try {
        const res = data.value.results;
        this.$swal.fire({
          icon: 'success',
          text: 'Su pago ha sido realizado con exito'
        })
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          text: 'En estos momentos estamos presentando un error, intente mas tarde'
        })
        console.log(error)
      }
    },
    previewFiles(event) {
      this.images = event.target.files;
      for (var i = 0; i < this.images.length; i++ ){
        let file = this.images[i];
        this.previewImages.push(URL.createObjectURL(file));
      }
    },
    async createAdvertisement() {
      const form = new FormData();
      form.append('plan_id', this.planSelected.id);
      form.append('name', this.name);
      form.append('price', this.price);
      form.append('price_us', this.price_us);
      form.append('address', 'Jacobo Majluta 25');
      form.append('description',this.description);
      form.append('type', this.optionSelected);
      form.append('property_category', 2);
      form.append('town_id', 150);
      form.append('city_id', 40);
      form.append('country_id', 22);
      form.append('bedroom', this.bedrooms);
      form.append('bathroom', this.bathrooms);
      form.append('parking', this.parking);
      form.append('meters', this.meter);
      form.append('solar_meters', this.meter_2);
      form.append('latitude', 12.545654654654564);
      form.append('longitude', 15.545654654654564);
      form.append('property_status', this.property_status);
      form.append('image', this.$refs.file.files[0]);
      
      for (var i = 0; i < this.$refs.file.files.length; i++ ){
        let file = this.$refs.file.files[i];
        form.append('images[' + i + ']', file);
      }
      
      const{ data, pending, error, refresh  } = await useFetch(useRuntimeConfig().API+'advertisements',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.user.token,
          'Accept': 'application/json',
        },
        body: form,
        onRequestError({ request, response, options }) {
          const res = Object.values(response._data.message)
          for(var i = 0; i < res.length; i++) {
            Swal.fire({
              icon: 'error',
              html:
              `<ul><li>${res[i][0]}</li><ul>`,
            });
          }
        },
        onResponse({ request, response, options }) {
          const res = response._data;
          if(res.code === 200 ) {
            Swal.fire({
              icon: 'success',
              text:  `${res.message}`,
              showConfirmButton: false,
              timer: 4000
            });
            useRouter().push("/profile?tab=anuncio");
          }
        }
        
      });
    }
  },
  computed: {
    renderPlanText() {
      if(this.planSelected.name === 'VIP') {
        return 'vip';
      } else if (this.planSelected.name === 'SILVER') {
        return 'silver';
      } else if (this.planSelected.name === 'EXCLUSIVO') {
        return 'exclusive';
      } else if(this.planSelected.name === 'DESTACADOS') {
        return '';
      }
    },
    renderPrice() {
      if(!this.currencyTab) {
        this.price_us = this.price / 54;
      }
    }
  },
  watch: {
    price() {
      this.price_us = parseInt(this.price / 54);
    }
  },
  mounted() {
    this.user.getProfile();
    this.getPlans();
  }
}
</script>

<style lang="postcss" scoped>
.steps-wrapper {
  @apply flex justify-between  items-center lg:h-48 h-20 w-fit mx-auto lg:px-8;
  & div{
    @apply flex items-center flex-none whitespace-nowrap gap-2 lg:pl-5 md:pl-3 first:pl-0;
    & p {
      @apply hidden md:block text-[#888888];
    }
    & span {
      @apply border border-[#bababa] text-[#bababa] rounded-full w-8 h-8 flex flex-none justify-center items-center; 
    }
  }
}
.active {
  & p{ @apply text-neutral-black !important; }
  & span{ @apply text-neutral-white bg-primary-100 border-none !important; }
}
.last-step {
  & p{ @apply hidden lg:block text-neutral-black !important; }
  & span{ @apply text-primary-100 border-primary-100 !important; }
};
.progress{
  @apply border-primary-100 !important;
}

.step-1 {
  & .option {
    @apply sm:w-56 w-36  text-center text-base mb-14 cursor-pointer select-none flex items-center justify-center font-normal leading-[22px] border h-10 border-gray-300 rounded-md hover:bg-primary-100 hover:text-neutral-white hover:border-none;
    &.checked {
      @apply bg-primary-100 text-neutral-white font-semibold text-lg hover:bg-primary-90 !important;
    }
    & input { @apply appearance-none; }
  }
}

.step-2 {
  & .wrapper {
    @apply max-w-[971px] h-[490px]  overflow-y-scroll hover:overscroll-contain mx-auto px-5;
  }
  & .option {
    @apply cursor-pointer select-none flex items-center font-normal text-base  leading-[22px] border-b h-[70px] border-b-gray-100 hover:bg-primary-50 px-4;
    &.checked {
      @apply bg-primary-100 text-neutral-white font-semibold text-lg;
    }
    & input { @apply appearance-none; }
  }

  & .scrollbar {
    &::-webkit-scrollbar {
      @apply lg:w-[68px] w-[28px];
    }

    &::-webkit-scrollbar-track {
      @apply bg-neutral-white rounded-full;
    }

    &::-webkit-scrollbar-thumb {
      @apply lg:border-[30px] border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
    }
  }
}

.step-3 {
  & .payment-plan-resume {
    & .plan-price-card {
      @apply py-4 border-b border-[#D9D9D9] w-full flex gap-3 items-center;

      & .plan-name-card {
        @apply rounded-lg w-[100px] h-[70px] flex items-center justify-center font-medium;
        &.vip {
          background: linear-gradient(99.8deg, #FFAE10 -9.48%, #FFB800 45.36%, #FFD058 96.88%);
          @apply text-neutral-black;
        }
        &.silver { background: linear-gradient(104.59deg, #D9D9D9 8.17%, #ADADAD 51.17%, #FFFFFF 120.16%); }
        &.exclusive { background: linear-gradient(100.63deg, #000000 -6.24%, #2F1C1B 45.46%, #A89494 95.05%); }
      }

      & .plan-information {
        & p { @apply text-neutral-black text-sm font-medium mb-3; }
        & select { @apply bg-[#FFE9E9] text-primary-100 px-1.5 text-sm font-normal rounded-lg min-w-[123px] focus:outline-none h-10; }
      }

      & .plan-price { @apply ml-auto text-sm text-neutral-black font-medium; }
    }
  }

  & .form-group {
    @apply mb-4 w-full;
    & label { @apply text-neutral-black text-sm mb-1 block; }
    & input { @apply w-full border border-[#D9D9D9] rounded-sm block px-4 h-8 font-light placeholder:text-[#D9D9D9]; }
  }

  & .card-information {
    & input:first-child { @apply border-t-0 border-r-0; }
    & input:last-child { @apply border-t-0; }
  }
}

.step-4 {
  & label {
    @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
  }
  & .form-control {
    @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
  }
  & .price-btn {
    @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
    &.active { @apply bg-primary-100 text-neutral-white border-none; }
  }
  & textarea {
    @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
  }
}

.step-5 {

  & .upload-button {
    @apply sm:col-span-2 flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-[165px] overflow-hidden text-center px-2;
  }

  & figure {
    @apply relative rounded-md bg-primary-50 sm:w-[230px] h-40 overflow-hidden;
  }
  & .cover{
    @apply absolute bottom-0 bg-primary-100 w-full h-[35px] z-20 flex items-center justify-center text-neutral-white text-base
  }
}
</style>