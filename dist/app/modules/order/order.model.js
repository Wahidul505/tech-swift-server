"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    payment: {
        type: String,
        required: true,
        enum: ['cod', 'gateway'],
    },
    status: {
        type: String,
        enum: ['confirmed', 'shipped', 'delivered'],
    },
    transactionId: {
        type: String,
    },
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
    products: {
        type: [
            {
                productId: {
                    type: String,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                },
            },
        ],
    },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
