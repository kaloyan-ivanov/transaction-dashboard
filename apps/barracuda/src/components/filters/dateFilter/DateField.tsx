import React, { memo } from 'react';
import { Field, Input, Label } from 'verticals-ui';

export interface DateFieldProps {
  dateFilter: string | undefined;
  shouldShowAfterOrOnCalendar: boolean;
  shouldShowBeforeOrOnCalendar: boolean;
  beforeDateFilter: string | undefined;
  afterDateFilter: string | undefined;
  onOpenDateDialog: () => void;
}

function DateField(props: DateFieldProps) {
  const {
    dateFilter,
    shouldShowAfterOrOnCalendar,
    shouldShowBeforeOrOnCalendar,
    beforeDateFilter,
    afterDateFilter,
    onOpenDateDialog
  } = props;
  return (
    <>
      <Field style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Label>
          {'Date'} {dateFilter ? `(${dateFilter})` : ''}
          {/* {dateFilter ? `(${t(`TransactionFilter.amountFilteringOptions.${dateFilter}`)})` : ''} */}
        </Label>
        <div style={{ alignSelf: 'flex-end' }}>
          <Input
            style={{ cursor: 'pointer' }}
            name="url"
            // value={date ? new Date(Number(date)).toISOString().slice(0, 16) : ''}
            value={dateFilter}
            onClick={onOpenDateDialog}
          />
          {shouldShowAfterOrOnCalendar && shouldShowBeforeOrOnCalendar && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                style={{ width: '100px' }}
                value={beforeDateFilter ? new Date(Number(beforeDateFilter)).toISOString().slice(0, 16) : 'before'}
                placeholder="..."
                onClick={onOpenDateDialog}
                readOnly
              />

              <Input
                style={{ width: '100px' }}
                value={afterDateFilter ? new Date(Number(afterDateFilter)).toISOString().slice(0, 16) : ''}
                placeholder="Less than..."
                onClick={onOpenDateDialog}
                readOnly
              />
            </div>
          )}
        </div>
      </Field>
    </>
  );
}
export default memo(DateField);
