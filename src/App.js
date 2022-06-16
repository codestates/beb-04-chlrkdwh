import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

//Pages&Components load
import PrimarySearchAppBar from './Components/UpNavBar';
import styles from './App.module.css'
import Home from './Pages/Home'
import Explore from './Pages/Explore';
import Stats from './Pages/Stats'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Create from './Pages/Create';

//React & react modules
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import TestingPage from './Pages/TestingPage';

function App() {

  const theme = createTheme({
    zIndex: {
      drawer: 1000
    }
  })

  const [isLogined, setIsLogined] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <div className="App">
            <PrimarySearchAppBar isLogined={isLogined} setIsLogined={setIsLogined} />
            <div className={styles.appBody}>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path='/stats' element={<Stats />} />
              <Route path='/profile' element={<Profile isLogined={isLogined} />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/create' element={<Create isLogined={isLogined} />}/>
              <Route path='/test' element={<TestingPage isLogined={isLogined}/>}/>
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
