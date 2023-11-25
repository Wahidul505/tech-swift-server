"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListService = void 0;
const wishList_model_1 = require("./wishList.model");
const insertIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isWishListExist = yield wishList_model_1.WishList.findOne({ user: user === null || user === void 0 ? void 0 : user.userId });
    let result;
    if (isWishListExist) {
        result = yield wishList_model_1.WishList.findOneAndUpdate({ user: user === null || user === void 0 ? void 0 : user.userId }, payload, {
            new: true,
        }).populate('products.productId');
    }
    payload.user = user === null || user === void 0 ? void 0 : user.userId;
    result = yield wishList_model_1.WishList.create(payload);
    return result;
});
const getSingleFromDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user === null || user === void 0 ? void 0 : user.userId);
    const result = yield wishList_model_1.WishList.findOne({ user: userId }).populate('products.productId');
    return result;
});
exports.WishListService = {
    insertIntoDB,
    getSingleFromDB,
};
