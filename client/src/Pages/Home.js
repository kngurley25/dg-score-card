import React from 'react';
import Login from './Login.js';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Signup from './Signup.js';
import Footer from '../components/Footer/index.js';

const Home = () => {
   // const loggedIn = Auth.loggedIn();
    return (
        <main>
            <div class="d-flex justify-content-center">
            <h1> No Bogeys! 🥏</h1>
            </div>
            <div class= "d-flex justify-content-center">
            <p> Login or Sign up to use our DiscGolf ScoreKeeper App</p>
            </div>
            <div>
            <Login></Login>
            </div>
            <div>
            <Signup></Signup>
            </div>
            <Footer></Footer>
        </main>
    )
}

export default Home;