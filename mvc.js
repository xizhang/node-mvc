// === global utilities ===

exports.config = require('./config');

exports.log = function() {
    if (exports.config.DEBUG_LOG){
        console.log(arguments);
    }
};

exports.warn = function() {
    if (exports.config.DEBUG_WARN) {
        console.log(arguments);
    }
};
    
exports.error = function() {
    if (exports.config.DEBUG_ERROR) {
        console.log(arguments);
    }
};
