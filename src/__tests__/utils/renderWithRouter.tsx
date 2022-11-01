import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

interface RenderWithRouterProps {
  route?: string;
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/" }: RenderWithRouterProps = {}
) => {
  const history = createMemoryHistory();
  history.push(route);
  return {
    user: userEvent.setup(),
    ...render(
      <Router location={history.location} navigator={history}>
        {ui}
      </Router>
    ),
    history,
  };
};

export default renderWithRouter;
