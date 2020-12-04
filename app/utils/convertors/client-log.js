const { map, ClientMapper } = require("../mappers");


const regex = new RegExp(/^\s*{.*}\s*$/);

const mapper = map(ClientMapper);

module.exports = {
    check(input){
        return regex.test(input);
    },
    convert(input){
        const obj = JSON.parse(input);
        //`{type: <String>, message: <String>, error: <String>, timestamp: <Number>, environment: <String>, app: <String>, ip: <String>}`
        return mapper(obj);
    }
}