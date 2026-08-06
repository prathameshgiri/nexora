import "dotenv/config";
import path from "node:path";
export const config = { port: Number(process.env.PORT ?? 8080), jwtSecret: process.env.JWT_SECRET ?? "development-only-change-me", refreshSecret: process.env.JWT_REFRESH_SECRET ?? "development-only-refresh-change-me", clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:8080", uploadMaxBytes: Number(process.env.UPLOAD_MAX_BYTES ?? 10485760), databaseDir: path.resolve(process.cwd(), "server/database"), uploadDir: path.resolve(process.cwd(), "server/uploads") };
