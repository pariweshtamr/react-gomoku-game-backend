import bcrypt from "bcrypt"

const saltRounds = 10

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds)
}

export const comparePassword = (plainPassword, hashPasswordFromDb) => {
  return bcrypt.compareSync(plainPassword, hashPasswordFromDb)
}
