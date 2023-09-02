import express from "express"
import { createUser, getUserByFilter } from "../models/user/UserModel.js"
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js"
import { signAccessToken } from "../helpers/jwtHelper.js"
import { verifyUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

// register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await getUserByFilter({ username })
    console.log(user)

    if (user?._id) {
      return res.json({
        status: "error",
        message:
          "An account with this username already exists. Please enter a different username!",
      })
    }

    // hash password
    const hashPass = hashPassword(password)

    const newUser = await createUser({ username, password: hashPass })

    if (!newUser?._id) {
      return res
        .status("503")
        .json({ status: "error", message: "Unable to create user!" })
    }
    res.status(200).json({
      status: "success",
      message: "User has been created successfully!",
    })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

// login user
router.post("/login", async (req, res) => {
  const { username, password: pass } = req.body
  try {
    const user = await getUserByFilter({ username })

    if (!user?._id) {
      return res.json({
        status: "error",
        message: "Invalid username or password!",
      })
    }

    // compare password
    const isPassMatched = comparePassword(pass, user?.password)
    if (!isPassMatched) {
      return res.json({
        status: "error",
        message: "Invalid username or password!",
      })
    }

    const accessToken = await signAccessToken({
      _id: user._id,
      username: user.username,
    })

    const { password, __v, ...rest } = user._doc

    res.status(200).json({ status: "success", accessToken })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

// get user
router.get("/", verifyUser, (req, res) => {
  try {
    const user = req.user
    res.json({ status: "success", user })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

export default router
