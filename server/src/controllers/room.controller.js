const {roomService} = require("../services");

class RoomController {
    async findAll(req, res, next) {
        try {
            const data = await roomService.findAll();

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {roomId} = req.params;
            const room = await roomService.findById(roomId);

            return res.json(room)
        } catch (e) {
            next(e)
        }
    }

    async findAllImages(req, res, next) {
        try {
            const images = await roomService.findAllImages();

            return res.json(images)
        } catch (e) {
            next(e)
        }
    }

    async findRoomImages(req, res, next) {
        try {
            const {roomId} = req.params;
            const images = await roomService.findRoomImages(roomId);

            return res.json(images)
        } catch (e) {
            next(e)
        }
    }

    async updateImagesFromWubook(req, res, next) {
        try {
            await roomService.updateImagesFromWubook()

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RoomController()