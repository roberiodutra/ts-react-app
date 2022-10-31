import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

interface RenderWithRouterProps {
  route?: string;
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/" }: RenderWithRouterProps = {}
) => {
  window.history.pushState({}, "Test page", route);
  return {
    user: userEvent.setup(),
    ...render(ui),
    path: window.location.pathname,
  };
};

export default renderWithRouter;
