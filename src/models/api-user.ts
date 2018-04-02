import { model, Schema } from "mongoose";

const userSchema = new Schema({
    id: String,
    password: String,
    registerAt: Date,
    username: String,
});

const user = model("User", userSchema);

export = user;
