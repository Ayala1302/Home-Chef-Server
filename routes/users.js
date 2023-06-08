const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users")

router.post("/create-user", usersController.createUser)
router.post("/log-in", usersController.login)

module.exports = router