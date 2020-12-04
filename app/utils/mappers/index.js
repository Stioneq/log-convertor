
const { identityFunction } = require("./functions");

const ClientMapper = require('./client-log')
const ServerMapper = require('./server-log')
//TODO  const StacktraceMapper = require('./server-log')


function buildFieldsMap(fields){
    return fields.reduce((acc, cur) => {
        if(typeof cur === 'string'){
            acc.set(cur, {to: cur, fn: identityFunction});
        }else{
            const fn = cur.fn || identityFunction;
        
            acc.set(cur.from, {to: cur.to, fn})
        }
        return acc;
    }, new Map());
}


const map = mapper => {
    const {fields, fallback, additionalFields, pre} = mapper;
    const fieldsMap = buildFieldsMap(fields);
    return obj => {
        if(pre){
            pre(obj);
        }
        const res = {};
        for(const [key,value] of Object.entries(obj)){
            if(fieldsMap.has(key)){
                const {to, fn} = fieldsMap.get(key)
                res[to] = fn(value, obj);
            }else{
                res[fallback] = res[fallback] || {};
                res[fallback][key] = value;
            }
        }
        if(additionalFields){
            for(const {field, fn} of additionalFields){
                    res[field] = fn(obj);
            }
        }
        return res;
    }
}

module.exports = {
    map,
    ClientMapper,
    ServerMapper

}