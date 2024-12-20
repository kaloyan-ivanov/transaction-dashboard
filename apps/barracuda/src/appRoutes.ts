import { HomePage } from './pages';

type Route = {
  path: string;
  component: () => JSX.Element;
};

export const routes: Route[] = [
  {
    path: '/home',
    component: HomePage
  }
];
