class NotFoundError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;
