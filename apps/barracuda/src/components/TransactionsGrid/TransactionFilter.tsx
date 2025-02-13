import React, { memo, useCallback, useMemo } from 'react';
import { useTransactionFilters } from '../../hooks/useTransactionFilters';
import { Button, Dropdown, DropdownButton, DropdownItem, DropdownMenu, Field, Input } from 'verticals-ui';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

const statuses = ['all', 'successful', 'failed', 'refunded'];

type TransactionFilters = {
  amountLessThan?: string;
  amountMoreThan?: string;
  state?: string;
  date?: string;
  // dateBefore?: string | undefined;
  // dateAfter?: string | undefined;
  description?: string;
};

function TransactionFilter() {
  const { t } = useTranslation();

  const { date, description, state, setFilters } = useTransactionFilters();

  const handleStateChange = useCallback(
    (state: TransactionFilters['state']) => {
      setFilters({ state: state });
    },
    [setFilters]
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ date: String(DateTime.fromISO(e.target.value).toMillis()) });
    },
    [setFilters]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ description: e.target.value });
    },
    [setFilters]
  );

  const handleSubmit = useCallback(() => {
    console.log('date', date);
    console.log('state', state);
  }, [date, state]);

  const renderStatusButtons = useMemo(() => {
    return statuses.map((status) => (
      <Button color={status === state ? 'indigo' : 'light'} key={status} onClick={() => handleStateChange(status)}>
        {t(`TransactionFilter.statuses.${status}`)}
      </Button>
    ));
  }, [state, t, handleStateChange]);

  const renderStatusDropdownItems = useMemo(() => {
    return statuses.map((status) => (
      <DropdownItem key={status} onClick={() => handleStateChange(status)}>
        {status}
      </DropdownItem>
    ));
  }, [handleStateChange]);

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>{renderStatusButtons}</div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '10px' }}>
        <Field>
          <Input
            style={{ width: '300px' }}
            placeholder="Search by AccountID or Description"
            value={description ?? ''}
            name="full_name"
            onChange={handleDescriptionChange}
          />
        </Field>
        <Dropdown>
          <DropdownButton plain aria-label="More options">
            All statuses
          </DropdownButton>
          <DropdownMenu>{renderStatusDropdownItems}</DropdownMenu>
        </Dropdown>
        <Field style={{ minWidth: '170px' }}>
          <Input
            type="datetime-local"
            name="url"
            value={date ? new Date(Number(date)).toISOString().slice(0, 16) : ''}
            onChange={handleDateChange}
          />
        </Field>
        <Button color="teal" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </>
  );
}

export default memo(TransactionFilter);
