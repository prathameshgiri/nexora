import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { readDb } from "../utils/json-db";
import type { User } from "../types";
import { fail } from "../utils/api";

declare global { namespace Express { interface Request { auth?: { user: User; permissions: string[] }; } } }
export const authenticate: RequestHandler = async (req, res, next) => { const header = req.headers.authorization; if (!header?.startsWith("Bearer ")) return fail(res, "Authentication required", 401); try { const payload = jwt.verify(header.slice(7), config.jwtSecret) as { sub: string }; const users = await readDb<User>("users"); const user = users.find(item => item.id === payload.sub); if (!user || user.status !== "active") return fail(res, "Account unavailable", 401); const roles = await readDb<{ name: string; permissions: string[] }>("roles"); const role = roles.find(item => item.name === user.role); req.auth = { user, permissions: role?.permissions ?? [] }; next(); } catch { return fail(res, "Invalid or expired token", 401); } };
export const requirePermission = (permission: string): RequestHandler => (req, res, next) => { if (req.auth?.permissions.includes("*") || req.auth?.permissions.includes(permission)) return next(); return fail(res, "Insufficient permissions", 403); };
