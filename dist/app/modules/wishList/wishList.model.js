"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const WishListSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
        ref: 'user',
    },
    products: {
        type: [
            {
                productId: {
                    type: String,
                    ref: 'Product',
                },
            },
        ],
    },
}, {
    timestamps: true,
});
exports.WishList = (0, mongoose_1.model)('WishList', WishListSchema);
