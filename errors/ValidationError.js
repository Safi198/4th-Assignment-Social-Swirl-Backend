class ValidationError extends Error {
    constructor(msg) {
        super(mag);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

module.exports = ValidationError;
