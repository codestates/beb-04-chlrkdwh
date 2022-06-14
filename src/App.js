import logo from './logo.svg';
import PrimarySearchAppBar from './Components/UpNavBar';
import Theme from './Pages/Test'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ConnectWallet from './Components/ConnectWallet';

import styles from './App.module.css'
import MetaMaskLogin from './Components/MetaMaskLogin';
import Home from './Pages/Home'
import Explore from './Pages/Explore';
import Stats from './Pages/Stats'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const theme = createTheme({
    zIndex: {
      drawer: 1000
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <div className="App">
            <PrimarySearchAppBar />
            <div className={styles.appBody}>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path='/stats' element={<Stats />} />
        </Routes>
            </div>
            <footer className={styles.appFooter}>
            </footer>
          </div>
      </BrowserRouter>
    </ThemeProvider >

  );
}

export default App;
