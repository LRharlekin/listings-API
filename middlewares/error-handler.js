// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = async (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  };

  console.log("Error handler middleware err:", err);

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
    customError.statusCode = 400;
  }
  /* 
// Handling duplicate email insertion as a mongoDB internal error - DB NOT CONFIGURED YET - Index needs to be built first
  if (err.code && err.code === 11000) {
    err.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value.`;
    customError.statusCode = 400; // bad request
  }
 */

  /* Alternative error responses for debugging */
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  // return res.status(customError.statusCode).json({ err });

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
