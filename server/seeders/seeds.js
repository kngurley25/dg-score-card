const db = require('../config/connection');
const { User, Course, Round } = require('../models');
const userData = require('./user-seeds');
const courseData = require('./course-seeds');

db.once('open', async() => {
    await User.deleteMany({});
    await Round.deleteMany({});
    await Course.deleteMany({});

    // create users
    await User.collection.insertMany(userData);
    const generatedUserId = userData.map(userId => { return userId._id })
    const generatedUsers = userData.map(user => { return user.username})

    // add user friends
    for (let i = 0; i < 20; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * 9) + 1;
        const randomFriendIndex = Math.floor(Math.random() * 9) + 1;
        const userId = generatedUserId[randomUserIndex];
        const friendId = generatedUserId[randomFriendIndex];
        if ( userId != friendId ) {
            await User.updateOne(
                { _id: userId },
                { $addToSet: { friends: friendId }}
            );
        };
    };
        
    // create courses
    await Course.collection.insertMany(courseData);
    const generatedCourses = courseData.map(course => { return course.courseName})
    
    // create rounds
    const roundData = [];
    
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
        const createdRound = await Round.create({username, courseName, scores: scores});
        
        // add round data to user
        await User.updateOne(
            { username: username },
            { $push: { rounds: createdRound._id }}
        );
        roundData.push(createdRound);
    }

    // add friends to users
    // const friends = [];
    // for (let i = 0; i < 15; i += 1) {
    //     const randomUserIndex = Math.floor(Math.random() * i) + 1;
    //     const friend = generatedUsers[randomUserIndex];
    //     const username = generatedUsers[randomUserIndex];
    //     if (username != friend) {
    //         friends.push(friend);
    //     }
    //     await User.updateOne(
    //         { username: username}, 
    //         { $addToSet: {friends: friends }}
    //     );
    // }    

    console.log('Database has been seeded.');
    process.exit(0);
});