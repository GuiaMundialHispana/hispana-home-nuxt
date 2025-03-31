<template>
	<div>
		<section class="hero">
			<div class="md:pl-14 relative z-10 md:text-left text-center px-4 max-w-[97rem] mx-auto">
				<h1 class="lg:whitespace-nowrap lg:text-[40px]">Estás más cerca del <span class="text-primary-100 font-bold">hogar de tus sueños</span>
				</h1>
				<p class="text-sm lg:whitespace-nowrap">Busca, encuentra y compra el inmueble perfecto con <strong>Grupo Casas & mas</strong>, el buscador de inmuebles<br class="md:block hidden"> que te ofrece la mejor selección de propiedades. ¡Empieza tu búsqueda hoy mismo!</p>
			</div>
			<img src="/img/hero.jpg" alt="Building" class="absolute z-0 top-0 w-full h-full object-cover object-center md:block hidden">
			<GeneralFilterProperties class="hidden lg:block left-1/2 -translate-x-2/4"/>
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
		<OrganismVipProperties />
		<OrganismSilverProperties />
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

<script setup>
const config = useRuntimeConfig();

const { data: exclusive, status: exclusive_status, error} = await useFetch('advertisements/home?plan=2', {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results.data
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
</style>