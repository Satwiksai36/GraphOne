import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  logo: z.string().url('Logo must be a valid URL'),
  logoBg: z.string().optional(),
  website: z.string().url('Website must be a valid URL'),
  category: z.string().optional(),
  stage: z.string().optional(),
  valuation: z.string().optional(),
  fundingTotal: z.string().min(1, 'Funding total is required'),
  employeeCount: z.string().min(1, 'Employee count is required'),
  foundedYear: z.number().int().min(1800),
  hq: z.string().min(1, 'HQ location is required'),
  growthScore: z.number().optional(),
  growthRate: z.number().optional(),
  confidenceScore: z.number().optional(),
  isTrending: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  tags: z.array(z.string()).default([]),
});

export const productSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().optional(),
  logoUrl: z.string().url('Logo URL must be a valid URL'),
  companyId: z.string().min(1, 'Company ID is required'),
  categories: z.array(z.string()).default([]),
  votesCount: z.number().int().nonnegative().optional(),
  commentsCount: z.number().int().nonnegative().optional(),
  isTrending: z.boolean().optional(),
  isPopularRightNow: z.boolean().optional(),
  releaseDate: z.string().min(1, 'Release date is required'),
  tags: z.array(z.string()).default([]),
});

export const investorSchema = z.object({
  id: z.string().min(1, 'Investor ID is required'),
  name: z.string().min(1, 'Investor name is required'),
  slug: z.string().min(1, 'Slug is required'),
  logoUrl: z.string().url('Logo URL must be a valid URL'),
  bio: z.string().min(1, 'Bio is required'),
  location: z.string().min(1, 'Location is required'),
  foundedYear: z.number().int().min(1800),
  type: z.array(z.string()).default([]),
  isVerified: z.boolean().optional(),
  thesis: z.string().optional(),
  preferredStages: z.array(z.string()).default([]),
});
