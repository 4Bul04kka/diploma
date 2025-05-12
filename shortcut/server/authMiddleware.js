import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use the same secret as in AuthController

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (Bearer token)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer '

  if (token == null) {
    // If no token, return 401 Unauthorized
    return res.status(401).json({ code: "auth_001", message: "Authentication token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // If token is not valid, return 403 Forbidden (or 401 depending on desired specificity)
      return res.status(403).json({ code: "auth_001", message: "Invalid or expired token" });
    }

    // If token is valid, attach user information to the request
    req.user = user;
    next(); // Continue to the next middleware or route handler
  });
};

export default authMiddleware;
