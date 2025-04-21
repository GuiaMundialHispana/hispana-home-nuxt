import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

export default function useLogOut() {
  const isLogged = useState('isLogged');
  const config = useRuntimeConfig();
  const token = useState('token');
  const user = useUserStore();

  async function logOut() {
    const refer = useState('refer');
    await $fetch('auth/logout',{
      method: 'POST',
      baseURL: config.public.API,
      body: {
        token: localStorage.getItem('token')
      }
    });
    localStorage.removeItem('token');
    Swal.showLoading()
    isLogged.value = false;
    token.value = '';
    useRouter().push("/")
    useUserStore().$reset();
    refer.value = '';
    localStorage.removeItem('ref')

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