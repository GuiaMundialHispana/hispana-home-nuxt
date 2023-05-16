export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/search/null') {
    return navigateTo('/notFound')
  }
})