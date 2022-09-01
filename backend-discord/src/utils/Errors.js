const ApiError = require("./ApiError");
const httpStatus = require("http-status");

class InternalServerError extends ApiError {
    constructor() {
        super(httpStatus.INTERNAL_SERVER_ERROR, `Something went wrong, please try again later`);
    }
}

class JWTError extends ApiError {
    constructor() {
        super(httpStatus.UNAUTHORIZED, `JWT not valid`);
    }
}

module.exports = {
    InternalServerError,
    JWTError
};
