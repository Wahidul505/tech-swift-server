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
exports.ProfileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const profile_service_1 = require("./profile.service");
const getSingleFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield profile_service_1.ProfileService.getSingleFromDB(userId, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Profile fetched',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const updateFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const payload = req.body;
    const user = req.user;
    const result = yield profile_service_1.ProfileService.updateFromDB(userId, user, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Profile saved',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const deleteFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.user;
    yield profile_service_1.ProfileService.deleteFromDB(userId, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Profile deleted',
        statusCode: http_status_1.default.OK,
    });
}));
exports.ProfileController = {
    getSingleFromDB,
    updateFromDB,
    deleteFromDB,
};
