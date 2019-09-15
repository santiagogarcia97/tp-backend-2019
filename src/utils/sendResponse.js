module.exports = (res, statusCode, message, data, error) => {
  if(statusCode)
    res.status(statusCode);
  return res.json({ message, data, error });
};
