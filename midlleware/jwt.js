const jwt = require("jsonwebtoken");

require("dotenv").config();


//generate token


 const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role   // ✅ ADD THIS
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};



//check token 

const jwtauth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // safe now
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach decoded info to req
    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { jwtauth, generateToken };