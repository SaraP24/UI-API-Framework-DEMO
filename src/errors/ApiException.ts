/**
 * Custom exception for API client errors
 * Captures full context: method, endpoint, status, request/response data
 */
export class ApiException extends Error {
  constructor(
    public readonly method: string,
    public readonly endpoint: string,
    public readonly statusCode: number,
    public readonly requestData?: any,
    public readonly responseData?: any,
    message?: string
  ) {
    super(
      message ||
      `${method.toUpperCase()} ${endpoint} failed with status ${statusCode}`
    );
    this.name = 'ApiException';
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Format exception details for logging
   */
  toString(): string {
    return `
[${this.name}]
  Method: ${this.method.toUpperCase()}
  Endpoint: ${this.endpoint}
  Status: ${this.statusCode}
  Request: ${this.requestData ? JSON.stringify(this.requestData, null, 2) : 'N/A'}
  Response: ${this.responseData ? JSON.stringify(this.responseData, null, 2) : 'N/A'}
  Message: ${this.message}
    `.trim();
  }

  /**
   * Get simplified error message for display
   */
  getSimpleMessage(): string {
    return `${this.method.toUpperCase()} ${this.endpoint} (${this.statusCode}): ${this.message}`;
  }
}

/**
 * Custom exception for assertion failures
 * Captures expected vs actual values
 */
export class AssertionException extends Error {
  constructor(
    message: string,
    public readonly expected: any,
    public readonly actual: any,
    public readonly context?: string
  ) {
    super(message);
    this.name = 'AssertionException';
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Format assertion details for logging
   */
  toString(): string {
    return `
[${this.name}]
  Message: ${this.message}
  Context: ${this.context || 'N/A'}
  Expected: ${JSON.stringify(this.expected, null, 2)}
  Actual: ${JSON.stringify(this.actual, null, 2)}
    `.trim();
  }
}

/**
 * Custom exception for test data issues
 * Used in builders and factories
 */
export class TestDataException extends Error {
  constructor(
    message: string,
    public readonly dataType?: string,
    public readonly details?: any
  ) {
    super(`[TEST DATA ERROR] ${message}`);
    this.name = 'TestDataException';
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Format test data error details for logging
   */
  toString(): string {
    return `
[${this.name}]
  Type: ${this.dataType || 'Unknown'}
  Message: ${this.message}
  Details: ${this.details ? JSON.stringify(this.details, null, 2) : 'N/A'}
    `.trim();
  }
}

/**
 * Custom exception for configuration issues
 */
export class ConfigurationException extends Error {
  constructor(message: string, public readonly configKey?: string) {
    super(`[CONFIGURATION ERROR] ${message}`);
    this.name = 'ConfigurationException';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Custom exception for timeout issues
 */
export class TimeoutException extends Error {
  constructor(
    message: string,
    public readonly timeoutMs: number,
    public readonly operation?: string
  ) {
    super(`[TIMEOUT ERROR] ${message} (${timeoutMs}ms)`);
    this.name = 'TimeoutException';
    Error.captureStackTrace(this, this.constructor);
  }
}
