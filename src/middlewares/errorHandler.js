const sendRes = require('../utils/sendResponse')
const boom = require('@hapi/boom');

module.exports = (err, req, res, next) => {

  if (boom.isBoom(err)){
    return sendRes(res, err.output.statusCode, err.message, undefined, err);
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendRes(res, undefined, err.message, undefined, err);
  }
  else {
    return sendRes(res, err.status || 500, err.message || 'Error desconocido', undefined, err);
  }
}
