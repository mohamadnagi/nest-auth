import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseService {
  // Generic success response
  success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  // Paginated response
  paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success',
  ): ApiResponse<T[]> {
    return {
      success: true,
      message,
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  // Generic error response
  error(message: any, statusCode: number, errorDetails?: any): any {
    return {
      success: false,
      message,
      statusCode,
      error: errorDetails || null, // Optional additional error details
    };
  }
}
