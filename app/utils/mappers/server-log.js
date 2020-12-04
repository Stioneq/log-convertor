
const SEV_MAP = {
    0: 'ERROR',
    1: 'ERROR',
    2: 'ERROR',
    3: 'ERROR',
    4: 'WARNING',
    5: 'INFO',
    6: 'INFO',
    7: 'DEBUG',
}

/**
 * map fields from received log to the new one
 */
module.exports = {
    pre: obj => {
        if(obj.sd && typeof(obj.sd) === 'string'){
            const sd = obj.sd.substring(1, obj.sd.length - 1).split('][');
            delete obj.sd;
            for(const item of sd){
                const [name, ...pairs] = item.trim().split(" ");
                if(name){
                    const key = name.substr(0, name.indexOf('@'));
                    obj[key] = obj[key] || {};
                    for(let pair of pairs){
                        const [pkey, pvalue] = pair.split('=');
                        obj[key][pkey] = pvalue;
                    }
                }
            }
        }
    },
    fields: [
        'message',
        {from: 'prival', to: 'type', fn: val => SEV_MAP[val % 8]},
        // {from: 'environment', to: 'env'},
        // {from: 'ip', to: 'host'},
        // {from: 'type', to: 'logsource'},
        'host',
        'timestamp',
        {from: 'app', to: 'program'}

    ],
    fallback: '_data'
}