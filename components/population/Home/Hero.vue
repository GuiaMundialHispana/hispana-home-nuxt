<template>
  <section class="w-full md:min-h-[400px] relative pt-6 sm:pt-16 mx-auto mb-[50px] border-b border-gray-300">
    <div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] mx-auto">
      <h1 class="lg:whitespace-nowrap lg:text-[40px]">Estás más cerca del <span class="text-primary-100 font-bold">hogar de tus sueños</span>
      </h1>
      <p class="text-sm lg:whitespace-nowrap">Busca, encuentra y compra el inmueble perfecto con <strong>Hispana Home</strong>, el buscador de inmuebles<br class="md:block hidden"> que te ofrece la mejor selección de propiedades. ¡Empieza tu búsqueda hoy mismo!</p>
    </div>
    <img src="/img/hero.jpg" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover object-center md:block hidden">
    <PopulationHomeFilterProperties class="hidden lg:block left-1/2 -translate-x-2/4"/>
    <div class="flex justify-center relative z-10 lg:hidden">
      <AtomsLink
        linkTo="/search?type=All" 
        btn-size="large" 
        class="my-5 font-semibold">
        Buscar propiedades
      </AtomsLink>
    </div>
  </section>
</template>

<style scoped>
section {
  position: relative;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #FFFFFF 50.6%, rgba(255, 255, 255, 0) 97.73%);
  z-index: 10;
}
</style>