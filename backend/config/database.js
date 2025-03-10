const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect("mongodb+srv://node:dgCxcaMQyOU5RtBA@node.tabkb.mongodb.net/stumble")
}

module.exports = dbConnection;
