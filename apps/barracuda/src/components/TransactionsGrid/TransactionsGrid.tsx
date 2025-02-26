import React, { useCallback, useMemo, useState, useEffect, memo } from 'react';
import {
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationGap,
  Select,
  Field
} from 'verticals-ui';
import { Transaction } from './TransactionsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import TransactionFilter from './TransactionFilter';
import { useNavigate } from 'react-router-dom';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { useTranslation } from 'react-i18next';
import { formatAmount, getCountryCode } from '../../helpers/formatters';
import ReactCountryFlag from 'react-country-flag';
import './TransactionsGrid.scss';

const itemsPerPageOptions = [10, 20, 50, 100];

const tableHeaders = ['amount', 'status', 'description', 'paymentMethod', 'channel', 'date', 'actions'];
type BadgeColor = 'lime' | 'blue' | 'purple' | 'orange' | 'zinc' | 'red';

const stateStyles = new Map<string, BadgeColor>([
  ['Cleared', 'lime'],
  ['PayedOut', 'blue'],
  ['Settled', 'purple'],
  ['Authorized', 'orange'],
  ['InProgress', 'zinc'],
  ['Failed', 'red'],
  ['Default', 'zinc']
]);

export interface TransactionsDataGridProps {
  readonly dataSource: Transaction[];
}

function TransactionsGrid(props: TransactionsDataGridProps): JSX.Element {
  const { dataSource } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataSource.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, dataSource]);

  const pagesCount = useMemo(() => {
    return Math.ceil(dataSource.length / itemsPerPage);
  }, [dataSource.length, itemsPerPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  }, [pagesCount, currentPage]);

  const handleItemsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  }, []);

  const renderTableHead = useMemo(
    () => (
      <TableHead
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
          boxShadow: 'inset 0 -1px 0 #e5e7eb'
        }}
      >
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHeader key={header}>{t(`TransactionsGrid.${header}`)}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
    ),
    [t]
  );

  const renderTableBody = useMemo(
    () => (
      <TableBody className="overflow-auto">
        {currentData.map((transaction) => (
          <TableRow
            className="hover:bg-zinc-950/5 dark:hover:bg-white/5"
            key={transaction.id}
            onClick={() => handleNavigation(`${transaction.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <TableCell>{formatAmount(transaction)}</TableCell>
            <TableCell>
              <Badge color={stateStyles.get(transaction.state) ?? 'lime'}>
                {t(`TransactionsGrid.states.${transaction.state}`)}
              </Badge>
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon
                  icon={transaction.paymentMethod.card.scheme === 'VISA' ? faCcVisa : faCcMastercard}
                  style={{
                    fontSize: '24px',
                    color: transaction.paymentMethod.card.scheme === 'VISA' ? '#1a1f71' : '#ff5f00',
                    padding: '4px'
                  }}
                />
                ****123
                <ReactCountryFlag
                  countryCode={getCountryCode(transaction)}
                  svg
                  style={{
                    width: '24px',
                    height: '24px',
                    marginLeft: '8px'
                  }}
                  title={transaction.paymentMethod.card.address.country}
                />
              </div>
            </TableCell>
            <TableCell>{transaction.paymentMethod.card.channel}</TableCell>
            <TableCell>
              {new Intl.DateTimeFormat(t('dateTimeFormat'), {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23'
              }).format(new Date(transaction.timestamps.initiated))}
            </TableCell>
            <TableCell onClick={(event: { stopPropagation: () => void }) => event.stopPropagation()}>
              <EllipsisHorizontalIcon className="h-6 w-6" onClick={() => alert('clicked')} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    ),
    [currentData, handleNavigation, t]
  );

  const renderPagination = useMemo(
    () => (
      <Pagination>
        <PaginationPrevious onClick={currentPage > 1 ? () => handlePageChange(currentPage - 1) : undefined}>
          {t('Pagination.previous')}
        </PaginationPrevious>
        <PaginationList>
          {Array.from({ length: pagesCount }, (_, index) => {
            const page = index + 1;
            const isCurrent = page === currentPage;
            const isNearCurrent = Math.abs(page - currentPage) <= 2;
            const isFirstOrLast = page === 1 || page === pagesCount;
            const isGapBeforeCurrent = page === currentPage - 3;
            const isGapAfterCurrent = page === currentPage + 3;

            if (isCurrent || isNearCurrent || isFirstOrLast) {
              return (
                <PaginationPage key={page} onClick={() => handlePageChange(page)} current={isCurrent}>
                  {page}
                </PaginationPage>
              );
            } else if (isGapBeforeCurrent || isGapAfterCurrent) {
              return <PaginationGap key={`gap-${page}`} />;
            }
            return null;
          })}
        </PaginationList>
        <PaginationNext onClick={currentPage < pagesCount ? () => handlePageChange(currentPage + 1) : undefined}>
          {t('Pagination.next')}
        </PaginationNext>
      </Pagination>
    ),
    [currentPage, handlePageChange, pagesCount, t]
  );

  const renderItemsPerPageOptions = useMemo(
    () => (
      <div>
        <Field>
          <Select onChange={handleItemsPerPageChange}>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {`${option} ${t('Pagination.perPage')}`}
              </option>
            ))}
          </Select>
        </Field>
      </div>
    ),
    [handleItemsPerPageChange, t]
  );

  return (
    <React.Fragment>
      <TransactionFilter />
      <Table
        dense
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)] overflow-auto"
        style={{ maxHeight: 'calc(100vh - 240px)' }}
      >
        {renderTableHead}
        {renderTableBody}
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        {renderItemsPerPageOptions}
        {renderPagination}
      </div>
    </React.Fragment>
  );
}

export default memo(TransactionsGrid);
