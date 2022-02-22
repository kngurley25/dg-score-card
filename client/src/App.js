import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import ViewCourses from './pages/ViewCourses';
import Home from './Pages/Home';
import './App.css';
import ScorePage from './Pages/Score';

function App() {
  return (
    <div>
      <main>
        <Home></Home>
        <ScorePage></ScorePage>
      </main>
    </div>
  );
}

export default App;
