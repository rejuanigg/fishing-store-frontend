export function useFormatPrice(value) {
  const formatedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(value)

  return { formatedPrice }
}
