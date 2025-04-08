export default function useGetCountry() {
  const config = useRuntimeConfig();
  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);

  useFetch('generals/countries', {
    method: 'GET',
    baseURL: config.public.API,
    transform(data: { results: { data: any[]; }; }) {
      data.results.data.forEach(element => {
        if(element.id === 63 || element.id === 236) {
          countries.value.push(element);
        }
      })
    }
  });

  const getStates = async (country_id: number) => {
    const statesApi = await $fetch(config.public.API + 'generals/states/' + `${country_id}`);
    states.value = statesApi.results.data;
  };

  const getCities = async (state_id: number) => {
    const citiesApi = await $fetch(config.public.API + 'generals/cities/' + `${state_id}`);
    cities.value = citiesApi.results.data;
  };

  return { countries, getStates, states, getCities, cities };
}