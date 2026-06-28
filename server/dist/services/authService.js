"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
class AuthService {
    static async register(data) {
        const { email, password, name } = data;
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            const error = new Error('Email address already registered');
            error.statusCode = 400;
            error.code = 'EMAIL_EXISTS';
            throw error;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'user', // default role
            },
        });
        const token = this.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }
    static async login(data) {
        const { email, password } = data;
        const user = await db_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            error.code = 'INVALID_CREDENTIALS';
            throw error;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            error.code = 'INVALID_CREDENTIALS';
            throw error;
        }
        const token = this.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }
    static async getProfile(userId) {
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                bookmarks: true,
                searchHistory: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            error.code = 'USER_NOT_FOUND';
            throw error;
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            bookmarks: user.bookmarks,
            searchHistory: user.searchHistory,
        };
    }
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
            expiresIn: env_1.env.JWT_EXPIRES_IN,
        });
    }
}
exports.AuthService = AuthService;
