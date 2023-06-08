require("dotenv").config()
const express = require("express")
const cors = require("cors")

const usersRouter = require("./routes/users")
const recipesRouter = require("./routes/recipes")

const app = express()

const port = process.env.PORT || 3330

app.use(cors())
app.use(express.json())

app.use(usersRouter)
app.use(recipesRouter)

app.get("/", (req, res) => {
    res.json({message: "Welcome to Home Chef Server"})
})

app.listen(port, () => {
    console.log("listening on port", port)
})