const sendRes = require('../utils/sendResponse')
const boom = require('@hapi/boom');

module.exports = (err, req, res, next) => {
    if (boom.isBoom(err)){
        sendRes(res, err.output.statusCode, err.message, undefined, err);
    }
    else {
        sendRes(res, err.status || 500, err.message || 'Error desconocido', undefined, err);
    }
}
