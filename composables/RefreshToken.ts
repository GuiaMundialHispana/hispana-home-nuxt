export default function useRefresh(callback:any) {
  const intervalId = setInterval(callback, 240000) // 4 minutos en milisegundos

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
}