export const formatNumber = (
  number?: number,
  currency?: string,
  options: Intl.NumberFormatOptions = {},
) => {
  if (currency) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency,
    }).format(number ?? 0)
  }

  return number?.toLocaleString('nl-NL', options) ?? '0'
}
