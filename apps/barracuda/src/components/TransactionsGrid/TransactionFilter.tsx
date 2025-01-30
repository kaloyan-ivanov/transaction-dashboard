import React, { useCallback } from 'react';
import { useTransactionFilters } from '../../hooks/useTransactionFilters';
import { Button, Dropdown, DropdownButton, DropdownItem, DropdownMenu, Field, Input } from 'verticals-ui';

interface TransactionFilters {
  amountLessThan?: string | undefined;
  amountMoreThan?: string | undefined;
  state?: string | undefined;
  date?: string | undefined;
  // dateBefore?: string | undefined;
  // dateAfter?: string | undefined;
  description?: string | undefined;
}

const statuses = ['All', 'Successful', 'Failed', 'Refunded'];
export default function TransactionFilter() {
  const { date, description, state, setFilters } = useTransactionFilters();

  const handleStateChange = (newState: TransactionFilters['state']) => {
    setFilters({ state: newState });
  };

  const handleDateChange = (newState: string) => {
    const timestamp = new Date(newState).getTime();
    setFilters({ date: String(timestamp) });
  };

  const handleDescriptionChange = (newState: TransactionFilters['description']) => {
    setFilters({ description: newState });
  };

  const handleSubmit = useCallback(() => {
    console.log('date', date);
    console.log('state', state);
  }, [date, state]);

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {statuses.map((status) => (
          <Button color={status === state ? 'indigo' : 'light'} key={status} onClick={() => handleStateChange(status)}>
            {status}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '10px' }}>
        <Field>
          <Input
            style={{ width: '300px' }}
            placeholder="Search by AccountID or Description"
            value={description ?? ''}
            name="full_name"
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </Field>
        <Dropdown>
          <DropdownButton plain aria-label="More options">
            All statuses
          </DropdownButton>
          <DropdownMenu>
            {statuses.map((status) => (
              <DropdownItem key={status} onClick={() => handleStateChange(status)}>
                {status}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Field style={{ minWidth: '170px' }}>
          {/* <Label>before date</Label> */}
          <Input
            type="datetime-local"
            name="url"
            value={new Date(Number(date)).toISOString().slice(0, 16)}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </Field>

        <Button color="teal" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </>
  );
}
