<template>
<div class="w-fit mx-auto lg:px-8 px-4">
  <h4 class="font-semibold text-[28px] leading-[42px] mt-11 mb-7 text-center">
    Sube buenas fotos de tu 
    <span class="text-primary-100">
      inmueble
    </span>
  </h4>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
    <div class="sm:col-span-2 flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-[165px] overflow-hidden text-center" v-if="previewImages.length <= 10">
      <div class="flex items-center justify-center rounded-full bg-primary-50 w-14 h-14">
        <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
      </div>
      <p class="text-[#707070]"><span class="text-primary-100">Click para subir</span> o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)</p>
      <input type="file" @change="previewFiles"  multiple="multiple" class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
    </div>
    <figure v-for="(img, index) in previewImages" :key="index" class="relative rounded-md bg-primary-50 sm:w-[230px] h-40 overflow-hidden">
      <img :src="img" class="w-full h-full object-cover">
      <AtomsButtons 
        class="absolute top-2 right-2"
        icon-name="general/trash-can"
        btn-type="btn-icon"
        btn-style="solid-primary"
        @click="previewImages.splice(index, 1)"
      />
      <p :class="[{cover: index === 0}]">
        Portada
      </p>
    </figure>
  </div>
  <p class="text-center mt-16 mb-8"> {{ previewImages.length }}/10 Fotos</p>
  <div class="flex justify-center w-full mt-4">
    <AtomsButtons
      btn-style="solid-primary"
      btn-size="xsmall"
      @click="sendPropertyData()"
      >confirmar
    </AtomsButtons>
  </div>
</div>
</template>
<script>
export default{
  data() {
    return {
      previewImages: [],
      propertyImgs: []
    }
  },
  watch: {
    previewImages() {
      if(this.previewImages.length > 10) {
      }
    }
  },
  methods: {
    previewFiles(event) {
      this.images = event.target.files
      for (var i = 0; i < this.images.length; i++ ){
        let file = this.images[i];
        this.previewImages.push(URL.createObjectURL(file));
        this.propertyImgs.push(file)
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
.cover{
  @apply absolute bottom-0 bg-primary-100 w-full h-[35px] z-20 flex items-center justify-center text-neutral-white text-base
}
</style>