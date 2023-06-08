const JWT = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
  let token;
  if (!req.headers.authorization) {
    token = null;
    return res.status(401).json({ message: "you are not authorized" });
  }
  token = req.headers.authorization.split(" ")[1];
  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "you are not authorized" });
    }
    console.log(decoded, "this is the decoded token");
    req.user_info = {
      username: decoded.username,
      id: decoded.user_id,
    };
    next();
  });
};

module.exports = checkJwt;
