"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    details: {
        model: {
            type: String,
        },
        display: {
            type: String,
        },
        processor: {
            type: String,
        },
        camera: {
            type: String,
        },
        ram: {
            type: String,
        },
        storage: {
            type: String,
        },
    },
    features: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    category: {
        type: String,
        required: true,
        ref: 'Category',
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
