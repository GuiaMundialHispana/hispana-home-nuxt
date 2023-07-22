<script setup>
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const user_store = useUserStore();
const config = useRuntimeConfig();
let step = ref(1);
let errors = ref(null);
let displayModal = ref(false);

async function createAdvertisement() {
  const form = new FormData();
  form.append('plan_id', use_posts.plan_id);
  form.append('type', use_posts.option_selected);
  form.append('property_category', use_posts.category_id);
  form.append('name', use_posts.name);
  form.append('price', use_posts.price);
  form.append('price_us', use_posts.price_us);
  form.append('address', use_posts.address);
  form.append('description', use_posts.description);
  form.append('town_id', use_posts.sector);
  form.append('city_id', use_posts.city);
  form.append('country_id', use_posts.country);
  form.append('bedroom', use_posts.bedrooms);
  form.append('bathroom', use_posts.bathrooms);
  form.append('parking', use_posts.parking);
  form.append('meters', use_posts.meter);
  form.append('solar_meters', use_posts.meter_2);
  form.append('latitude', use_posts.lat);
  form.append('longitude', use_posts.log);
  form.append('property_status', use_posts.property_status);
  use_posts.feature.forEach((element, index) => {
    form.append(`features[${index}]`, element);
  });
  form.append('image', use_posts.saved_images[0]);

  // saved_images.forEach((element, index)=>{
  //   form.append('images[' + index + ']',element);
  // });

  await useFetch('advertisements',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user_store.token}`,
      'Accept': 'application/json'
    },
    body: form,
    baseURL: config.public.API,
    onResponse({ response }) {
      const res = response._data;
      console.log(res)
      if(res.code === 200 ) {
        Swal.fire({
          icon: 'success',
          text:  `${res.message}`,
          showConfirmButton: false,
          timer: 4000
        });
        step.value = 6;
        setTimeout(() => {
          useRouter().push("/profile?tab=anuncio");
        }, 3000);
      }

      if(res.code === 400) {
        let messages = res.message;
        // console.log(messages)
        errors.value = messages
        console.log(errors.value)
        for(let i in errors.value[0]) {
          console.log(errors[i][0])
        }
      }
    }    
  });
};

</script>

<template>
  <section>
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
    <!-- 1 -->
    <KeepAlive>
      <PopulationPostPropertiesStep1 v-if="step === 1" @nexts="step = 2" />
    </KeepAlive>
    <!-- 2 -->
    <KeepAlive>
      <PopulationPostPropertiesStep2 v-if="step === 2" @nexts="step = 3" @back="step--" />
    </KeepAlive>
    <!-- 3 -->
    <KeepAlive>
      <PopulationPostPropertiesStep3 v-if="step === 3" @nexts="step = 4" @back="step--" />
    </KeepAlive>
    <!-- 4 -->
    <KeepAlive>
      <PopulationPostPropertiesStep4 v-if="step === 4" @nexts="step = 5" @back="step--" />
    </KeepAlive>
    <!-- 5 -->
    <KeepAlive>
      <PopulationPostPropertiesStep5 v-if="step === 5" @back="step--" />
    </KeepAlive>
    <!-- 6 -->
    <PopulationPostPropertiesStep6 v-if="step === 6" />
    <nav class="control-steps-postProperty">
      <AtomsButtons v-if="step === 5" @click="createAdvertisement()">
        Crear Anuncio
      </AtomsButtons>
    </nav>
    <PopulationPostPropertiesModalError v-if="displayModal" :errors="errors" @close="displayModal = false" />
    {{ errors }}
  </section>
</template>

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
}


/* .step-1 {
  & .option {
    @apply sm:w-56 w-36  text-center text-base mb-14 cursor-pointer select-none flex items-center justify-center font-normal leading-[22px] border h-10 border-gray-300 rounded-md hover:bg-primary-100 hover:text-neutral-white hover:border-none;
    &.checked {
      @apply bg-primary-100 text-neutral-white font-semibold text-lg hover:bg-primary-90 !important;
    }
    & input { @apply appearance-none; }
  }
} */

/* .step-2 {
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

  .select-multiple { @apply h-40; }
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
    & > div { @apply flex items-center justify-center rounded-full bg-primary-50 w-14 h-14;}
  }

  & figure {
    @apply relative rounded-md bg-primary-50 sm:w-[230px] h-40 overflow-hidden;
  }
  & .cover{
    @apply absolute bottom-0 bg-primary-100 w-full h-[35px] z-20 flex items-center justify-center text-neutral-white text-base
  }

  .upload-photos-container { @apply grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3; }

  .warning-message { @apply flex gap-2 items-center justify-center w-fit py-1 px-2 bg-primary-100 text-neutral-white font-semibold rounded-lg; }
} */
</style>