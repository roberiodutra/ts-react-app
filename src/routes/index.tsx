import { useRoutes } from 'react-router-dom';
import Header from '../components/test';

function Routes() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <h1>Login</h1>,
    },
    {
      path: '/questions',
      element: <Header />,
    },
  ]);

  return routes;
}

export default Routes;
