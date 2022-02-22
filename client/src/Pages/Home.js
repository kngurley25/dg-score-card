import React from 'react';
import Login from './Login.js';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Signup from './Signup.js';
import Footer from '../components/Footer/index.js';
import ViewCourses from './ViewCourses.js';

const Home = (props) => {

   
    return (
        
        <section>
            <div class="d-flex justify-content-center">
            <h1> No Bogeys! 🥏</h1>
            </div>
            <div class= "d-flex justify-content-center">
            <p> Login or Sign up to use our DiscGolf ScoreKeeper App</p>
            </div>
            <div class="d-flex justify-content-center">
            <Link to="/login">
            <button  className="btn btn-primary d-flex justify-content-center mb-3">Login</button>
            </Link>
            </div>
            <div class="d-flex justify-content-center">
            <Link to="/signup">
            <button type="button" className="btn btn-primary d-flex justify-content-center mb-3">Sign up</button>
            </Link>
            </div>
            <div class="d-flex justify-content-center mb-1">
            <Link to="/viewcourses">
            <button type="button" className="btn btn-primary d-flex justify-content-center mb-3">View our Courses</button>
            </Link>
            </div>
        </section>
    )
}

export default Home;