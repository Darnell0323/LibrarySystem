import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import GestionUsuarios from "./GestionUsuarios";

function App() {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path="/gestionUsuarios" element={<GestionUsuarios />}/>

                </Routes>
            </Router>
        </Fragment>

    );
}

export default App;
