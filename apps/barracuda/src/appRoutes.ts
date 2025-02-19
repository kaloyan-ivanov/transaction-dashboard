import { HomePage, TransactionsPage } from './pages';

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
    path: '/allAccounts',
    component: HomePage
  }
];
