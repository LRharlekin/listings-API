const { NotFoundError } = require("../errors");

const notFoundMiddleware = (req, res) => {
  res.status(404).send("Route does not exist.");
};

module.exports = notFoundMiddleware;
