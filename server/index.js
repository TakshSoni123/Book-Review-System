
const express = require("express");
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {

    //check if username already exists
    const username = req.body.username;
    const password = req.body.password;
    const rePassword = req.body.repassword;

    if (password == rePassword) {
        //read file and then update and then write
        fs.readFile("../Books-plus-plus/Resources/LoginDetails.json", (err, fileData) => {
            if (err) {
                console.log("Failed to read file : " + err);
            }
            try {
                var data = JSON.parse(fileData);
                //need to hash password before saving
                //Create user json 
                const userDetails = {
                    "username": username,
                    "password": password
                }

                data[username] = userDetails;
                fs.writeFile("../Books-plus-plus/Resources/LoginDetails.json", JSON.stringify(data), err => {
                    if(err){
                        console.log(err);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        });

    }
    else {
        console.log("Passwords do not match");
    }
});

app.listen(PORT, () => {
    console.log('Server listening on ${PORT} ');
});