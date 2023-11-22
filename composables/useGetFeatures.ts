export default function useFeatures() {
  const config = useRuntimeConfig();

  const { data: features } = useFetch('generals/features', {
    method: 'GET',
    baseURL: config.public.API,
    transform(data) {
      return data?.results
    }
  });

  return { features }
}