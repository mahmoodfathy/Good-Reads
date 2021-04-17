const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //Verify token
  try {
    //decode the token
    const decoded = jwt.verify(token, process.env.SECRET);
    //set req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const authObj = {
  auth,
};

module.exports = authObj;
