import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { protect, adminOnly } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validationMiddleware';
import { companySchema, productSchema, investorSchema } from '../schemas/validationSchemas';

const router = Router();

// Apply auth protection to all admin routes
router.use(protect);
router.use(adminOnly);

// Company routes
router.post('/company', validateBody(companySchema), AdminController.createCompany);
router.put('/company/:id', validateBody(companySchema.partial()), AdminController.updateCompany);
router.delete('/company/:id', AdminController.deleteCompany);

// Product routes
router.post('/product', validateBody(productSchema), AdminController.createProduct);
router.put('/product/:id', validateBody(productSchema.partial()), AdminController.updateProduct);
router.delete('/product/:id', AdminController.deleteProduct);

// Investor routes
router.post('/investor', validateBody(investorSchema), AdminController.createInvestor);
router.put('/investor/:id', validateBody(investorSchema.partial()), AdminController.updateInvestor);
router.delete('/investor/:id', AdminController.deleteInvestor);

export default router;
