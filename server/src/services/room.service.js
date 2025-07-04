const fs = require("fs");
const path = require("path");

const {ApiError} = require("../errors");
const wubookService = require("./wubook.service");
const {xmlParserWubook} = require("../utils");
const {envVariables: {WUBOOK_API_KEY, WUBOOK_LODGING_CODE}} = require("../configs");

class RoomService {
    async findAll() {
        try {
            const filePath = path.join(__dirname, "../../apartments.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});

            return JSON.parse(raw)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        try {
            const filePath = path.join(__dirname, "../../apartments.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});
            const data = JSON.parse(raw);

            return data.find(room => room.idWoodoo === id);
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async updateImagesFromWubook() {
        try {
            const filePath = path.join(__dirname, "../../apartments.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});
            const rooms = JSON.parse(raw);

            await Promise.all(
                rooms.map(async (room) => {
                    const imgBody = {
                        methodCall: {
                            methodName: 'room_images',
                            params: [
                                {param: {value: {string: WUBOOK_API_KEY}}},
                                {param: {value: {int: WUBOOK_LODGING_CODE}}},
                                {param: {value: {string: room.idWoodoo}}},
                            ]
                        }
                    };

                    const imgRes = await wubookService.post("", xmlParserWubook.parseObjToXml(imgBody));
                    const {data: roomImages = []} = await xmlParserWubook.parseXmlToObj(imgRes.data);

                    room.imgUrls = roomImages.map(image => image?.image_link)
                })
            )

            fs.writeFileSync(path.join(__dirname, "../../apartments.json"), JSON.stringify(rooms, null, 2))
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new RoomService()