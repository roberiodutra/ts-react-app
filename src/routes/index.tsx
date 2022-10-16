import { useRoutes } from 'react-router-dom';
import Header from '../components/test';
import Login from '../pages/login';

function Routes() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/questions',
      element: <Header />,
    },
  ]);

  return routes;
}

export default Routes;
