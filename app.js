import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {getAllLogins, getLogin, addUser, getUserDetail, addCar, historyCar} from './database.js';

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;


app.use(express.json());


app.get('/api/logins', async (req, res) => {
    const logins = await getAllLogins();
    res.send(logins);
})

//Login of User
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const existingLogin = await getUserDetail(username);

    if(existingLogin){
        // console.log(existingLogin);

        const isPasswordCorrect = await bcrypt.compare(password, existingLogin.password);
        
        if (isPasswordCorrect) {
            const token = jwt.sign(
                { user_id: existingLogin.id, username: existingLogin.username },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            const data = {
                status: "Login successful",
                status_code: 200,
                user_id: existingLogin.id,
                access_token: `Bearer ${token}`
            };
            console.log("User authenticated successfully");
            res.status(200).send(data);
        } else {
            const data = {
                status: "Incorrect username/password provided. Please retry",
                status_code: 401
            };
            res.status(401).send(data);
            console.log("Invalid username or password");
        }
        
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
    const existingUser = await getUserDetail(username);
    if(existingUser){
        const data = {
            "status": "Username already exists. Please choose a different one",
            "status_code": 409
        }
        res.status(409).send(data);
        console.log("Username already exists");
    }
    else{
        const encryptedPass = await bcrypt.hash(password, 10);
        const newUser = await addUser(username, encryptedPass, email);
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