const { User } = require("../models"); // import model

const userData = []; // empty array for user data to be saved to

const seedUsers = () => User.bulkCreate(userData); // seed user data using bulkCreate

module.exports = seedUsers; // export seedUsers for use in other files
