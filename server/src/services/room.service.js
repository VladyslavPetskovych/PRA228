const fs = require("fs");
const path = require("path");

const {ApiError} = require("../errors");
const wubookService = require("./wubook.service");
const {xmlParserWubook} = require("../utils");
const {envVariables: {WUBOOK_API_KEY, WUBOOK_LODGING_CODE}} = require("../configs");

class RoomService {
    async findAll() {
        try {
            const bodyObj = {
                methodCall: {
                    methodName: 'fetch_rooms',
                    params: [
                        {param: {value: {string: WUBOOK_API_KEY}}},
                        {param: {value: {int: WUBOOK_LODGING_CODE}}},
                        {param: {value: {int: 0}}},
                    ]
                }
            }

            const xmlBody = xmlParserWubook.parseObjToXml(bodyObj);
            const res = await wubookService.post("", xmlBody);
            const {data} = await xmlParserWubook.parseXmlToObj(res.data);

            return data
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        try {
            const bodyObj = {
                methodCall: {
                    methodName: 'fetch_single_room',
                    params: [
                        {param: {value: {string: WUBOOK_API_KEY}}},
                        {param: {value: {int: WUBOOK_LODGING_CODE}}},
                        {param: {value: {string: id}}},
                        {param: {value: {int: 0}}},
                    ]
                }
            }

            const xmlBody = xmlParserWubook.parseObjToXml(bodyObj);
            const res = await wubookService.post("", xmlBody);
            const {data} = await xmlParserWubook.parseXmlToObj(res.data);

            return data
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findAllImages() {
        try {
            const filePath = path.join(__dirname, "../../images.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("File with images not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"}, );

            return JSON.parse(raw)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findRoomImages(id) {
        try {
            const filePath = path.join(__dirname, "../../images.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("File with images not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"}, );
            const data = JSON.parse(raw);

            return data.filter(img => String(img.id_room) === id)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async updateImagesFromWubook() {
        try {
            const bodyObj = {
                methodCall: {
                    methodName: 'fetch_rooms',
                    params: [
                        {param: {value: {string: WUBOOK_API_KEY}}},
                        {param: {value: {int: WUBOOK_LODGING_CODE}}},
                        {param: {value: {int: 0}}},
                    ]
                }
            }

            const xmlBody = xmlParserWubook.parseObjToXml(bodyObj);
            const res = await wubookService.post("", xmlBody);
            const {data: rooms} = await xmlParserWubook.parseXmlToObj(res.data);

            const imagesOfRooms = (await Promise.all(
                rooms.map(async (room) => {
                    const imgBody = {
                        methodCall: {
                            methodName: 'room_images',
                            params: [
                                {param: {value: {string: WUBOOK_API_KEY}}},
                                {param: {value: {int: WUBOOK_LODGING_CODE}}},
                                {param: {value: {string: room.id}}},
                            ]
                        }
                    };

                    const imgRes = await wubookService.post("", xmlParserWubook.parseObjToXml(imgBody));
                    const {data: roomImages = []} = await xmlParserWubook.parseXmlToObj(imgRes.data);

                    return roomImages.filter(image => image !== undefined);
                })
            )).flat();

            fs.writeFileSync(path.join(__dirname, "../../images.json"), JSON.stringify(imagesOfRooms))
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new RoomService()