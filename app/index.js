const MessageConvertor = require('./transformers/message-convertor');

var Config = require('./config/file-to-file.json');
var Source = require('./transport/file-source');
var Target = require('./transport/file-target');
const LineSplitter = require('./transformers/line-splitter');
const Parser = require('./transformers/parser');
const Filter = require('./transformers/filter');
var source = new Source(Config.source);
var target = new Target(Config.target);


source.stream
    .pipe(new LineSplitter())
    .pipe(new MessageConvertor())
    .pipe(new Filter(Config))
    .pipe(new Parser())
    .pipe(target.stream);


