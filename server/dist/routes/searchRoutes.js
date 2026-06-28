"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = require("../controllers/searchController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const router = (0, express_1.Router)();
// Optional protection middleware inline/locally
const optionalProtect = async (req, _res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            req.user = decoded;
        }
        catch (e) { }
    }
    next();
};
router.get('/history', authMiddleware_1.protect, searchController_1.SearchController.getSearchHistory);
router.delete('/history', authMiddleware_1.protect, searchController_1.SearchController.clearSearchHistory);
router.get('/', optionalProtect, searchController_1.SearchController.globalSearch);
exports.default = router;
