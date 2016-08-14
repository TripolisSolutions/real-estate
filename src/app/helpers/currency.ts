export const formatCurrency = (v: number, currency: string) => {
    const parts = v.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.')
}
