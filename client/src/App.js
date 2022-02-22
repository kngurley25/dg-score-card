import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <Header></Header>
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/login" element={<Login />} />

              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/viewcourses" element={<ViewCourses />} />
            </Routes>

            <ScorePage></ScorePage>
            
          </main>
          <Footer></Footer>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
