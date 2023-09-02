import mongoose from "mongoose"

const mongoClient = () => {
  if (!process.env.MONGODB_URI) {
    console.log(
      "MONGO_URI is not defined. Please create MONGO_URI and provide a MongoDB connection string"
    )
  }

  try {
    // mongoose.set("strictQuery", false)
    const connectionString = mongoose.connect(process.env.MONGODB_URI)
    if (connectionString) {
      return console.log("MongoDB Connected")
    }
    console.log("Failed to connect to MongoDB")
  } catch (error) {
    console.log(error)
  }
}

export default mongoClient
