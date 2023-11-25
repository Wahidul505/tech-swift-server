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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = require("../product/product.model");
const order_constants_1 = require("./order.constants");
const order_model_1 = require("./order.model");
const stripe = new stripe_1.default(config_1.default.stripe_sk);
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let totalPrice = 0;
    payload.user = user === null || user === void 0 ? void 0 : user.userId;
    if (((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length) < 1) {
        payload.totalPrice = totalPrice;
    }
    else {
        const orderedProducts = yield Promise.all(payload.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const productData = yield product_model_1.Product.findById(product === null || product === void 0 ? void 0 : product.productId).lean();
            const price = productData === null || productData === void 0 ? void 0 : productData.price;
            return {
                price: price,
                quantity: product === null || product === void 0 ? void 0 : product.quantity,
            };
        })));
        // Calculate total price
        const calculatedTotalPrice = orderedProducts.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
        // +10 dollar for delivery charge
        totalPrice = Number(calculatedTotalPrice.toFixed(2)) + 10;
    }
    payload.totalPrice = totalPrice;
    if ((payload === null || payload === void 0 ? void 0 : payload.payment) === 'gateway') {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: (payload === null || payload === void 0 ? void 0 : payload.totalPrice) * 100,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        if (!paymentIntent.client_secret) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to make payment');
        }
        payload.transactionId = paymentIntent.client_secret;
    }
    payload.status = 'confirmed';
    const result = yield order_model_1.Order.create(payload);
    return result;
});
const getAllFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: order_constants_1.orderSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_model_1.Order.find(whereConditions)
        .populate('products.productId')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id)
        .populate('user')
        .populate('products.productId');
    return result;
});
const getMyOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ user: user === null || user === void 0 ? void 0 : user.userId }).populate('products.productId');
    return result;
});
const getMySingleOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOne({ _id: id, user: user === null || user === void 0 ? void 0 : user.userId }).populate('products.productId');
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    getMyOrders,
    getMySingleOrder,
};
