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

    async findRoomImages(id) {
        try {
            const bodyObj = {
                methodCall: {
                    methodName: 'room_images',
                    params: [
                        {param: {value: {string: WUBOOK_API_KEY}}},
                        {param: {value: {int: WUBOOK_LODGING_CODE}}},
                        {param: {value: {string: id}}},
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
}

module.exports = new RoomService()