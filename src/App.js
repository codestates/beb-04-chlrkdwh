import logo from './logo.svg';
import PrimarySearchAppBar from './Components/UpNavBar';
import Theme from './Pages/Test'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ConnectWallet from './Components/ConnectWallet';

import styles from './App.module.css'
import MetaMaskLogin from './Components/MetaMaskLogin';

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
        <div className={styles.appBody}>
        <ConnectWallet metaMask={MetaMaskLogin}></ConnectWallet>
        

        </div>
        <footer className={styles.appFooter}>
        </footer>
      </div>
    </ThemeProvider>

  );
}

export default App;
