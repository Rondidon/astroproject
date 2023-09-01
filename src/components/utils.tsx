export const formatCurrency = (amount: number): string => {
    const result: string = new Intl.NumberFormat('de-DE', {
        currency: 'eur',
        style: 'currency',
    }).format(amount);
    return result;
}