import { useRoutes } from "react-router-dom";
import Admin from "../pages/admin";
import Login from "../pages/login";
import Member from "../pages/member";
import Register from "../pages/register";

function Routes() {
  const routes = useRoutes([
    {
      path: "/sign_in",
      element: <Login />,
    },
    {
      path: "/sign_up",
      element: <Register />,
    },
    {
      path: "/member",
      element: <Member />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/question/:id",
      element: <Admin />,
    },
  ]);

  return routes;
}

export default Routes;
