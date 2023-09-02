import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provided!"],
      unique: true,
      minLength: [4, "Username must be a minimum of 4 characters!"],
      maxLength: [20, "Username must not be more than 20 characters!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided!"],
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema)
