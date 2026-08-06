import { insert } from "../utils/json-db";
export const audit = (action: string, userId: string | undefined, metadata: Record<string, unknown> = {}) => insert<Record<string, unknown>>("audit-logs", { action, userId: userId ?? "anonymous", metadata, createdAt: new Date().toISOString() });
