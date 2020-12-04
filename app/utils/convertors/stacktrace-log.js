const { LINE_SEPARATOR } = require("../constants");




const regex = new RegExp(/\n/);

module.exports = {
    check(input){
        return regex.test(input);
    },
    convert(input, {timestamp}){
        return {type: 'ERROR', timestamp, message: input.replace(/\n/g, ' | ')};
    }
}