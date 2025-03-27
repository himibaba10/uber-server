"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ success: false, errors: { common: { msg: err.message } } });
};
exports.default = globalErrorHandler;
