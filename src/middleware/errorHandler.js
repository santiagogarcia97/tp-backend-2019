module.exports = (err, req, res, next) => {
    const { status, message } = err;
    res.status(status).json({
        status: "error",
        status,
        message
    });
    next();
}
