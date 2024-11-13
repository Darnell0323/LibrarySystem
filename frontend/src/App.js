import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";
import Register from "./paginas/Register";
import GestionUsuarios from "./components/GestionUsuarios";

function App() {
  return (
      <Fragment>
        <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/gestionUsuarios" element={<GestionUsuarios />}/>

          </Routes>
        </Router>
      </Fragment>

  );
}

export default App;
