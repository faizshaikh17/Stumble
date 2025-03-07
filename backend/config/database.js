import mongoose from "mongoose";

const dbConnection = async () => {
    await mongoose.connect("mongodb+srv://node:dgCxcaMQyOU5RtBA@node.tabkb.mongodb.net/zeetly")
}

export default dbConnection;
