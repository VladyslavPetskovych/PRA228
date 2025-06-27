const {config} = require("dotenv");

config()

module.exports = {
    WUBOOK_API_KEY: process.env.WUBOOK_API_KEY,
    WUBOOK_LODGING_CODE: process.env.WUBOOK_LODGING_CODE,
}