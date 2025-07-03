const xml2js = require("xml2js");

const {ApiError} = require("../errors");

class XmlParserWubook {
    _xmlBuilder = new xml2js.Builder({
        renderOpts: {pretty: false},
    });
    _xmlParser = new xml2js.Parser({
        explicitArray: false,
    });

    parseObjToXml(obj) {
        return this._xmlBuilder.buildObject(obj)
    }

    async parseXmlToObj(xml) {
        const root = await this._xmlParser.parseStringPromise(xml);
        const topValue = root?.methodResponse?.params?.param?.value;
        const result = this.convert(topValue);

        if (Array.isArray(result) && typeof result[0] === 'number') {
            const [code, payload] = result;
            if (code < 0) {
                throw new ApiError(payload, 400);
            }

            return { code, data: payload };
        }

        return result;
    }

    convert(val) {
        if (!val || typeof val !== 'object') return val;

        if (val.array) {
            const items = [].concat(val.array.data.value);
            return items.map(val => this.convert(val));
        }

        if (val.struct) {
            const obj = {};
            const members = [].concat(val.struct.member);
            for (const m of members) obj[m.name] = this.convert(m.value);
            return obj;
        }

        if (val.int ?? val.i4) return +((val.int ?? val.i4));
        if (val.double != null) return +val.double;
        if (val.boolean != null) return val.boolean === '1';
        if (val.string != null) return val.string;
        if (val['dateTime.iso8601']) return new Date(val['dateTime.iso8601']);
        if (val.base64) return Buffer.from(val.base64, 'base64');

        return val;
    }
}

module.exports = new XmlParserWubook()