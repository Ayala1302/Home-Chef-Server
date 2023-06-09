const express = require("express")
const router = express.Router()
const recipesController = require("../controllers/recipes")
const checkJwt = require('../lib/checkJwt')

router.post("/save-recipe", checkJwt, recipesController.saveRecipe)
router.get("/user-recipes", checkJwt, recipesController.recipesForUser)


module.exports = router