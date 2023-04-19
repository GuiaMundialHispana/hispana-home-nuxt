<template>
  <section class="max-w-[972px] mx-auto mt-[72px] px-4 mb-24">
    <div class="flex items-center gap-x-2  mb-3.5">
      <AtomsLink
        btn-type="btn-icon"
        iconName="arrows/arrow-left"
        link-to="/profile?tab=anuncio"
      />
      <h3 class="text-[28px] leading-[42px] font-semibold">Editar perfil</h3>
    </div>
    <p class="text-sm leading-[22px]">Actualiza tu información personal y detalles aquí.</p>
    <hr class="bg-gray-300 h-[1px] w-full border-none mt-8 mb-[22px]">
    <div class="form">
      <div class="flex flex-col">
        <h4>Información personal</h4>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              :placeholder="user.userData.name"
              v-model="editUser.editUserData.name"
              class="mr-4"
            >
          </label>
          <label>
            Apellido:
            <input
              type="text"
              v-model="editUser.editUserData.lastname"
            >
          </label>
        </div>
        <div>
          <label class="relative">
            Fecha de nacimiento:
            <input
              type="date"
              v-model="editUser.editUserData.birthdate"
              class="datePicker uppercase text-[#727272] mr-4"
            >
          </label>
          <label>
            País:
            <select>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
            </select>
          </label>
        </div>
      </div>
      <h4>Contactos</h4>
      <div>
        <label>
          Teléfono móvil:
          <input
            type="tel"
            class="mr-4"
            v-model="editUser.editUserData.cellphone"
            :placeholder="user.userData.cellphone"
          >
        </label>
        <label>
          Teléfono residencial:
          <input
            type="tel"
            :placeholder="user.userData.phone"
          >
        </label>
      </div>
      <div>
        <label>
          Correo electrónico:
          <input
            type="email"
            :placeholder="user.userData.email"
          >
        </label>
      </div>
      <div class="flex flex-col mt-8">
        <h4>Contraseña</h4>
        <p class="mt-3 mb-6">Una contraseña segura que te ayuda a proteger tu cuenta de Hispana Home</p>
        <p>*************************</p>
        <button class="flex items-center gap-2 text-primary-100 mb-4 mt-4" @click="showChangePasswd = !showChangePasswd">
          Cambiar contraseña 
          <AtomsIcon name="arrows/arrow-right" :size=15 v-if="!showChangePasswd"/>
          <AtomsIcon name="arrows/arrow-down" :size=15 v-if="showChangePasswd"/>
        </button>
        <div class="flex-col md:w-[500px]" v-if="showChangePasswd">
          <label>
            Contraseña actual:
            <input
              type="password"
              placeholder="******"
            >
          </label>
          <label>
            Contraseña nueva:
            <input
              type="password"
            >
          </label>
          <label>
            Confirma la nueva contraseña:
            <input
              type="password"
              v-model="password_confirmation"
            >
          </label>
          <div class="flex gap-2.5 mr-auto mt-2">
            <AtomsButtons btn-size="xsmall" btn-style="solid-primary">
              Guardar
            </AtomsButtons>
          </div>
        </div>
      </div>
      <div class="mt-8 md:h-40 flex-col md:flex-row">
        <div class="flex flex-col md:mr-14 mb-6 md:mb-0">
          <div class="flex flex-col items-center">
            <p class="whitespace-nowrap">Actualiza tu foto de perfil</p>
            <figure class="w-[107px] h-[107px] rounded-full border-[5px] border-primary-50 mt-5">
              <img :src="editUser.editUserData.profile_pic" :alt="user.userData.name" class="rounded-full w-full h-full object-cover">
            </figure>
          </div>
        </div>
        <div class="flex flex-col relative items-center justify-center border border-gray-300 rounded-md w-full h-40 overflow-hidden text-center">
          <div class="flex items-center justify-center rounded-full bg-primary-50 w-14 h-14">
            <AtomsIcon name="general/upload" :size=28 class="text-primary-100" />
          </div>
          <p class="text-[#707070]"><span class="text-primary-100">Click para subir</span> o arrastra y suelta SVG, PNG, <br> JPG or GIF (max. 800px400px)</p>
          <input type="file" @change="previewFiles"  class="absolute left-0 top-0 scale-[9] cursor-pointer opacity-0">
        </div>
      </div>
      <div class="flex gap-2.5 ml-auto mt-12">
        <AtomsLink
          class="cancel-btn"
          btn-size="xsmall"
          btn-style="outline-gray"
          link-to="/profile"
          >Cancelar
        </AtomsLink>
        <AtomsButtons
          btn-size="xsmall"
          btn-style="solid-primary"
          @click="updateUser()"
          >Guardar
        </AtomsButtons>
      </div>
    </div>
  </section>
</template>

<!-- <script setup>
import { useUserStore } from '~/stores/User';
import { useUserEditStore } from '~/stores/EditUser';
import FormData from 'form-data';
import { watch, ref } from 'vue';
definePageMeta({
  middleware: ["logger"]
});

const user = useUserStore();
const editUser = useUserEditStore ();
const showChangePasswd = ref(false);
let profilePic = ref('');
let images = ref(null);

watch(profilePic, () => 
  editUser.editUserData.profile_pic = profilePic,
  console.log(profilePic)
)

function previewFiles(event) {
  images = event.target.files[0]
  profilePic = URL.createObjectURL(images);
  editUser.images = images;
  // console.log(profilePic)
}

async function updateUser() {
  const form = new FormData();
  form.append('user_id', editUser.editUserData.user_id);
  form.append('email', editUser.editUserData.email)
  form.append('name', editUser.editUserData.name);
  form.append('lastname', editUser.editUserData.lastname);
  form.append('birthdate', editUser.editUserData.birthdate);
  form.append('country_id', editUser.editUserData.country_id);
  form.append('cellphone', editUser.editUserData.cellphone);
  form.append('phone', editUser.editUserData.phone);
  form.append('profile_pic', editUser.images);

  await useFetch(useRuntimeConfig().API+'users/update?_method=PUT',{
    method: 'POST',
    body: form,
    headers: {
      'Authorization': 'Bearer ' + editUser.user.token,
      'Accept': 'application/json',
    },
    onResponseError({ request, response, options }) {
      const res = response._data;
      Swal.fire({
        icon: 'error',
        text: 'Tenemos un error para validar tus datos, por favor intente mas tarde',
        showConfirmButton: false,
        timer: 3000
      });
    }
  });
}

onMounted(()=> {
  user.getProfile();
});
</script> -->

<script>
import { useUserStore } from '~/stores/User';
import { useUserEditStore } from '~/stores/EditUser';
import FormData from 'form-data';
export default {
  data() {
    return {
      user: useUserStore(),
      editUser:useUserEditStore (),
      showChangePasswd: false,
      profilePic: '',
      images: null,
    }
  },
  watch:{
    profilePic() {
      this.editUser.editUserData.profile_pic = this.profilePic;
    }
  },
  methods: {
    previewFiles(event) {
      this.images = event.target.files[0]
      this.profilePic = URL.createObjectURL(this.images);
      this.editUser.images = this.images;
    },
    async updateUser() {
      const form = new FormData();
      form.append('user_id', this.editUser.editUserData.user_id);
      form.append('email', this.editUser.editUserData.email)
      form.append('name', this.editUser.editUserData.name);
      form.append('lastname', this.editUser.editUserData.lastname);
      form.append('birthdate', this.editUser.editUserData.birthdate);
      form.append('country_id', this.editUser.editUserData.country_id);
      form.append('cellphone', this.editUser.editUserData.cellphone);
      form.append('phone', this.editUser.editUserData.phone);
      form.append('profile_pic', this.editUser.images);

      await useFetch(useRuntimeConfig().API+'users/update?_method=PUT',{
        method: 'POST',
        body: form,
        headers: {
          'Authorization': 'Bearer ' + this.editUser.user.token,
          'Accept': 'application/json',
        }
      });

      try {
        this.$swal({
          icon: 'success',
          text: 'Sus datos han sido actualizados',
          showConfirmButton: false,
          timer: 2000
        });
        useRouter().push("/profile?tab=anuncio");
      } catch (error) {
        this.$swal({
          icon: 'error',
          text: 'Confirma que todos los datos esten completos'
        });
      }
    }
  },
  created() {
    this.user.getProfile();
  }
}
</script>

<script setup>
definePageMeta({
  middleware: ["logger"]
});
</script>

<style lang="postcss" scoped>
.form {
  @apply flex flex-col w-full;
  & div { @apply flex; }
  & label { @apply flex flex-col w-full text-sm leading-[22px]; }
  & input, 
  & select {
    @apply border border-gray-300 rounded-md h-8 focus:outline-primary-100 px-2 mb-3.5 cursor-pointer;
  }
}
h4 {
  @apply text-xl leading-[30px] font-semibold mb-3.5;
}
.datePicker {
  &::-webkit-calendar-picker-indicator {
    @apply opacity-25 cursor-pointer; 
  }
}
.cancel-btn {
  @apply hover:bg-gray-300 text-neutral-black !important;
}
</style>