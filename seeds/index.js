// import seedUsers, seedPosts and seedComments
const seedUsers = require("./userData");
const seedPosts = require("./postData");
const seedComments = require("./commentData");

const sequelize = require("../config/connection"); // import sequelize connection

const seedAll = async () => { // seed all data
  await sequelize.sync({ force: true }); // sync sequelize models
  await seedUsers(); // call seedUsers function
  await seedPosts(); // call seedPosts function
  await seedComments(); // call seedComments function
  process.exit(0);
};

seedAll(); // call seedAll to seed the database
