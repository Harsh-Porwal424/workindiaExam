import express from "express";
import jwt from "jsonwebtoken";
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
    const existingLogin = await getUserDetail(username, password);
    if(existingLogin){
        // console.log(existingLogin);
        
        const token = jwt.sign(
            { user_id: existingLogin.id, username: existingLogin.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const data = {
            "status": "Login successful",
            "status_code": 200,
            "user_id": existingLogin.id,
            "access_token": `Bearer ${token}`
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

//Registering a Car
app.post('/api/car/create', async (req, res) => {
    const {category, model, number_plate, current_city, rent_per_hr, rent_history} = req.body;
    const newCar = await addCar(category, model, number_plate, current_city, rent_per_hr);
    const CarId = newCar.insertId;
    if(rent_history){
        for(let i=0; i<rent_history.length; i++){
            await historyCar(CarId, rent_history[i].origin, rent_history[i].destination, rent_history[i].amount);
        }
    }
    const data = {
        "status": "Car successfully added",
        "car_id": newCar.insertId,
        "status_code": 200
    }
    res.status(200).send(data);
    console.log("Car added successfully");
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})