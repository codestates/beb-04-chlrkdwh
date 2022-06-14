import logo from './logo.svg';
import './App.css';
import PrimarySearchAppBar from './Components/UpNavBar';
import Theme from './Pages/Test'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

function App() {
  const theme = createTheme({
    zIndex: {
      drawer: 1000
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PrimarySearchAppBar />

        <footer>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
