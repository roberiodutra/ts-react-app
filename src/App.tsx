import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import Routes from "./routes/";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
