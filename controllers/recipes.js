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

module.exports = { saveRecipe };
