module.exports = (res, statusCode, message, data, error) => {
    res.status(statusCode);
    return res.json({ message, data, error });
};
