"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const companyRoutes_1 = __importDefault(require("./companyRoutes"));
const investorRoutes_1 = __importDefault(require("./investorRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const newsRoutes_1 = __importDefault(require("./newsRoutes"));
const searchRoutes_1 = __importDefault(require("./searchRoutes"));
const statsRoutes_1 = __importDefault(require("./statsRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', authRoutes_1.default);
router.use('/companies', companyRoutes_1.default);
router.use('/investors', investorRoutes_1.default);
router.use('/products', productRoutes_1.default);
router.use('/news', newsRoutes_1.default);
router.use('/search', searchRoutes_1.default);
router.use('/stats', statsRoutes_1.default);
router.use('/admin', adminRoutes_1.default);
// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});
exports.default = router;
