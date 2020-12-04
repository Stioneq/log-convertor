const {Transform} = require('stream');


module.exports = class Filter extends Transform {
    constructor(config) {
        super({
            objectMode: true
        });
        this.config = config;
    }

    _transform(chunk, encoding, cb) {
        console.log(this.config);
        if(this.config && this.config.filter && this.config.filter.allowed && this.config.filter.allowed.length){
            if(chunk && chunk.type && this.config.filter.allowed.includes(chunk.type)){
                this.push(chunk);
            }
        }else{
            this.push(chunk);
        }
        cb();

    }
    _flush(cb){
        cb();
    }
}