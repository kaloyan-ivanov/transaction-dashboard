import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TransactionFilters {
  amountLessThan?: string;
  amountMoreThan?: string;
  state?: string;
  date?: string;
  description?: string;
}

export function useTransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterKeys: (keyof TransactionFilters)[] = useMemo(
    () => ['amountLessThan', 'amountMoreThan', 'state', 'date', 'description'],
    []
  );

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
    [filterKeys, setSearchParams]
  );

  return {
    ...filters,
    setFilters
  };
}
