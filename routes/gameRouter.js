import express from "express"
import {
  createGame,
  deleteGame,
  getAllUserGames,
  getSingleGame,
  updateGame,
} from "../models/game/GameModel.js"
const router = express.Router()

router.get("/:id?", async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user
    if (!id) {
      const games = await getAllUserGames(user._id)
      return res.json({ status: "success", games })
    }
    const game = await getSingleGame(id)
    if (!game?._id) {
      return res.json({ status: "error", message: "Game not found!" })
    }
    res.json({ status: "success", game })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const user = req.user
    const game = await createGame({ userId: user._id, ...req.body })
    if (!game?._id) {
      return res.json({
        status: "error",
        message: "Unable to save game to database!",
      })
    }
    res.json({ status: "success", game })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

router.patch("/", async (req, res) => {
  try {
    const { id, ...rest } = req.body
    const game = await updateGame(id, rest)
    if (!game?._id) {
      return res.json({
        status: "error",
        message: "Unable to save changes!",
      })
    }
    res.json({ status: "success", game })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

router.delete("/:id?", async (req, res) => {
  const { id } = req.query
  try {
    const deleted = await deleteGame(id)
    if (!deleted?._id) {
      return res.json({
        status: "error",
        message: "Unable to delete game from db!",
      })
    }
    res
      .status(200)
      .json({ status: "success", message: "Game removed from db!" })
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message })
  }
})

export default router
