"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMatch = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const checkUserMatch = (jwtUser, dbUser) => {
    if (jwtUser !== dbUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden');
    }
    return;
};
exports.checkUserMatch = checkUserMatch;
