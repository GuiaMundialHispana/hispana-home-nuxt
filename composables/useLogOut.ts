import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

export default function useLogOut() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useUserStore();

  async function logOut() {
    Swal.showLoading()
    await $fetch('auth/logout',{
      method: 'POST',
      baseURL: config.public.API,
      body: {
        token: localStorage.getItem('token')
      }
    });
    isLogged.value = false;
    localStorage.removeItem('token');

    try {
      Swal.hideLoading();
      Swal.close();
      useUserStore().$reset();
      useRouter().push("/")
    } 
    catch (error) {
      console.log(error);
    }
  }

  return { logOut }
}