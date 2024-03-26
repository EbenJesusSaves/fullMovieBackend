import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

//-------- password hashing -------------//
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

//password hashing
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const protect = (req, res, next) => {
  // a generalized form of token
  const bearer = req.headers.authorization;

  // if user don't have a bearer token at all
  if (!bearer) {
    res.status(401);
    res.json({ message: "screw you not authorized" });
    return;
  }
  // if user has a bearer but no token, screw them as well
  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not authorized token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("validated");
    //call the next function after you're done with what you're doing
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "not authorized because mismatch" });
    return;
  }
};
