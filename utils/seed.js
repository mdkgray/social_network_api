const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { RandomUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing courses
    await Thought.deleteMany({});

    // Drop existing students
    await User.deleteMany({});

    // Create empty array to hold the students
    const users = [];

    // Loop 20 times to add users to the users array
    for (let i = 0; i < 20; i++) {
        const userDetails = new RandomUser(20);

        users.push({ userDetails });
    }

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
});