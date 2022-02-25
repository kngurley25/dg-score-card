import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import ViewCourses from './pages/ViewCourses';

import Home from "./Pages/Home";
import "./App.css";

import ScorePage from "./Pages/Score";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ViewCourses from "./Pages/ViewCourses";
import background from "./assets/images/dg-basket.png";
import CourseForm from "./components/CreateCourse";
import AddHole from "./components/AddHole";

import './App.css';

import ScorePage from './Pages/Score';
import NewRound from './Pages/NewRound';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewCourses from './Pages/ViewCourses';
import background from './assets/images/dg-basket.png'
import CourseForm from './components/CreateCourse';
import Profile from './Pages/Profile';


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
          <main
            style={{
              backgroundImage: `url(${background})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "600px",
            }}
          >
            <Routes>
              <Route exact path="/" element={<Home />} />



              <Route exact path="/profile" element={<Profile />} />


              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />


              <Route exact path="/newround/:courseId" element={<NewRound />} />
              <Route exact path="/score/:roundId" element={<ScorePage />} />


              <Route exact path="/viewcourses" element={<ViewCourses />} />
              <Route exact path="/courseform" element={<CourseForm />} />
              <Route exact path="/addhole" element={<AddHole />} />
              <Route exact path="/scorepage" element={<ScorePage />} />
            </Routes>
          </main>
          <Footer></Footer>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
