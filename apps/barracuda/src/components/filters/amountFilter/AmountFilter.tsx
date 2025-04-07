import React, { memo, useCallback, useState } from 'react';
import AmountField from './AmountField';
import AmountDialog from './AmountDialog';
import { isEmpty } from 'lodash';
import { useTransactionFilters } from '../../../hooks/useTransactionFilters';

function AmountFilter(): JSX.Element {
  const { amountLessThan, amountEqualTo, amountGreaterThan, setFilters, clearAmountFilter } = useTransactionFilters();

  const [isOpenAmountDialog, setIsOpenAmountDialog] = useState(false);
  const [amountFilter, setAmountFilter] = useState<string>('');

  const handleAmountLessThanChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ amountLessThan: e.target.value });
    },
    [setFilters]
  );

  const handleAmountMoreThanChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ amountGreaterThan: e.target.value });
    },
    [setFilters]
  );

  const handleAmountEqualToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ amountEqualTo: e.target.value });
    },
    [setFilters]
  );

  const onAmountFilterOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newFilter = event.target.value;

      if (newFilter === 'isGreaterThan') {
        const valueToSet = amountLessThan ?? amountEqualTo;
        clearAmountFilter();
        setFilters({ amountGreaterThan: valueToSet });
      } else if (newFilter === 'isLessThan') {
        const valueToSet = amountGreaterThan ?? amountEqualTo;
        clearAmountFilter();
        setFilters({ amountLessThan: valueToSet });
      } else if (newFilter === 'isEqualTo') {
        const valueToSet = amountLessThan ?? amountGreaterThan;
        clearAmountFilter();
        setFilters({ amountEqualTo: valueToSet });
      } else if (newFilter === 'isBetween') {
        clearAmountFilter();
        setFilters({ amountGreaterThan: '', amountLessThan: '' });
      }

      setAmountFilter(newFilter);
    },
    [amountEqualTo, amountGreaterThan, amountLessThan, clearAmountFilter, setFilters]
  );

  const handleAccountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ account: e.target.value });
    },
    [setFilters]
  );

  const handleOpenAmountDialog = useCallback(() => {
    setIsOpenAmountDialog(true);
    if (isEmpty(amountFilter)) setAmountFilter('isEqualTo');
  }, [amountFilter]);

  const handleCloseAmountDialog = useCallback(() => {
    clearAmountFilter();
    setIsOpenAmountDialog(false);
    setAmountFilter('');
  }, [clearAmountFilter]);
  return (
    <>
      <AmountField
        amountFilter={amountFilter}
        amountLessThan={amountLessThan}
        amountEqualTo={amountEqualTo}
        amountGreaterThan={amountGreaterThan}
        handleOpenAmountDialog={handleOpenAmountDialog}
      />
      <AmountDialog />
    </>
  );
}
export default memo(AmountFilter);
