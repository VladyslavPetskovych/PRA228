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
            const imagesPath = path.join(__dirname, "../../images.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }
            if (!fs.existsSync(imagesPath)) {
                throw new ApiError("JSON file with images not found", 500);
            }

            const rawApartments = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});
            const apartments = JSON.parse(rawApartments);

            const rawImages = fs.readFileSync(imagesPath, {encoding: "utf8", flag: "r"});
            const images = JSON.parse(rawImages);

            return apartments.map(apartment => {
                const roomImages = images.find(img => img.idWoodoo === apartment.idWoodoo);
                return {
                    ...apartment,
                    imgUrls: roomImages ? roomImages.imgUrls : []
                };
            })
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        try {
            const filePath = path.join(__dirname, "../../apartments.json");
            const imagesPath = path.join(__dirname, "../../images.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }
            if (!fs.existsSync(imagesPath)) {
                throw new ApiError("JSON file with images not found", 500);
            }

            const rawApartments = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});
            const apartments = JSON.parse(rawApartments);

            const rawImages = fs.readFileSync(imagesPath, {encoding: "utf8", flag: "r"});
            const images = JSON.parse(rawImages);

            const room = apartments.find(room => room.idWoodoo === id);
            if (!room) {
                throw new ApiError("Room not found", 404)
            }

            const roomImages = images.find(room => room.idWoodoo === id);

            return {
                ...room,
                imgUrls: roomImages ? roomImages.imgUrls : []
            };
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async updateImagesFromWubook() {
        try {
            const filePath = path.join(__dirname, "../../apartments.json");
            const imagesPath = path.join(__dirname, "../../images.json");

            if (!fs.existsSync(filePath)) {
                throw new ApiError("JSON file with apartments not found", 500);
            }

            const raw = fs.readFileSync(filePath, {encoding: "utf8", flag: "r"});
            const rooms = JSON.parse(raw);

            const imagesData = [];

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

                    imagesData.push({
                        id: room.id,
                        idWoodoo: room.idWoodoo,
                        imgUrls: roomImages.map(image => image?.image_link),
                    });
                })
            )

            fs.writeFileSync(imagesPath, JSON.stringify(imagesData, null, 2))
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new RoomService()