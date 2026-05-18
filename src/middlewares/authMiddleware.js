const config = require("../config/config");

function authMiddleware(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== config.API_KEY) {
    return res.status(403).json({ error: "Unauthorized: API key inválida" });
  }
  next();
}

module.exports = authMiddleware;
