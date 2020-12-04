const {LINE_SEPARATOR} = require('../utils/constants');

const {inherits} = require('util');
const {Transform} = require('stream');


function LineSplitter(separators = LINE_SEPARATOR) {
    this.separators = separators;
    Transform.call(this, {encoding: 'utf8'});
}


inherits(LineSplitter, Transform);
let str = '';
LineSplitter.prototype._transform = function (chunk, enc, cb) {
    console.log(this.separators);
    const lines = chunk.toString().split(this.separators);
    lines[0] = str + lines[0];
    str = '';
    if (lines) {
        const lastLine = lines[lines.length - 1];
        if(lastLine) {
            str = lastLine;
        }
        lines.filter(v => !!v)
            .forEach(line => this.push(line));
    }
    cb();


}

LineSplitter.prototype._flush = function (cb) {
    if(str) {
        this.push(str);
    }
    cb();
}

module.exports = LineSplitter;


