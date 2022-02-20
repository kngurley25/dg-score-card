import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import ViewCourses from './pages/ViewCourses';
import Home from './Pages/Home';
import './App.css';
import ScorePage from './components/ScorePage';

function App() {
  return (
    <Home></Home>,
    <ScorePage></ScorePage>
  );
}

export default App;
