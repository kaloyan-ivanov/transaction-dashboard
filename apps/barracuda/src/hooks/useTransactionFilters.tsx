import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TransactionFilters {
  amountLessThan?: string;
  amountGreaterThan?: string;
  amountEqualTo?: string;
  state?: string;
  date?: string;
  account?: string;
}

const filterKeys: (keyof TransactionFilters)[] = [
  'amountLessThan',
  'amountGreaterThan',
  'amountEqualTo',
  'state',
  'date',
  'account'
];

export function useTransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = filterKeys.reduce((acc, key) => {
    acc[key] = searchParams.get(key) ?? undefined;
    return acc;
  }, {} as TransactionFilters);

  const setFilters = useCallback(
    (newFilters: TransactionFilters) => {
      setSearchParams((params) => {
        filterKeys.forEach((key) => {
          if (newFilters[key] !== undefined) {
            params.set(key, newFilters[key]);
          }
        });
        return params;
      });
    },
    [setSearchParams]
  );

  const clearAmountFilter = useCallback(() => {
    ['amountEqualTo', 'amountLessThan', 'amountGreaterThan'].forEach((param) => {
      searchParams.delete(param);
    });
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams]);

  const clearAllFilters = useCallback(() => {
    setSearchParams((params) => {
      filterKeys.forEach((key) => params.delete(key));
      return params;
    });
  }, [setSearchParams]);

  return {
    ...filters,
    setFilters,
    clearAmountFilter,
    clearAllFilters
  };
}
