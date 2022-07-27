
import express from 'express';
import { userRoutes, sessionRoutes } from './index.js';
import cors from 'cors';
import fs from 'fs';
import {PORT, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME} from './config.js';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongodb-session";


(async () => {
    try{
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('MongoDB connected');

        const PORT = process.env.PORT || 3001;

        const app = express();
        const MongoStore = connectStore(session);


        app.use(express.urlencoded({ extended: true}));
        app.use(express.json());
        app.use(cors());
        // console.log(mongoose.connection);
        //use existing sessions in mongo
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({ 
                uri : MONGO_URI,
                collection: 'session',
                ttl: parseInt(SESS_LIFETIME)/1000
            }),
            // store: new MongoStore({
            //     mongooseConnection: mongoose.connection,
            //     collection: 'session',
            //     ttl: parseInt(SESS_LIFETIME) / 1000
            // }),
            cookie: {
                sameSite: true,
                secure: false,
                maxAge: parseInt(SESS_LIFETIME)
            }
        }));


        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/user', userRoutes);
        apiRouter.use('/session', sessionRoutes);

        app.listen(PORT, () => {
            console.log('Server listening on ' + PORT);
        });
    } catch(err){
        console.log(err);
    }

}) ();


// app.post("/register", (req, res) => {

    //     //check if username already exists
    //     const username = req.body.username;
    //     const password = req.body.password;
    
    //     //read file and then update and then write
    //     fs.readFile("../Books-plus-plus/Resources/LoginDetails.json", (err, fileData) => {
    //         if (err) {
    //             console.log("Failed to read file : " + err);
    //         }
    //         try {
    //             var data = JSON.parse(fileData);
    //             //need to hash password before saving
    //             //Create user json 
    //             const userDetails = {
    //                 "username": username,
    //                 "password": password
    //             }
    
    //             data[username] = userDetails;
    //             fs.writeFile("../Books-plus-plus/Resources/LoginDetails.json", JSON.stringify(data), err => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //             });
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });
    // });
    
    // app.post("/login", (req, res) => {
    //     const username = req.body.username;
    //     const password = req.body.password;
    
    //     fs.readFile("../Books-plus-plus/Resources/LoginDetails.json", (err, fileData) => {
    //         if (err) {
    //             console.log("Failed to read file : " + err);
    //         }
    //         try {
    //             var data = JSON.parse(fileData);
    //             console.log(username);
    //             console.log(password);
    //             if (data[username]) {
    //                 console.log('user exists');
    //                 if (data[username].password === password) {
    //                     console.log('login successful');
    //                     res.sendStatus(200);
    //                     // res.redirect('/register');
    //                 }
    //                 else {
    //                     console.log('Incorrect password');
    //                 }
    
    //             } else {
    //                 console.log('User does not exist. Please register');
    //             }
    
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     });
    // });