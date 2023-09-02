import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoClient from "./dbConnect.js"
const app = express()
const PORT = process.env.PORT || 8000

// Connect DB
mongoClient()

// Middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({
    message: "You have reached gomoku app api!",
  })
})

// Routes
import userRouter from "./routes/userRouter.js"
import gameRouter from "./routes/gameRouter.js"
import { verifyUser } from "./middlewares/authMiddleware.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/game", verifyUser, gameRouter)

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server is running at port ${PORT}`)
})
