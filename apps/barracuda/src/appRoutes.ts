import { HomePage, TransactionDetailsPage, TransactionsPage } from './pages';

export const paths = [
  '/transactions',
  '/operations',
  '/refunds',
  '/disputes',
  '/allAccounts',
  '/stores',
  '/terminals',
  '/complience'
];

type Route = {
  path: string;
  component: () => JSX.Element;
};

export const routes: Route[] = [
  {
    path: '/transactions',
    component: TransactionsPage
  },
  {
    path: '/transactions/:transactionID',
    component: TransactionDetailsPage
  },
  {
    path: '/allAccounts',
    component: HomePage
  }
];
