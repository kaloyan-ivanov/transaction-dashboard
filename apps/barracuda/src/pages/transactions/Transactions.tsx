import React from 'react';
import TransactionsGrid from '../../components/TransactionsGrid/TransactionsGrid';
import { TransactionData } from '../../components/TransactionsGrid/TransactionsData';

function Transactions(): JSX.Element {
  return (
    <div className={'content-block'}>
      <TransactionsGrid
        dataSource={[
          ...TransactionData.results,
          ...Array.from({ length: 525 }, (_, index) => ({
            ...TransactionData.results[index % TransactionData.results.length],
            id: `${TransactionData.results[index % TransactionData.results.length].id}-test-${index + 1}`
          }))
        ]}
      />
    </div>
  );
}

export default Transactions;
