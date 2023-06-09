const connection = require("../sql/connection");

const saveRecipe = (req, res) => {
  const sql = `
        INSERT INTO user_recipes (user_id, recipe_id) VALUES (?, ?);
    `;
  const { recipe_id } = req.body;
  const { id } = req.user_info;
  connection.query(sql, [id, recipe_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "server error ", err });
    }
    console.log(results);
    res.status(200).json({ message: "recipe saved", results });
  });
};

const recipesForUser = (req, res) => {
  const sql = `SELECT * FROM user_recipes WHERE user_id = ?`;
  const { id } = req.user_info;
  connection.query(sql, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "server error ", err });
    }
    console.log(rows);
    res.status(200).json({ message: "Here are your recipes", rows });
  });
};

const deleteRecipe = (req, res) => {
  let sql = `DELETE FROM user_recipes WHERE (id = ?)`;
  const {id} = req.params
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "server error ", err });
    }
    console.log(results);
    res.status(200).json({ message: "Recipe deleted", results });
  });
};

module.exports = { saveRecipe, recipesForUser, deleteRecipe };
