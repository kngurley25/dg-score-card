import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import ViewCourses from './pages/ViewCourses';
import Home from './Pages/Home';
import './App.css';
import ScorePage from './components/ScorePage';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Home></Home>
        <ScorePage></ScorePage>
      </main>
    </div>
  );
}

export default App;
