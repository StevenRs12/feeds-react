export function formatEuroPrice(price: number | string, locale: string = 'es-ES'): string {
    const numberPrice = typeof price === 'string' ? parseFloat(price) : price;
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR'
    });
    return formatter.format(numberPrice);
}
