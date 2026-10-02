// ═══════════════════════════════════════════
// ANATHEA — Custom Error Classes
// ═══════════════════════════════════════════

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Solicitud inválida', details?: unknown) {
    super(message, 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado. Se requiere autenticación válida') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso denegado. Permisos insuficientes') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflicto con recurso existente') {
    super(message, 409);
  }
}
