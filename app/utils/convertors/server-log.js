const { ServerMapper, map } = require("../mappers");




const regex = new RegExp(/^\s*<\d+>/);
const mapper = map(ServerMapper);

function parseLog(log) {
    const message = log.match(/^<(\d+)>\s*(\d+)\s*(\S+)\s*(\S+)\s*(\S+)\s*(\d+)\s*(\d+|-)\s*(?:(\[.+\])*)\s*(.+)$/);
    return {
        prival: message[1],
        version: message[2],
        timestamp: message[3],
        host: message[4],
        app: message[5],
        pid: message[6],
        mid: message[7],
        sd: message[8],
        message: message[9]
    };
}

module.exports = {
    check(input) {
        return regex.test(input);
    },
    convert(input) {
        const obj = parseLog(input);
        return mapper(obj);
    }
}