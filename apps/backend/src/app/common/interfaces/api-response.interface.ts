export interface ApiResponse<T> {
  success: boolean; // Indicates the success of the API call
  message?: string; // Optional message for additional information
  data?: T; // The main data of the response
  meta?: {
    total?: number; // Total records (for pagination)
    page?: number; // Current page (for pagination)
    limit?: number; // Items per page (for pagination)
  };
}
