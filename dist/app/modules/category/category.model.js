"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
