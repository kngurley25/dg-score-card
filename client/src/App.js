import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
//import ViewCourses from './pages/ViewCourses';
import Home from './Pages/Home';
import './App.css';

import ScorePage from './Pages/Score';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewCourses from './Pages/ViewCourses';


function App() {
  return (
    <div>
      <Router>
      <Header></Header>
      <main>
      
          <Routes>

              <Route exact path="/login" element={<Login/>} />
              
              <Route exact path="/signup" element={<Signup/>}/>
              
              <Route exact path="/viewcourses" element={<ViewCourses/>} />
            </Routes>
          <Home>
        </Home>

        <ScorePage></ScorePage>

      </main>
      <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
