import logo from './logo.svg';
import './App.css';
import UpNavBar from './Components/UpNavBar';
import Home from './Pages/Home';
import Explore from './Pages/Explore';

function App() {
  return (
    <div className="App">
        <UpNavBar/>
        <Explore />
    <footer>
    </footer>
    </div>
  );
}

export default App;
