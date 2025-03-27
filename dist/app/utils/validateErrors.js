"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateErrors = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsObj = {};
        errors
            .array()
            .forEach((err) => (errorsObj[err.param] = { msg: err.msg }));
        res.status(400).json({ success: false, errors: errorsObj });
        return true;
    }
    return false;
};
exports.default = validateErrors;
