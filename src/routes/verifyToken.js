const webtoken = require("jsonwebtoken");

//Backend functionality used to verify tokens to make sure sessions are valid
module.exports = function (req, res, next) {

  var verifiedToken;
  const refreshToken = req.body['refreshToken']
  const accessToken = req.cookies.access_token;
  if (!refreshToken && !accessToken) return res.status(401).send("Access Denied");

  try {

    if (accessToken){
      verifiedToken = webtoken.verify(accessToken, process.env.TOKEN_SECRET); 
    } else {
      verifiedToken = webtoken.verify(refreshToken, process.env.TOKEN_SECRET);
    }

    req.user = verifiedToken;
    next();

  } catch (err) {
    res.status(400).send("Invalid Web Token");
  }
};
