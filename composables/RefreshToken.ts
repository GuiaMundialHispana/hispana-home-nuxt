import Swal from 'sweetalert2';
export default function useRefresh() {
  const isLogged = useState('isLogged');
  const token = useState('token');

  async function refresh_token() {
    const {data, error} = await useFetch('auth/refresh',{
      method: 'POST',
      baseURL: useRuntimeConfig().public.API,
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      onResponseError({response}) {
        let responseApi = response._data.message;
        if(response.status === 404 || responseApi === "Token invalid or not provided.") {
          localStorage.removeItem('token');
          isLogged.value = false;
          Swal.showLoading();
          useRouter().push("/").then(() => {
            Swal.fire({
              icon: 'error',
              text: 'Por favor inicia sesion nuevamente',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 5000
            });
          });
        }
      }
    });

    if(data) {
      let response = data.value;
      let user_response = data.value.results.user;
    }

    if(data.value != null) {
      token.value = data.value.results.access_token;
      localStorage.setItem('token', token.value);
    }
  }

  return { refresh_token }
}