import React, { useCallback, useMemo, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from './../../../../../libraries/verticals-ui/src/ui-components/catalyst/typescript/table';
import { TransactionData } from '../transactions/TransactionsData';
import {
  Pagination,
  PaginationList
} from '../../../../../libraries/verticals-ui/src/ui-components/catalyst/typescript/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faEye, faFlag, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const stateStyles = {
  Cleared: { backgroundColor: '#e0f7e0', color: '#2e7d32' },
  PayedOut: { backgroundColor: '#e0f0ff', color: '#1565c0' },
  Settled: { backgroundColor: '#f3e5f5', color: '#6a1b9a' },
  Authorized: { backgroundColor: '#fff3e0', color: '#e65100' },
  InProgress: { backgroundColor: '#eeeeee', color: '#424242' },
  Failed: { backgroundColor: '#ffebee', color: '#c62828' },
  default: { backgroundColor: '#f5f5f5', color: '#212121' }
};

const commonStyles = {
  borderRadius: '50px',
  textAlign: 'center' as const,
  fontWeight: '500',
  display: 'inline-block',
  padding: '4px 8px'
};

const itemsPerPage = 10;

function TransactionsGrid(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const pagesCount = useMemo(() => {
    return Math.ceil(TransactionData.results.length / 10);
  }, []);

  const handleDecreasePage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleIncrementPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > pagesCount) return;
      setCurrentPage(page);
    },
    [pagesCount]
  );

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return TransactionData.results.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <React.Fragment>
      <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>AccountID</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Descrioption</TableHeader>
            <TableHeader>CustomerID</TableHeader>
            <TableHeader>Payment Method</TableHeader>
            <TableHeader>Chanel</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2
                }).format(transaction.amounts.amount)}
              </TableCell>
              <TableCell>
                <span
                  style={{
                    ...stateStyles[transaction.state],
                    ...commonStyles
                  }}
                >
                  {transaction.state}
                </span>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.customer.id}</TableCell>
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
                  ****123 {transaction.paymentMethod.card.address.country}
                </div>
              </TableCell>
              <TableCell>{transaction.paymentMethod.card.channel}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hourCycle: 'h23'
                }).format(new Date(transaction.timestamps.initiated))}
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <FontAwesomeIcon
                    icon={faEye}
                    title="text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => alert('not implemented')}
                  />
                  <FontAwesomeIcon
                    icon={faFlag}
                    title="text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => alert('not implemented')}
                  />
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    title="text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => alert('not implemented')}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <button onClick={handleDecreasePage} disabled={currentPage === 1} className="pagination-previous">
          Previous
        </button>
        <PaginationList>
          {Array.from({ length: pagesCount }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`pagination-page ${pageNumber === currentPage ? 'current' : ''}`}
              >
                {pageNumber}
              </button>
            );
          })}
        </PaginationList>
        <button onClick={handleIncrementPage} disabled={currentPage === pagesCount} className="pagination-next">
          Next
        </button>
      </Pagination>
    </React.Fragment>
  );
}

export default TransactionsGrid;
