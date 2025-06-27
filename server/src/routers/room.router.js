const {Router} = require("express");

const {roomController} = require("../controllers");

const router = Router();

router.get("/", roomController.findAll)
router.get("/:roomId", roomController.findById)
router.get("/:roomId/images", roomController.findRoomImages)

module.exports = router
