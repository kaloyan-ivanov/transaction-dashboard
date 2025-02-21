import { Transaction } from '../components/TransactionsGrid/TransactionsData';

export const formatAmount = (transaction: Transaction) => {
  const amount = transaction.amounts.amount / Math.pow(10, parseInt(transaction.decimalPrecision));
  switch (transaction.currency) {
    case 'USD':
      return `$${amount.toFixed(2)}`;
    case 'EUR':
      return `€${amount.toFixed(2)}`;
    default:
      return `${amount.toFixed(2)} ${transaction.currency}`;
  }
};

// Mapping from country names to ISO 3166-1 alpha-2 codes
const countryNameToCode: Record<string, string> = {
  'United States': 'US',
  Canada: 'CA'
  // Add more mappings as needed
};
export const getCountryCode = (transaction: Transaction): string => {
  if (!transaction) return '';
  const country = transaction.paymentMethod.card.address.country;
  return country.length === 2 ? country : countryNameToCode[country] || '';
};
