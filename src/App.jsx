import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FirstPage from './components/FirstPage';
import SignIn from './components/SignIn';

  function App() {
    return (
      <div style={{width: "100vw", height:"100vh"}}>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} /> 
            <Route path="/counter" element={<FirstPage />} /> 
          </Routes>
        </Router>
      </div> 
    )
  }

  export default App