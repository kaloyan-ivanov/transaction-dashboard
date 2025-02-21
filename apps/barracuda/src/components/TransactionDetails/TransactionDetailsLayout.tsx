import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionData } from '../TransactionsGrid/TransactionsData';
import { Badge, DescriptionDetails, DescriptionList, DescriptionTerm, Subheading } from 'verticals-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { formatAmount, getCountryCode } from '../../helpers/formatters';
import ReactCountryFlag from 'react-country-flag';

type BadgeColor = 'lime' | 'blue' | 'purple' | 'orange' | 'zinc' | 'red';

const stateStyles = new Map<string, BadgeColor>([
  ['Cleared', 'lime'],
  ['PayedOut', 'blue'],
  ['Settled', 'purple'],
  ['Authorized', 'orange'],
  ['InProgress', 'zinc'],
  ['Failed', 'red'],
  ['default', 'zinc']
]);

function TransactionDetailsLayout(): JSX.Element {
  const { transactionID } = useParams();

  const { t } = useTranslation();

  const transaction = useMemo(() => {
    return TransactionData.results.find((t) => t.id === transactionID);
  }, [transactionID]);

  const countryCode = useMemo(() => {
    if (!transaction) return '';
    return getCountryCode(transaction);
  }, [transaction]);

  // If transaction not found, show an error message
  if (!transaction) {
    return <h2>Transaction not found</h2>;
  }

  return (
    <div>
      <Subheading>{t('TransactionsGrid.details')}</Subheading>
      <DescriptionList className="mt-4">
        <DescriptionTerm>{t('TransactionsGrid.transactionID')}</DescriptionTerm>
        <DescriptionDetails>{transaction.id}</DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.paymentMethod')}</DescriptionTerm>
        <DescriptionDetails>
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
              countryCode={countryCode}
              svg
              style={{
                width: '24px',
                height: '24px',
                marginLeft: '8px'
              }}
              title={transaction.paymentMethod.card.address.country}
            />
          </div>
        </DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.description')}</DescriptionTerm>
        <DescriptionDetails>{transaction.description}</DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.amount')}</DescriptionTerm>
        <DescriptionDetails>{formatAmount(transaction)}</DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.status')}</DescriptionTerm>
        <DescriptionDetails>
          <Badge color={stateStyles.get(transaction.state) ?? 'lime'}>
            {t(`TransactionsGrid.states.${transaction.state}`)}
          </Badge>
        </DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.channel')}</DescriptionTerm>
        <DescriptionDetails>{transaction.paymentMethod.card.channel}</DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.date')}</DescriptionTerm>
        <DescriptionDetails>
          {new Intl.DateTimeFormat(t('dateTimeFormat'), {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
          }).format(new Date(transaction.timestamps.initiated))}
        </DescriptionDetails>
      </DescriptionList>

      <Subheading>{t('TransactionsGrid.customer')}</Subheading>
      <DescriptionList>
        <DescriptionTerm>{t('TransactionsGrid.customerID')}</DescriptionTerm>
        <DescriptionDetails>{transaction.customer.id}</DescriptionDetails>
        <DescriptionTerm>{t('TransactionsGrid.name')}</DescriptionTerm>
        <DescriptionDetails>{transaction.customer.name}</DescriptionDetails>
        <DescriptionTerm>{'E-mail'}</DescriptionTerm>
        <DescriptionDetails>{transaction.customer.email}</DescriptionDetails>
      </DescriptionList>
    </div>
  );
}
export default memo(TransactionDetailsLayout);
