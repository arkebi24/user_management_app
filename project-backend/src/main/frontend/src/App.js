import './App.css';
import * as React from 'react';
import ButtonAppBar from './components/layout/Navbar.tsx';
import BasicTable from './components/pages/home.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/users/AddUser.tsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
    console.log('hello')
  return (
    <div className="App">
      <Router>
        <ButtonAppBar />
        <Routes>
          <Route exact path='/' element={<BasicTable />} />
          <Route exact path='/adduser' element={<AddUser />} />
          <Route exact path='/edituser/:id' element={<AddUser />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
