import User from "./UserSchema.js"

export const createUser = (obj) => {
  return User(obj).save()
}
export const getUserByFilter = (filter) => {
  return User.findOne(filter)
}

export const getUserById = (id) => {
  return User.findById(id)
}
