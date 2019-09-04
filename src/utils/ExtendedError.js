module.exports =
    class ExtendedError extends Error {
        constructor(statusCode, message) {
            super();
            //this.status = statusCode;
            //this.message = message;
        }
}

