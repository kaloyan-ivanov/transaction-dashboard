import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogTitle, Input, Select } from 'verticals-ui';

const dateAndTimeFilteringOptions = [
  'Is equal to',
  'Is in the last',
  'Is between',
  'Is on or after',
  'Is before or on'
];
const timeRangeFilteringOptions = ['hours', 'days', 'months'];

export interface DateDialogProps {
  dateFilter: string | undefined;
  isOpenDateDialog: boolean;
  timeRangeFilter: string | undefined;
  beforeDateFilter: string | undefined;
  afterDateFilter: string | undefined;
  isEqualDateFilter: string | undefined;
  isInTheLast: number | undefined;
  shouldShowBeforeOrOnCalendar: boolean;
  shouldShowAfterOrOnCalendar: boolean;
  onCloseDateDialog: () => void;
  onDateFilterOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTimeRangeFilterOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBeforeDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAfterDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIsEqualDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpenDateDialog: (bool: boolean) => void;
  handleIsInTheLastChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateDialog(props: DateDialogProps): JSX.Element {
  const {
    dateFilter,
    isOpenDateDialog,
    timeRangeFilter,
    beforeDateFilter,
    afterDateFilter,
    isInTheLast,
    isEqualDateFilter,
    shouldShowBeforeOrOnCalendar,
    shouldShowAfterOrOnCalendar,
    onCloseDateDialog,
    onDateFilterOptionChange,
    onTimeRangeFilterOptionChange,
    handleBeforeDateChange,
    handleAfterDateChange,
    handleIsEqualDateChange,
    handleIsInTheLastChange,
    setIsOpenDateDialog
  } = props;

  const { t } = useTranslation();

  /********************************************
           Date Dialog Inputs Visible
   ********************************************/
  const shouldShowTimeRangeFilterOptions = useMemo(() => {
    return (
      dateFilter !== 'Is between' &&
      dateFilter !== 'Is equal to' &&
      dateFilter !== 'Is before or on' &&
      dateFilter !== 'Is on or after'
    );
  }, [dateFilter]);

  const shouldShowHourInput = useMemo(() => {
    return dateFilter === 'Is in the last';
  }, [dateFilter]);

  const shouldShowEqualDateField = useMemo(() => {
    return dateFilter === 'Is equal to';
  }, [dateFilter]);

  const renderDateFilterOptions = useMemo(
    () =>
      dateAndTimeFilteringOptions.map((filter, index) => (
        <option key={index} value={filter}>
          {filter}
        </option>
      )),
    []
  );

  const renderTimeRangeOptions = useMemo(
    () =>
      timeRangeFilteringOptions.map((filter, index) => (
        <option key={index} value={filter}>
          {filter}
        </option>
      )),
    []
  );
  return (
    <>
      <Dialog open={isOpenDateDialog} onClose={onCloseDateDialog}>
        <DialogTitle>{'Filter by date and time'}</DialogTitle>
        <Select name="status" onChange={onDateFilterOptionChange} value={dateFilter}>
          {renderDateFilterOptions}
        </Select>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
          {shouldShowHourInput && (
            <Input
              name="timeRange"
              type="number"
              value={isInTheLast ? isInTheLast : ''}
              onChange={handleIsInTheLastChange}
            />
          )}
          {shouldShowTimeRangeFilterOptions && (
            <Select name="date" onChange={onTimeRangeFilterOptionChange} value={timeRangeFilter}>
              {renderTimeRangeOptions}
            </Select>
          )}
          {shouldShowBeforeOrOnCalendar && (
            <Input
              type="datetime-local"
              name="beforeOrOn"
              value={beforeDateFilter ? new Date(Number(beforeDateFilter)).toISOString().slice(0, 16) : 'before'}
              onChange={handleBeforeDateChange}
            />
          )}
          {shouldShowAfterOrOnCalendar && (
            <Input
              type="datetime-local"
              name="afterOrOn"
              value={afterDateFilter ? new Date(Number(afterDateFilter)).toISOString().slice(0, 16) : ''}
              onChange={handleAfterDateChange}
            />
          )}
          {shouldShowEqualDateField && (
            <Input
              type="datetime-local"
              name="isEqual"
              value={isEqualDateFilter ? new Date(Number(isEqualDateFilter)).toISOString().slice(0, 16) : ''}
              onChange={handleIsEqualDateChange}
            />
          )}
        </div>
        <DialogActions>
          <Button plain onClick={onCloseDateDialog}>
            {t(`buttons.cancel`)}
          </Button>
          <Button onClick={() => setIsOpenDateDialog(false)}>{t(`buttons.applyFilter`)}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(DateDialog);
