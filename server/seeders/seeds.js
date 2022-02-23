const db = require('../config/connection');
const { User, Course, Round } = require('../models');
const courseData = require('./course-seeds');
const { faker } = require('@faker-js/faker');

db.once('open', async() => {
    await User.deleteMany({});
    await Course.deleteMany({});
    await Round.deleteMany({});

    // create users
    const userData = [];
    for (let i = 0; i < 10; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        userData.push({ username, email, password });
    }
    await User.collection.insertMany(userData);

    // create courses
    await Course.collection.insertMany(courseData);
    
    // create rounds
    const roundData = [];
    const generatedUsers = userData.map(user => { return user.username})
    const generatedCourses = courseData.map(course => { return course.courseName})

    for (let i = 0; i < 10; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * i) + 1;
        const username = generatedUsers[randomUserIndex];

        const randomCourseIndex = Math.floor(Math.random() * 4) + 1;
        const courseName = generatedCourses[randomCourseIndex];

        const scores = [];
            for (let i = 0; i < 18; i++) {
            const holeNumber = i + 1;
            const stroke = Math.floor(Math.random() * 7) + 1;
            scores.push({ holeNumber, stroke });
        }
        roundData.push({username, courseName, scores: scores});
    }
    await Round.collection.insertMany(roundData);

    // add friends to users
    // add courses to users

    console.log('Database has been seeded.');
    process.exit(0);
});