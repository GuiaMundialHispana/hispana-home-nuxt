// import { useAuthStore } from '@/stores/auth';
export default defineNuxtRouteMiddleware((to, from) => {
  const isLogged = useState('isLogged');
  const token = useState('token');
  // const user_store = useAuthStore();
  const { getUser } = useUser();
  if(import.meta.client) {
    let tokenClient = window.localStorage.getItem('token');
    if(tokenClient) {
      token.value = tokenClient;
      // user_store.token = tokenClient;
      getUser();
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  }
  // if(process.client) {
  //   let get_token = window.localStorage.getItem('token');
  //   if(get_token !== null) {
  //     isLogged.value = true;
  //     token.value = get_token;
  //     getUser().catch(() => {
  //       isLogged.value = false;
  //     })
  //     user_store.token = get_token;
  //     use_auth.isLoggedIn = true;
  //     user_store.get_user().catch(() => {
  //       use_auth.isLoggedIn = false;
  //     });
  //   } else {
  //     use_auth.isLoggedIn = false;
  //   }
  // }
});
