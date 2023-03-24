import Usuario from "../models/users.js";
import jwt from 'jsonwebtoken';


export const loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token,"SecretKey");
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "Tonto",
    });
  }
};

export const isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

export const isAdmind = async (req, res, next) => {
  try {
    let reqUser = await Usuario.findById(req.body.loggedInUserId);
    // If user role 0 that's mean not admin it's customer
    if (reqUser.userRole === 0) {
      res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch {
    res.status(404);
  }
};


