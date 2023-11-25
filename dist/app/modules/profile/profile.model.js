"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    location: {
        type: String,
    },
    dp: {
        type: String,
    },
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.Profile = (0, mongoose_1.model)('Profile', ProfileSchema);
