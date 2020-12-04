const {Transform} = require('stream');


module.exports = class Combiner extends Transform {
    constructor() {
        super({
            writableObjectMode: true
        });
    }

    _transform(chunk, encoding, cb) {
    
        this.push(JSON.stringify(chunk) + "\n");
        cb();

    }
    _flush(cb){
        cb();
    }
}