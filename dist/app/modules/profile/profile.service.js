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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const checkUserMatched_1 = require("../../../utils/checkUserMatched");
const profile_model_1 = require("./profile.model");
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isProfileExist = yield profile_model_1.Profile.findOne({ user: user === null || user === void 0 ? void 0 : user.userId });
    if (isProfileExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You have already created your profile');
    }
    payload.user = user === null || user === void 0 ? void 0 : user.userId;
    const result = yield profile_model_1.Profile.create(payload);
    return result;
});
const getSingleFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findOne({ user: user === null || user === void 0 ? void 0 : user.userId });
    return result;
});
const updateFromDB = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProfileExist = yield profile_model_1.Profile.findById(id);
    (0, checkUserMatched_1.checkUserMatch)(user === null || user === void 0 ? void 0 : user.userId, isProfileExist === null || isProfileExist === void 0 ? void 0 : isProfileExist.user);
    const result = yield profile_model_1.Profile.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isProfileExist = yield profile_model_1.Profile.findById(id);
    (0, checkUserMatched_1.checkUserMatch)(user === null || user === void 0 ? void 0 : user.userId, isProfileExist === null || isProfileExist === void 0 ? void 0 : isProfileExist.user);
    yield profile_model_1.Profile.findByIdAndDelete(id);
});
exports.ProfileService = {
    insertIntoDB,
    getSingleFromDB,
    updateFromDB,
    deleteFromDB,
};
