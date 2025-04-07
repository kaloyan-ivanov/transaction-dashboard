import { t } from 'i18next';
import React, { memo } from 'react';
import { Field, Label, Input } from 'verticals-ui';

export interface AmountFieldProps {
  amountFilter: string | undefined;
  amountEqualTo: string | undefined;
  amountGreaterThan: string | undefined;
  amountLessThan: string | undefined;
  handleOpenAmountDialog: () => void;
}

function AmountField(props: AmountFieldProps): JSX.Element {
  const { amountFilter, amountLessThan, amountEqualTo, amountGreaterThan, handleOpenAmountDialog } = props;
  return (
    <>
      <Field style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Label>
          {t(`TransactionsGrid.amount`)}{' '}
          {amountFilter ? `(${t(`TransactionFilter.amountFilteringOptions.${amountFilter}`)})` : ''}
        </Label>
        <div style={{ alignSelf: 'flex-end' }}>
          {amountFilter === '' && (
            <Input
              style={{ width: '200px', cursor: 'pointer' }}
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
    </>
  );
}
export default memo(AmountField);
