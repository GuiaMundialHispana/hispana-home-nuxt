import Swal from 'sweetalert2';
export default function useUser() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useState('user', () => {});
  const { logOut } = useLogOut();

  async function getUser() {
    $fetch('auth/profile',{
      method: 'GET',
      baseURL: useRuntimeConfig().public.API,
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      onResponse({ response }) {
        let response_data = response._data;
        console.log(response_data);

        if(response_data.status || response_data.code === 200) {
          user.value = response_data.results.user;
        }

        if(!response_data.status || response_data.message === "Token invalid or not provided.") {
          // logOut();
          Swal.fire({
            icon: 'error',
            text: 'Por favor inicia sesion nuevamente',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 5000
          });
        }

        if(response._data.status === false) {
          // logOut();
          Swal.fire({
            icon: 'error',
            text: 'Confirma que tus datos esten correctos',
            timer: 2000
          });
        }
      },
      onResponseError({response}) {
        // logOut();
          Swal.fire({
            icon: 'error',
            text: 'Por favor inicia sesion nuevamente',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 5000
          });
      },
      onRequestError({response}) {
        // logOut();
        Swal.fire({
          icon: 'error',
          text: 'Por favor inicia sesion nuevamente',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 5000
        });
      }
    });
  }

  async function changePassword(email:string, newPassword:string, repeatPassword:string) {
    await $fetch(useRuntimeConfig().public.API+'auth/change-password',{
      method: 'POST',
      body: {
        email,
        password: newPassword,
        password_confirmation: repeatPassword,
        token: token.value
      },
      onResponseError({ response }) {
        if(response.status !== 200) {
          Swal.fire({
            icon: 'error',
            text: response._data.message,
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Hemos validado tus datos correctamente, intenta acceder otra vez',
            showConfirmButton: false,
            timer: 3000
          });
          useRouter().push("/");
        }
      }
    });
  }

  async function sendPassWordEmail(email:string) {
    await $fetch('auth/forgot-password',{
      method: 'POST',
      baseURL: useRuntimeConfig().public.API,
      body: {
        email
      },
      onResponse({response}) {
        if(response._data.code === 200) {
          console.log('Email enviado');
          Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            text: 'Hemos enviado un correo a tu cuenta',
            showConfirmButton: false,
            timer: 3000
          });
        }
      },
      onResponseError({ request, response, options }) {
        const res = response._data;
        Swal.fire({
          icon: 'error',
          text: res.message,
          showConfirmButton: false,
          timer: 3000
        });
      },
    });
  }

  // async getGoogle(){
  //   const { data,error }  = await useFetch(this.$config.public.API+'auth/social/google',{
  //     method: 'GET',
  //     headers: {
  //       'access-control-allow-origin': "*",
  //       'Content-Type':"application/json",
  //       'Accept': "application/json",
  //     }

  //   });
  //   const res = error;
  //   const res2 = data;
  // },

  return {
    getUser,
    changePassword,
    sendPassWordEmail
  }
}