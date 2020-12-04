const {Transform} = require('stream');
const {Convertor, Constants} = require('../utils');


module.exports = class MessageConvertor extends Transform {
    constructor() {
        super({
            readableObjectMode: true
        });
        this.lastTimestamp = null;
        this.str = '';
    }

    _transform(chunk, encoding, cb) {
        const msg = this.convertAndSendMessage(chunk.toString());
        if(msg){
            this.convertAndSendTheRest();
            this.str = '';
            this.push(msg);


        }else{
            if(this.str){
                this.str += Constants.LINE_SEPARATOR;
            }
            this.str += chunk.toString().trim();
        }
        cb();
    }

    _flush(cb) {
        this.convertAndSendTheRest();
        cb();
    }

    convertAndSendTheRest() {
        if(this.str) {
            const msg = this.convertAndSendMessage(this.str);
            if (msg) {
                this.push(msg);
            }
        }
    }

    convertAndSendMessage(input) {
        if (input) {
            const obj = Convertor.convert(input, {timestamp: this.lastTimestamp});
            if(obj){
                this.lastTimestamp = obj.timestamp;
            }
            return obj;
        }
    }
}