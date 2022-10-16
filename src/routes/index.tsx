import { useRoutes } from 'react-router-dom';
import Header from '../components/test';
import Login from '../pages/login';
import Register from '../pages/register';

function Routes() {
  const routes = useRoutes([
    {
      path: '/sign_in',
      element: <Login />,
    },
    {
      path: '/sign_up',
      element: <Register />,
    },
    {
      path: '/questions',
      element: <Header />,
    },
  ]);

  return routes;
}

export default Routes;
