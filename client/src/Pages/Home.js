import React from 'react';
import Login from './Login.js';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Signup from './Signup.js';

const Home = () => {
   // const loggedIn = Auth.loggedIn();
    return (
        <main>
            <div class="d-flex justify-content-center">
            <h1> No Bogeys!</h1>
            </div>
            <div class= "d-flex justify-content-center">
            <p> Login or Sign up to use our disc gold score keeping App</p>
            </div>
            <Login></Login>
            <Signup></Signup>
            <div class="d-flex justify-content-center">
            <a href> View Courses and Scores</a>
            </div>
            <div class="d-flex justify-content-center">
            <a href> Start New Round</a>
            </div>
        </main>
    )
}

export default Home;