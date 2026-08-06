import type { Response } from "express";
export const ok = <T>(res: Response, data: T, message = "Success", status = 200) => res.status(status).json({ success: true, message, data });
export const fail = (res: Response, message: string, status = 400, errors?: unknown) => res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
