import { useRoutes } from 'react-router-dom';

function Routes() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <h1>Login</h1>,
    },
  ]);

  return routes;
}

export default Routes;
