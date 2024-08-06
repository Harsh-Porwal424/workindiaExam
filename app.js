import express from "express";
import {getAllLogins, getLogin, addUser, getUserDetail} from './database.js';

const app = express();

app.use(express.json());


app.get('/api/logins', async (req, res) => {
    const logins = await getAllLogins();
    res.send(logins);
})

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const existingLogin = await getUserDetail(username, password);
    if(existingLogin){
        // console.log(existingLogin);
        const data = {
            "status": "Login successful",
            "status_code": 200,
            "user_id": existingLogin.id,
            "access_token": "Bearer " + existingLogin.id + "." + existingLogin.username + "." + existingLogin
        }
        console.log("User authenticated successfully");
        res.status(200).send(data);
    }
    else{
        const data = {
            "status": "Incorrect username/password provided. Please retry",
            "status_code": 401
        }
        res.status(401).send(data);
        console.log("Invalid username or password");
    }
})

//Register a User
app.post('/api/register', async (req, res) => {
    const {username, password, email} = req.body;
    const existingUser = await getUserDetail(username, password);
    if(existingUser){
        const data = {
            "status": "Username already exists. Please choose a different one",
            "status_code": 409
        }
        res.status(409).send(data);
        console.log("Username already exists");
    }
    else{
        const newUser = await addUser(username, password, email);
        const data = {
            "status": "Account successfully created",
            "status_code": 200,
            "user_id": newUser.insertId
        }
        res.status(200).send(data);
        console.log("User registered successfully");
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})