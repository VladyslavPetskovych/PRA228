const updateImagesFromWubook = require("./update-images-from-wubook");

module.exports = {
    cronRunner: () => {
        updateImagesFromWubook.start()
    }
}