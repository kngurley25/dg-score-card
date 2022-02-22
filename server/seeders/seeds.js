const db = require('../config/connection');
const { User, Course, Round } = require('../models');
const { faker } = require('@faker-js/faker');

db.once('open', async() => {
    await User.deleteMany({});
    await Course.deleteMany({});
    await Round.deleteMany({});

    const userData = [];
    for (let i = 0; i < 10; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        userData.push({ username, email, password });
    }
    const seededUsers = await User.collection.insertMany(userData);



    
})