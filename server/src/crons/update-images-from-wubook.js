const {CronJob} = require("cron");

const {roomService} = require("../services");

module.exports = new CronJob("0 0 */2 * * *", async () => await roomService.updateImagesFromWubook())