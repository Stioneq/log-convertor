

/**
 * map fields from received log to the new one
 */
module.exports = {
    fields: [
        'message',
        'error',
        {from: 'environment', to: 'env'},
        {from: 'ip', to: 'host'},
        {from: 'type', to: 'logsource'},
        {from: 'timestamp', to: 'timestamp', fn: val => new Date(val).toISOString()},
        {from: 'app', to: 'program'}

    ],
    additionalFields: [
        {
            field: 'type', fn: obj => {
                if(obj.hasOwnProperty('error')){
                    return 'ERROR';
                }else if(obj.hasOwnProperty('message')){
                    return 'INFO';
                }else{
                    return 'UNKNOWN';
                }
            }
        }
    ],
    fallback: '_data'
}