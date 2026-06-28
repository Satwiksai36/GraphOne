"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investorSchema = exports.productSchema = exports.companySchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.companySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Company name is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    tagline: zod_1.z.string().min(1, 'Tagline is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    logo: zod_1.z.string().url('Logo must be a valid URL'),
    logoBg: zod_1.z.string().optional(),
    website: zod_1.z.string().url('Website must be a valid URL'),
    category: zod_1.z.string().optional(),
    stage: zod_1.z.string().optional(),
    valuation: zod_1.z.string().optional(),
    fundingTotal: zod_1.z.string().min(1, 'Funding total is required'),
    employeeCount: zod_1.z.string().min(1, 'Employee count is required'),
    foundedYear: zod_1.z.number().int().min(1800),
    hq: zod_1.z.string().min(1, 'HQ location is required'),
    growthScore: zod_1.z.number().optional(),
    growthRate: zod_1.z.number().optional(),
    confidenceScore: zod_1.z.number().optional(),
    isTrending: zod_1.z.boolean().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isPrivate: zod_1.z.boolean().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.productSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Product ID is required'),
    name: zod_1.z.string().min(1, 'Product name is required'),
    tagline: zod_1.z.string().min(1, 'Tagline is required'),
    description: zod_1.z.string().optional(),
    logoUrl: zod_1.z.string().url('Logo URL must be a valid URL'),
    companyId: zod_1.z.string().min(1, 'Company ID is required'),
    categories: zod_1.z.array(zod_1.z.string()).default([]),
    votesCount: zod_1.z.number().int().nonnegative().optional(),
    commentsCount: zod_1.z.number().int().nonnegative().optional(),
    isTrending: zod_1.z.boolean().optional(),
    isPopularRightNow: zod_1.z.boolean().optional(),
    releaseDate: zod_1.z.string().min(1, 'Release date is required'),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.investorSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Investor ID is required'),
    name: zod_1.z.string().min(1, 'Investor name is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    logoUrl: zod_1.z.string().url('Logo URL must be a valid URL'),
    bio: zod_1.z.string().min(1, 'Bio is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    foundedYear: zod_1.z.number().int().min(1800),
    type: zod_1.z.array(zod_1.z.string()).default([]),
    isVerified: zod_1.z.boolean().optional(),
    thesis: zod_1.z.string().optional(),
    preferredStages: zod_1.z.array(zod_1.z.string()).default([]),
});
