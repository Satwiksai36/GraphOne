"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const validationSchemas_1 = require("../schemas/validationSchemas");
const router = (0, express_1.Router)();
// Apply auth protection to all admin routes
router.use(authMiddleware_1.protect);
router.use(authMiddleware_1.adminOnly);
// Company routes
router.post('/company', (0, validationMiddleware_1.validateBody)(validationSchemas_1.companySchema), adminController_1.AdminController.createCompany);
router.put('/company/:id', (0, validationMiddleware_1.validateBody)(validationSchemas_1.companySchema.partial()), adminController_1.AdminController.updateCompany);
router.delete('/company/:id', adminController_1.AdminController.deleteCompany);
// Product routes
router.post('/product', (0, validationMiddleware_1.validateBody)(validationSchemas_1.productSchema), adminController_1.AdminController.createProduct);
router.put('/product/:id', (0, validationMiddleware_1.validateBody)(validationSchemas_1.productSchema.partial()), adminController_1.AdminController.updateProduct);
router.delete('/product/:id', adminController_1.AdminController.deleteProduct);
// Investor routes
router.post('/investor', (0, validationMiddleware_1.validateBody)(validationSchemas_1.investorSchema), adminController_1.AdminController.createInvestor);
router.put('/investor/:id', (0, validationMiddleware_1.validateBody)(validationSchemas_1.investorSchema.partial()), adminController_1.AdminController.updateInvestor);
router.delete('/investor/:id', adminController_1.AdminController.deleteInvestor);
exports.default = router;
