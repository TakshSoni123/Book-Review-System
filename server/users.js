import express from "express";
import User from "./models/user.js";
import { parseError, sessionizeUser } from "./utils/helper.js";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const newUser  = new User({username, email, password});
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();
        // console.log(req);
        req.session.user = sessionUser;
        console.log("New user created");
        console.log("Username: "+username);
        res.send({ userID: newUser.id, username });

    } catch (err){
        res.status(400).send(parseError(err));
    }
});

export default userRoutes;