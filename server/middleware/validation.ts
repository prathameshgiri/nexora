import type { RequestHandler } from "express";
import { z } from "zod";
import { fail } from "../utils/api";
export const validate = (schema: z.ZodType): RequestHandler => (req, res, next) => { const result = schema.safeParse(req.body); if (!result.success) return fail(res, "Validation failed", 422, result.error.flatten()); req.body = result.data; next(); };
export const idSchema = z.object({ id: z.string().min(1) });
