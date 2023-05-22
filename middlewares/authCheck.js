const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

function authCheck(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  dotenv.config();

  jwt.verify(token, process.env.TOKEN_RAHASIA, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = authCheck