import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Support Authorization: "Bearer <token>", x-access-token, query or body token
  let token =
    req.headers["authorization"] ||
    req.headers["x-access-token"] ||
    req.query.token ||
    (req.body && req.body.token);

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  // If header is in the form "Bearer <token>", strip the prefix
  if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
    token = token.slice(7).trim();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Save the decoded user info to request
    next();
  });
};
