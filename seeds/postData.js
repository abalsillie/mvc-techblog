const { Post } = require("../models"); // import model

const postData = []; // empty array for new posts to be saved to

const seedPosts = () => Post.bulkCreate(postData); // seed posts with data using bulkCreate

module.exports = seedPosts; // export seedPosts for use in other files
