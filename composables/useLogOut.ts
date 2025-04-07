import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

export default function useLogOut() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useUserStore();

  async function logOut() {
    Swal.showLoading()
    isLogged.value = false;
    token.value = '';
    localStorage.removeItem('token');
    useRouter().push("/")
    useUserStore().$reset();
    await $fetch('auth/logout',{
      method: 'POST',
      baseURL: config.public.API,
      body: {
        token: localStorage.getItem('token')
      }
    });

    try {
      Swal.hideLoading();
      Swal.close();
      useUserStore().$reset();
      useRouter().push("/")
    } 
    catch (error) {
      useRouter().push("/")
    }
  }

  return { logOut }
}