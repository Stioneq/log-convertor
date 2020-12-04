const clientLogConvertor = require('./client-log');
const serverLogConvertor = require('./server-log');
const stacktraceLogConvertor = require('./stacktrace-log');



const convertors = [clientLogConvertor, serverLogConvertor, stacktraceLogConvertor];


function convert(input, metadata){
    for(const convertor of convertors){

        if(convertor.check(input)){
            return convertor.convert(input, metadata);
        }
    }
    return null;
}

module.exports = {
    convert,
    register(convertor){
        convertors.push(convertor)
    }
}