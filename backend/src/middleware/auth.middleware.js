import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.split("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      // console.log("AUTH HEADER:", req.headers.authorization);
    }

    if (!token) {
      res.status(401).json({ message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED:", decoded);
    

    req.user = await User.findById(decoded.id).select("-password");
    // console.log("USER FOUND:", req.user);

    next();
  } catch (error) {
    res.status(401).json({ error: `Token Failed ${error.message}` });
  }
};
