
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App">
      app
     <Routes>
          <Route path='/products/:page' element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
