import { verifyAccessToken } from "../helpers/jwtHelper.js"
import { getUserById } from "../models/user/UserModel.js"

export const verifyUser = async (req, res, next) => {
  try {
    // get accessToken from headers
    const accessToken = req.headers.authorization
    if (!accessToken) {
      return res.json({ status: "error", message: "Unauthorized!" })
    }

    // check token validity
    const decoded = verifyAccessToken(accessToken)
    if (decoded === "jwt expired") {
      return res.status(403).json({ status: "error", message: "jwt expired!" })
    }
    const user = await getUserById({ _id: decoded._id }).select("-password")

    req.user = user

    return next()
  } catch (error) {
    res.json({ status: "error", error })
  }
}
