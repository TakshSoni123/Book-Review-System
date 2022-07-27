import express from "express";
import User from "./models/user.js";
import { parseError, sessionizeUser } from "./utils/helper.js";
import { SESS_NAME } from "./config.js";

const sessionRoutes = express.Router();

//Login api
sessionRoutes.post("", async (req, res) => {
    try{

        const {email, password} =  req.body;
        
        const user = await User.findOne({email});
        if(user && user.comparePasswords(password)){
            const sessionUser = sessionizeUser(user);
            
            req.session.user = sessionUser;
            console.log('Logged in with username: '+ user.username);
            res.send(sessionUser);
        } else {
            throw new Error('Invalid login credentials');
        }

    } catch (err){
        res.status(401).send(parseError(err));
    }
});

sessionRoutes.delete("", async ({session}, res) => {
    try {

        const user = session.user;
        if(user) {

            session.destroy(err => {
                if(err){
                    throw(err);
                }
                res.clearCookie(SESS_NAME);
                console.log('Logged out.');
                res.send(user);
            });

        } else {
            throw new Error('Something went wrong');
        }


    } catch (err){
        res.status(422).send(parseError(err));
    }
});

sessionRoutes.get("", (req, res) => {
    console.log('The current user is : '+ req.session.user.username);
    res.send(req.session.user);
});

export default sessionRoutes;