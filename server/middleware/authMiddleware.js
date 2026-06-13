import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }
  console.log("AUTH USER:", req.user);
  console.log("AUTH USER ID:", req.user._id);

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

export default protect;