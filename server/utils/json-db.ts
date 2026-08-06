import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { config } from "../config";

const locks = new Map<string, Promise<void>>();
const fileFor = (name: string) => path.join(config.databaseDir, `${name}.json`);
async function withLock<T>(file: string, work: () => Promise<T>): Promise<T> { const previous = locks.get(file) ?? Promise.resolve(); let release!: () => void; const current = new Promise<void>(resolve => { release = resolve; }); locks.set(file, previous.then(() => current)); await previous; try { return await work(); } finally { release(); if (locks.get(file) === current) locks.delete(file); } }
export async function ensureDatabase() { await fs.mkdir(config.databaseDir, { recursive: true }); for (const name of ["users", "roles", "permissions", "salary-slips", "salary", "income", "expenses", "categories", "budgets", "savings", "goals", "loans", "investments", "taxes", "notifications", "support-tickets", "audit-logs", "admin-settings", "refresh-tokens"]) { const file = fileFor(name); try { await fs.access(file); } catch { await fs.writeFile(file, "[]\n", "utf8"); } } }
export async function readDb<T>(name: string): Promise<T[]> { await ensureDatabase(); try { return JSON.parse(await fs.readFile(fileFor(name), "utf8")) as T[]; } catch { return []; } }
export async function writeDb<T>(name: string, records: T[]) { const file = fileFor(name); return withLock(file, async () => { const temp = `${file}.${process.pid}.tmp`; await fs.writeFile(temp, `${JSON.stringify(records, null, 2)}\n`, "utf8"); await fs.rename(temp, file); }); }
export async function insert<T extends { id?: string }>(name: string, record: Omit<T, "id"> & { id?: string }): Promise<T & { id: string }> { const records = await readDb<T>(name); const saved = { ...record, id: record.id ?? randomUUID() } as T & { id: string }; records.push(saved); await writeDb(name, records); return saved; }
export async function update<T extends { id: string }>(name: string, id: string, changes: Partial<T>): Promise<T | null> { const records = await readDb<T>(name); const index = records.findIndex(r => r.id === id); if (index < 0) return null; records[index] = { ...records[index], ...changes }; await writeDb(name, records); return records[index]; }
export async function remove<T extends { id: string }>(name: string, id: string) { const records = await readDb<T>(name); const next = records.filter(r => r.id !== id); if (next.length === records.length) return false; await writeDb(name, next); return true; }
export function paginate<T>(records: T[], page = 1, limit = 20) { const safePage = Math.max(1, page); const safeLimit = Math.min(100, Math.max(1, limit)); const start = (safePage - 1) * safeLimit; return { data: records.slice(start, start + safeLimit), pagination: { page: safePage, limit: safeLimit, total: records.length, totalPages: Math.ceil(records.length / safeLimit) } }; }
export { fileFor };
