import { screen, cleanup, render } from "@testing-library/react";
import App from "../../../App";

describe("Login page tests", () => {
  beforeEach(() => render(<App />));

  afterEach(cleanup);
});
