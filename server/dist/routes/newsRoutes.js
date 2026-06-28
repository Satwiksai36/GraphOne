"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_1 = require("../controllers/newsController");
const router = (0, express_1.Router)();
router.get('/trending', newsController_1.NewsController.getTrendingNews);
router.get('/company/:slug', newsController_1.NewsController.getNewsByCompany);
router.get('/', newsController_1.NewsController.getNews);
exports.default = router;
