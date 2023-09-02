import jwt from "jsonwebtoken"

export const signAccessToken = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1d",
  })
  return accessToken
}

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
  } catch (error) {
    return error.message
  }
}
