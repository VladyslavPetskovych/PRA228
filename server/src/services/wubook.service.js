const axios = require("axios");

const {xmlParserWubook} = require("../utils");

const wubookService = axios.create({
    baseURL: "https://wired.wubook.net/xrws/",
    headers: {"Content-Type": "text/xml"},
});

module.exports = wubookService