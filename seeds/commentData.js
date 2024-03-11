const { Comment } = require("../models"); // import model

const commentData = []; // empty array for comments to be saved to

const seedComments = () => Comment.bulkCreate(commentData); // seed comments with data using bulkCreate

module.exports = seedComments; // export seedComments for use in other files
