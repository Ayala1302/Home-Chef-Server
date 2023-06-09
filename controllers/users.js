const argon2 = require("argon2");
const connection = require("../sql/connection");
const JWT = require("jsonwebtoken");

const createUser = async (req, res) => {
  let sql = `
        INSERT INTO users (username, password, email, first_name, last_name)
        VALUES (?, ?, ?, ?, ?)
    `;
  let { username, password, email, first_name, last_name } = req.body;

  let hash;
  try {
    hash = await argon2.hash(password);
  } catch (error) {
    console.log(error, "hash");
    return res.status(500).json({ message: "error creating user", error });
  }

  const body = [username, hash, email, first_name, last_name];
  connection.query(sql, body, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "error creating user", err });
    }
    console.log(results);
    let token = JWT.sign(
      {
        username: username,
        user_id: results.insertId,
      },
      process.env.JWT_SECRET
    );
    console.log(token, "this is the token");

    return res.status(200).json({ message: "user created", results, token });
  });
};

const login = async (req, res) => {
  let sql = `SELECT * FROM users WHERE username = ?`;
  let { username, password } = req.body;
  connection.query(sql, [username], async (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "error logging in ", err });
    }
    if (!rows[0]) {
      return res.json({
        message: "username and password do not match",
      });
    }
    console.log(rows, "these are the results");
    const hashPassword = rows[0].password;
    let match;
    try {
      match = await argon2.verify(hashPassword, password);
      console.log(match, "this is the match");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something went wrong logging in", error });
    }
    if (!match) {
      return res
        .status(400)
        .json({ message: "username or password do not match" });
    }
    let token = JWT.sign(
      {
        username: rows[0].username,
        user_id: rows[0].id,
      },
      process.env.JWT_SECRET
    );
    console.log(token, "this is the token");
    res.status(200).json({
      token,
      message: "successfully logged in",
    });
  });
};

module.exports = { createUser, login };
