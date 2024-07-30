import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Components/Users';
import Login from './Components/Login';
import Findform from './Components/Findform';

function App() {
  return (
  <BrowserRouter>
  
  <Routes>
          <Route exact path='/' element={<Users />} />

          <Route exact path='/login' element={<Login />} />

          <Route exact path='/form/:id' element={<Findform />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
