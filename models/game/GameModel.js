import Game from "./GameSchema.js"

export const createGame = (obj) => {
  return Game(obj).save()
}

export const getAllUserGames = (id) => {
  return Game.find({ userId: id, isComplete: true }).sort({
    createdAt: -1,
  })
}

export const getSingleGame = (id) => {
  return Game.findById(id)
}

export const updateGame = (id, obj) => {
  return Game.findByIdAndUpdate(
    id,
    {
      boardState: obj?.boardState,
      winner: obj?.winner ? obj?.winner : "",
      isComplete: obj?.isComplete,
    },
    { new: true }
  )
}

export const deleteGame = (id) => {
  console.log(id)
  return Game.findByIdAndDelete(id)
}
