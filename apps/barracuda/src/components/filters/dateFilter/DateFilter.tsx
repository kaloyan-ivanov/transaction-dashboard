import React, { memo, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { DateTime } from 'luxon';
import DateField from './DateField';
import DateDialog from './DateDialog';

function DateFilter() {
  const [beforeDateFilter, setBeforeDateFilter] = useState('');

  const handleBeforeDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBeforeDateFilter(String(DateTime.fromISO(e.target.value).toMillis()));
  }, []);

  const [afterDateFilter, setAfterDateFilter] = useState('');

  const handleAfterDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAfterDateFilter(String(DateTime.fromISO(e.target.value).toMillis()));
  }, []);

  const [isEqualDateFilter, setIsEqualDateFilter] = useState('');

  const handleIsEqualDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEqualDateFilter(String(DateTime.fromISO(e.target.value).toMillis()));
  }, []);

  const [isInTheLast, setIsInTheLast] = useState('');

  const handleIsInTheLastChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInTheLast(e.target.value);
  }, []);

  const [timeRangeFilter, setTimeRangeFilter] = useState('');

  const onTimeRangeFilterOptionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRangeFilter(e.target.value);
  }, []);

  const [dateFilter, setDateFilter] = useState('');

  const onDateFilterOptionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value);
  }, []);

  const [isOpenDateDialog, setIsOpenDateDialog] = useState(false);

  const onOpenDateDialog = useCallback(() => {
    setIsOpenDateDialog(true);
    if (isEmpty(dateFilter)) {
      setDateFilter('Is equal to');
      setTimeRangeFilter('hours');
    }
  }, [dateFilter]);

  const onCloseDateDialog = useCallback(() => {
    setDateFilter('');
    setTimeRangeFilter('');
    setIsInTheLast('');
    setIsOpenDateDialog(false);
  }, []);

  const shouldShowBeforeOrOnCalendar = useMemo(() => {
    return dateFilter === 'Is between' || dateFilter === 'Is before or on';
  }, [dateFilter]);

  const shouldShowAfterOrOnCalendar = useMemo(() => {
    return dateFilter === 'Is between' || dateFilter === 'Is on or after';
  }, [dateFilter]);

  return (
    <>
      <DateField
        dateFilter={dateFilter}
        shouldShowAfterOrOnCalendar={shouldShowAfterOrOnCalendar}
        shouldShowBeforeOrOnCalendar={shouldShowBeforeOrOnCalendar}
        beforeDateFilter={beforeDateFilter}
        afterDateFilter={afterDateFilter}
        onOpenDateDialog={onOpenDateDialog}
      />
      <DateDialog
        dateFilter={dateFilter}
        isOpenDateDialog={isOpenDateDialog}
        timeRangeFilter={timeRangeFilter}
        beforeDateFilter={beforeDateFilter}
        afterDateFilter={afterDateFilter}
        isEqualDateFilter={isEqualDateFilter}
        isInTheLast={Number(isInTheLast)}
        shouldShowBeforeOrOnCalendar={shouldShowBeforeOrOnCalendar}
        shouldShowAfterOrOnCalendar={shouldShowAfterOrOnCalendar}
        onCloseDateDialog={onCloseDateDialog}
        onDateFilterOptionChange={onDateFilterOptionChange}
        onTimeRangeFilterOptionChange={onTimeRangeFilterOptionChange}
        handleBeforeDateChange={handleBeforeDateChange}
        handleAfterDateChange={handleAfterDateChange}
        handleIsEqualDateChange={handleIsEqualDateChange}
        handleIsInTheLastChange={handleIsInTheLastChange}
        setIsOpenDateDialog={setIsOpenDateDialog}
      />
    </>
  );
}
export default memo(DateFilter);
