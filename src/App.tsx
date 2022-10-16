import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { UserProvider } from './context/providers/UserProvider';
import Routes from './routes/';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
