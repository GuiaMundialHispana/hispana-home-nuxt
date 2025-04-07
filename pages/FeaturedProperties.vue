<template>
  <section class="w-full md:h-[450px] lg:h-[500px] relative pt-6 sm:pt-16 md:pt-20 mx-auto  border-b border-gray-300 flex items-center justify-start ">
    <div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] w-full mx-auto text-neutral-white">
      <h1 class="lg:whitespace-nowrap text-neutral-white">Estás más cerca del <br class="hidden sm:block"/><span class="font-bold">hogar de tus sueños</span>
      </h1>
      <p class="pt-6 md:pt-8 text-sm lg:whitespace-nowrap">Busca, encuentra y compra el inmueble perfecto con <strong>Grupo Casas & mas</strong>, el buscador de inmuebles<br class="md:block hidden"> que te ofrece la mejor selección de propiedades. ¡Empieza tu búsqueda hoy mismo!</p>
      <AtomsLink
        linkTo="/search?type=All" 
        btn-size="large" 
        class="my-5 font-semibold">
        Buscar más propiedades
      </AtomsLink>
    </div>
    <img src="/img/featured-properties-bg.jpg" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover transform -scale-x-100 ">
    <p class="hidden">
      Foto de <a href="https://unsplash.com/es/@chatelp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pierre Châtel-Innocenti</a> en <a href="https://unsplash.com/es/fotos/N5RN0JE5kaY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </p>
  </section>
  <GeneralExclusiveProperties :properties="exclusive" :pending="exclusive_status" />
  <GeneralVipProperties :properties="vip" :pending="vip_status" />
  <GeneralSilverProperties :properties="silver" :pending="silver_status" />
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const { data: exclusive, status: exclusive_status } = useFetch('advertisements/home?plan=2', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});

const { data: vip, status: vip_status } = useFetch('advertisements/home?plan=1', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});

const { data: silver, status: silver_status } = useFetch('advertisements/home?plan=3', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
});
</script>