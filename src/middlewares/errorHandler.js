const sendRes = require('../utils/sendResponse')
const boom = require('@hapi/boom');

module.exports = (err, req, res, next) => {

  if (boom.isBoom(err)){
    if (err.data && err.data.isJoi) {
      return sendRes(res, err.output.statusCode, err.message, undefined, err.data.details);
    }
    else return sendRes(res, err.output.statusCode, err.message, undefined, err.data);
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendRes(res, undefined, err.message, undefined, err);
  }
  else {
    return sendRes(res, err.status || 500, err.message || 'Error desconocido', undefined, err);
  }
}
