const mongoose = require('mongoose')

exports.OK = 0
exports.ERROR_STRING_IS_EMPTY = 1
exports.ERROR_STRING_INVALID = 2
exports.ERROR_RECORD_NOT_FOUND = 3

exports.isValidObjectID = (string) => {
    if (!string) {
        return this.ERROR_STRING_IS_EMPTY
    }
    if (!mongoose.isValidObjectId(string)) {
        return this.ERROR_STRING_INVALID
    }
    return this.OK
}