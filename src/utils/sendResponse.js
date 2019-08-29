module.exports = sendRes = (res, statusCode, data, message, error) => {
    res.status(statusCode);
    return res.json({ data, message, error });
};
