import mongoose from "mongoose"

const GameSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    winner: {
      type: String,
      default: "",
      enum: ["White", "Black", ""],
    },
    boardState: [[{ type: String, default: "" }]],
    size: {
      type: Number,
      required: [true, "Board size must be specified!"],
      validate(value) {
        if (value < 5) {
          throw new Error("Board size cannot be less than 5!")
        }
      },
    },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model("Game", GameSchema)
