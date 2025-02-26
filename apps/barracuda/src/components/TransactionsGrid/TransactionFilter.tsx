import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTransactionFilters } from '../../hooks/useTransactionFilters';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
  Field,
  Input,
  Label,
  Navbar,
  NavbarItem,
  NavbarSection,
  Select
} from 'verticals-ui';
import { DateTime } from 'luxon';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import './transactionFilter.scss';

const statuses = ['all', 'successful', 'failed', 'refunded', 'disputed', 'uncaptured'];
const amountFilteringOptions = ['isEqualTo', 'isBetween', 'isGreaterThan', 'isLessThan'];

type TransactionFilters = {
  amountLessThan?: string;
  amountGreaterThan?: string;
  state?: string;
  date?: string;
  account?: string;
};

function TransactionFilter() {
  const {
    date,
    account,
    amountLessThan,
    amountGreaterThan,
    amountEqualTo,
    state,
    setFilters,
    clearAmountFilter,
    clearAllFilters
  } = useTransactionFilters();

  const { t } = useTranslation();

  const [isOpenAmountDialog, setIsOpenAmountDialog] = useState(false);
  const [amountFilter, setAmountFilter] = useState<string>('');

  //this logic here is to initially populate the filters after bootstrapping the app
  useEffect(() => {
    if (!state) {
      setFilters({ state: 'all' });
    }

    const filterMapping = {
      isEqualTo: amountEqualTo,
      isBetween: amountLessThan && amountGreaterThan,
      isLessThan: amountLessThan,
      isGreaterThan: amountGreaterThan
    };

    for (const [filterType, condition] of Object.entries(filterMapping)) {
      if (condition) {
        setAmountFilter(filterType);
        break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
  useEffect(() => {
    if (date || account || amountLessThan || amountGreaterThan || amountEqualTo || state !== 'all') {
      setIsClearButtonVisible(true);
    } else {
      setIsClearButtonVisible(false);
    }
  }, [account, amountEqualTo, amountGreaterThan, amountLessThan, date, state]);

  const handleClearAllFilters = useCallback(() => {
    clearAllFilters();
    setAmountFilter('');
    setFilters({ state: 'all' });
    setIsClearButtonVisible(false);
  }, [clearAllFilters, setFilters]);

  const handleApplyButton = useCallback(() => {
    setIsOpenAmountDialog(false);
  }, []);

  const shouldShowLessThanInput = useMemo(() => {
    return amountFilter === 'isLessThan' || amountFilter === 'isBetween';
  }, [amountFilter]);

  const shouldShowGreaterThanInput = useMemo(() => {
    return amountFilter === 'isGreaterThan' || amountFilter === 'isBetween';
  }, [amountFilter]);

  const shouldShowEqualToInput = useMemo(() => {
    return amountFilter === 'isEqualTo';
  }, [amountFilter]);

  const renderStatusButtons = useMemo(
    () =>
      statuses.map((filter) => (
        <NavbarItem
          key={filter}
          style={{ cursor: 'pointer' }}
          onClick={() => handleStateChange(filter)}
          current={state === filter}
        >
          <span
            style={{
              color: state === filter ? '#EA580CE6' : 'gray',
              fontWeight: state === filter ? 'bold' : 'normal'
            }}
          >
            {t(`TransactionFilter.statuses.${filter}`)}
          </span>
          <Badge color={state === filter ? 'orange' : 'zinc'}>{10000}</Badge>
        </NavbarItem>
      )),
    [state, t, handleStateChange]
  );
  const renderAmountFilterOptions = useMemo(
    () =>
      amountFilteringOptions.map((filter, index) => (
        <option key={index} value={filter}>
          {t(`TransactionFilter.amountFilteringOptions.${filter}`)}
        </option>
      )),
    [t]
  );

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <Navbar>
          <NavbarSection className="max-lg:hidden">{renderStatusButtons}</NavbarSection>
        </Navbar>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          paddingRight: '16px',
          paddingBottom: '16px',
          paddingLeft: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderRadius: '12px',
          marginBottom: '14px'
        }}
      >
        <Field>
          <Label>{t(`TransactionsGrid.account`)}</Label>
          <Input
            style={{ width: '200px' }}
            placeholder="..."
            value={account ?? ''}
            name="full_name"
            onChange={handleAccountChange}
          />
        </Field>
        <Field style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Label>
            {t(`TransactionsGrid.amount`)}{' '}
            {amountFilter ? `(${t(`TransactionFilter.amountFilteringOptions.${amountFilter}`)})` : ''}
          </Label>
          <div style={{ alignSelf: 'flex-end' }}>
            {amountFilter === '' && (
              <Input
                style={{ width: '200px' }}
                placeholder={t(`TransactionFilter.placeholders.selectFilter`)}
                onClick={handleOpenAmountDialog}
                readOnly
              />
            )}
            {amountFilter === 'isEqualTo' && (
              <Input
                style={{ width: '200px' }}
                defaultValue={amountEqualTo ?? ''}
                value={amountEqualTo ?? ''}
                placeholder="Equal to..."
                onClick={handleOpenAmountDialog}
                readOnly
              />
            )}
            {amountFilter === 'isGreaterThan' && (
              <Input
                style={{ width: '200px' }}
                defaultValue={amountGreaterThan ?? ''}
                value={amountGreaterThan ?? ''}
                placeholder="Greater than..."
                onClick={handleOpenAmountDialog}
                readOnly
              />
            )}
            {amountFilter === 'isLessThan' && (
              <Input
                style={{ width: '200px' }}
                defaultValue={amountLessThan ?? ''}
                value={amountLessThan ?? ''}
                placeholder="Less than..."
                onClick={handleOpenAmountDialog}
                readOnly
              />
            )}
            {amountFilter === 'isBetween' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                  style={{ width: '95px' }}
                  value={amountGreaterThan ?? ''}
                  placeholder="Greater than..."
                  onClick={handleOpenAmountDialog}
                  readOnly
                />

                <Input
                  style={{ width: '95px' }}
                  value={amountLessThan ?? ''}
                  placeholder="Less than..."
                  onClick={handleOpenAmountDialog}
                  readOnly
                />
              </div>
            )}
          </div>
        </Field>
        <Dialog open={isOpenAmountDialog} onClose={handleCloseAmountDialog} style={{ maxWidth: '400px' }}>
          <DialogTitle>{t(`TransactionsGrid.amount`)}</DialogTitle>
          <DialogBody>
            <Field>
              <Select
                name="status"
                onChange={onAmountFilterOptionChange}
                value={amountFilter !== '' ? amountFilter : ''}
              >
                {renderAmountFilterOptions}
              </Select>
            </Field>
            {shouldShowGreaterThanInput && (
              <Field style={{ paddingTop: '10px' }}>
                <Input
                  name="greaterThan"
                  type="number"
                  placeholder={t(`TransactionFilter.placeholders.isGreaterThan`)}
                  value={amountGreaterThan ?? ''}
                  onChange={handleAmountMoreThanChange}
                />
              </Field>
            )}
            {shouldShowLessThanInput && (
              <Field style={{ paddingTop: '10px' }}>
                <Input
                  name="lessThan"
                  type="number"
                  placeholder={t(`TransactionFilter.placeholders.isLessThan`)}
                  value={amountLessThan ?? ''}
                  onChange={handleAmountLessThanChange}
                />
              </Field>
            )}
            {shouldShowEqualToInput && (
              <Field style={{ paddingTop: '10px' }}>
                <Input
                  name="equalTo"
                  type="number"
                  placeholder={t(`TransactionFilter.placeholders.equalTo`)}
                  value={amountEqualTo ?? ''}
                  onChange={handleAmountEqualToChange}
                />
              </Field>
            )}
          </DialogBody>
          <DialogActions>
            <Button onClick={handleCloseAmountDialog}>{t(`buttons.cancel`)}</Button>
            <Button onClick={handleApplyButton}>{t(`buttons.applyFilter`)}</Button>
          </DialogActions>
        </Dialog>
        <Field style={{ minWidth: '170px' }}>
          <Label>Date</Label>
          <Input
            type="datetime-local"
            name="url"
            value={date ? new Date(Number(date)).toISOString().slice(0, 16) : ''}
            onChange={handleDateChange}
          />
        </Field>
        <Field style={{ alignContent: 'end' }}>
          <Button
            plain
            className={`fade ${isClearButtonVisible ? 'fade-in' : 'fade-out'}`}
            onClick={handleClearAllFilters}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease-in-out',
              opacity: isClearButtonVisible ? 1 : 0,
              pointerEvents: isClearButtonVisible ? 'auto' : 'none'
            }}
          >
            {t('TransactionFilter.clearAll')}
          </Button>
        </Field>
      </div>
    </>
  );
}

export default memo(TransactionFilter);
