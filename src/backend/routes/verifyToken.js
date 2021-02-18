const webtoken = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var verified;
  const refreshToken = req.body['refreshToken']
  const accessToken = req.cookies.access_token;
  if (!refreshToken && !accessToken) return res.status(401).send("Access Denied");

  try {
    if (accessToken){
      verified = webtoken.verify(accessToken, process.env.TOKEN_SECRET); 
    } else {
      verified = webtoken.verify(refreshToken, process.env.TOKEN_SECRET);
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
