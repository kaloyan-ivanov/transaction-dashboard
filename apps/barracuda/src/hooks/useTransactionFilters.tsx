import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TransactionFilters {
  amountLessThan?: string | undefined;
  amountMoreThan?: string | undefined;
  state?: string | undefined;
  date?: string | undefined;
  description?: string | undefined;
}

export function useTransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const amountLessThan = searchParams.get('amountLessThan');
  const amountMoreThan = searchParams.get('amountMoreThan');
  const state = searchParams.get('state');
  const date = searchParams.get('date');
  const description = searchParams.get('description');

  const setFilters = useCallback(
    (filters: TransactionFilters) => {
      setSearchParams((params) => {
        if (filters.state !== undefined) {
          params.set('state', filters.state);
        }
        if (filters.date !== undefined) {
          params.set('date', filters.date);
        }
        if (filters.amountLessThan !== undefined) {
          params.set('amountLessThan', filters.amountLessThan);
        }
        if (filters.amountMoreThan !== undefined) {
          params.set('amountMoreThan', filters.amountMoreThan);
        }
        if (filters.description !== undefined) {
          params.set('description', filters.description);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  return {
    amountLessThan,
    amountMoreThan,
    state,
    date,
    description,
    setFilters
  };
}
