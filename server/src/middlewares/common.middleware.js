const {envVariables: {API_PASSWORD}} = require("../configs");
const {ApiError} = require("../errors");

class CommonMiddleware {
    isPasswordValid(field) {
        return (req, res, next) => {
            try {
                const password = req.body[field];

                if (password !== API_PASSWORD) {
                    throw new ApiError("Password doesn't match", 401)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new CommonMiddleware()