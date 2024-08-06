import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllLogins() {
  const [rows] = await pool.query("select * from car_rental_login");
  return rows;
}

export async function getLogin(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM car_rental_login
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function getUserDetail(username, password) {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM car_rental_login
      WHERE username = ? AND password = ?
      `,
      [username, password]
    );
    return rows[0];
}

export async function addUser(username, password, email) {
  const [result] = await pool.query(
    `
    INSERT INTO car_rental_login (username, password, email)
    VALUES (?, ?, ?)
    `,
    [username, password, email]
  );
  return result;
}

export async function addCar(category, model, number_plate, current_city, rent_per_hr) {
    const [result] = await pool.query(
      `
      INSERT INTO car_rental_details (category, model, number_plate, current_city, rent_per_hr)
      VALUES (?, ?, ?, ?, ?)
      `,
      [category, model, number_plate, current_city, rent_per_hr]
    );
    return result;
}

export async function historyCar(car_id, origin, destination, amount) {
    const [result] = await pool.query(
      `
      INSERT INTO rental_history (car_id, origin, destination, amount)
      VALUES (?, ?, ?, ?)
      `,
      [car_id, origin, destination, amount]
    );
    return result;
}


// const result = await addUser('testUser', 'testPassword', 'testEmail@example.com');
// console.log(result);

//   const note = await getLogin(2)
//   console.log(note)

// const result = await pool.query("select * from car_rental_login");
// const rows = result[0];
// console.log(rows);
