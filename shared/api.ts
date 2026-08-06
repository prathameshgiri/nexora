export interface DemoResponse { message: string; }
export interface ApiResponse<T = unknown> { success: boolean; message: string; data?: T; errors?: unknown; pagination?: { page: number; limit: number; total: number; totalPages: number }; }
export interface AuthUser { id: string; email: string; fullName: string; role: string; permissions: string[]; }
