<template>
  <section class="md:px-14 px-4">
    <div class="grid md:grid-cols-12 grid-cols-1 gap-8 justify-center 2xl:max-w-6xl">
      <div class="lg:col-span-8 col-span-12">
        <h1 class="text-[28px] leading-[28px] font-semibold md:mb-12 mb-8">Vendo Apartamentos En Las Américas de 1, 2, 3 habitaciones</h1>
        <!-- Price -->
        <div class="flex md:items-center md:flex-row flex-col md:gap-6 gap-2 border-b border-gray-100 pb-4 mb-8">
          <p class="text-neutral-black text-base font-normal">
            Desde
            <br>
            <span class="text-primary-100 xl:text-[28px] text-xl xl:leading-[28px] font-semibold mt-2">US$84,192.00</span>
          </p>
          <p class="text-neutral-black text-base font-normal">
            Hasta
            <br>
            <span class="text-primary-100 xl:text-[28px] text-xl xl:leading-[28px] font-semibold mt-2">US$119,192.00</span>
          </p>
          <button class="md:ml-auto md:w-max w-full border-2 border-gray-100 rounded-lg h-10 flex items-center justify-center text-sm text-neutral-black font-normal px-2.5 hover:text-neutral-white hover:bg-primary-100 hover:font-semibold hover:border-primary-100-100">
            <AtomsIcon class="mr-2.5" name="general/price" :size=18 />
            Calcula tu préstamo
          </button>
        </div>
        <!-- Caracteristicas -->
        <div class="md:flex xl:justify-start justify-center grid grid-cols-2 items-center flex-wrap xl:gap-16 md:gap-6 gap-2 md:mb-8 mb-2">
          <!--  -->
          <div class="flex items-center">
            <AtomsIcon name="general/bed" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">4 Habitaciones</p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/bathtub" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">3.5 Baños</p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/car" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">3 Parqueos</p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/area" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">340 m2 de construcción</p>
          </div>
        </div>
        <!-- Estado -->
        <ul class="max-w-4xl md:p-2.5 md:flex justify-center grid grid-cols-2 md:gap-0 gap-2 md:items-center md:flex-row flex-col bg-[#FFF6F6] rounded">
          <li class="md:h-11 h-8 flex items-center md:justify-center md:border-r border-primary-100 xl:text-base text-xs text-neutral-black font-semibold xl:pr-14 md:pr-8">
            <AtomsIcon name="general/share-location" :size=19 class="text-primary-100 mr-2.5" />
            Autopista San Isidro
          </li>
          <li class="md:h-11 h-8 flex items-center md:justify-center md:border-r border-primary-100 xl:text-base text-xs text-neutral-black font-semibold xl:px-14 md:px-8">
            <AtomsIcon name="general/status" :size=19 class="text-primary-100 mr-2.5" />
            Estado: Nuevo
          </li>
          <li class="md:h-11 h-8 flex items-center md:justify-center xl:text-base text-xs text-neutral-black font-semibold xl:pl-14 md:pl-8">
            <AtomsIcon name="general/calendar_month" :size=19 class="text-primary-100 mr-2.5" />
            Entrega: 2024
          </li>
        </ul>
      </div>
      <div class="lg:col-span-4 md:col-span-8 md:col-start-3 col-span-12 pb-10 border-b border-gray-100 h-max">
        <figure class="user-image">
          <img src="/img/user.jpg" alt="User name">
        </figure>
        <h6 class="user-name">Gustavo Emil Hernandez Campos</h6>
        <p class="user-position">Vendedor inmobiliario</p>
        <div class="flex justify-center">
          <AtomsButtons class="mx-auto" iconName="social-media/whatsapp" icon-position="left">Contactar vendedor</AtomsButtons>
        </div>
        <a href="mailto:gustavo.hernandez@hispana.com" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="general/mail" :size=18 class="mr-2.5"/>
          gustavo.hernandez@hispana.com
        </a>
        <a href="tel:8091234667" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="general/phone" :size=18 class="mr-2.5"/>
          (809) 123-4667
        </a>
      </div>
    </div>
    <!-- Caracteristicas -->
    <div class="pb-[76px] md:pt-16 pt-8 2xl:max-w-6xl">
      <h2 class="text-[28px] leading-[28px] font-semibold md:mb-12 mb-8">Características</h2>
      <div class="grid xl:grid-cols-2 grid-cols-1 gap-4 overflow-hidden items-center">
        <ul class="characteristics-table">
          <li>
            <h3>Superficie total</h3>
            <p>152 m2</p>
          </li>
          <li>
            <h3>Superficie Construida</h3>
            <p>172 m2</p>
          </li>
          <li>
            <h3>Dormitorios</h3>
            <p>3</p>
          </li>
          <li>
            <h3>Baños</h3>
            <p>4</p>
          </li>
          <li>
            <h3>Parqueo</h3>
            <p>4</p>
          </li>
        </ul>
        <ul class="characteristics-table">
          <li>
            <h3>Ascensor</h3>
            <p>152 m2</p>
          </li>
          <li>
            <h3>Gimnasio</h3>
            <p>172 m2</p>
          </li>
          <li>
            <h3>Cisterna</h3>
            <p>3</p>
          </li>
          <li>
            <h3>Family Room</h3>
            <p>4</p>
          </li>
          <li>
            <h3>Lobby</h3>
            <p>4</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- Description -->
    <div class="pb-12 md:pt-16 2xl:max-w-6xl">
      <h2 class="text-[28px] leading-[28px] font-semibold md:mb-12 mb-8">Descripción del inmueble</h2>
      <p class="text-sm text-neutral-black font-normal">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
    </div>
    <!-- Location -->
    <div class="pb-16 2xl:max-w-6xl">
      <h2 class="text-[28px] leading-[28px] font-semibold mb-7">Ubicación</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6136296345717!2d-69.96063644873286!3d18.50115238735866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8baa32a7da09%3A0x56ba1ba2dafd11b6!2sDealer%20de%20vehiculos!5e0!3m2!1ses-419!2sdo!4v1679439570462!5m2!1ses-419!2sdo" class="w-full rounded-lg h-96"></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PropertyInformation'
}
</script>

<style lang="postcss" scoped>
.user-image {
  @apply w-24 h-24 rounded-full border-4 border-solid border-primary-50 overflow-hidden mx-auto mb-2;
  & img { @apply w-full h-full bg-cover bg-center; }
}

.user-name { @apply text-neutral-black text-base font-semibold text-center; }
.user-position { @apply text-sm text-neutral-black text-center font-normal mb-4; }

.btn { @apply rounded-lg !important; }

.characteristics-table {
  @apply rounded-lg border border-[#ADADAD];

  & li {
    @apply grid grid-cols-2;

    & h3 { @apply px-7 py-2.5 border-b border-r border-[#ADADAD] font-semibold text-base text-neutral-black; }
    & p { @apply px-7 py-2.5 border-b border-gray-100 font-normal text-base text-neutral-black; }
  }

  & li:last-child h3 { @apply border-b-0; }
  & li:last-child p { @apply border-b-0; }
}
</style>