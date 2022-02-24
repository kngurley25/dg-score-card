const { faker } = require('@faker-js/faker');

const userData = [];

for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
};

module.exports = userData;