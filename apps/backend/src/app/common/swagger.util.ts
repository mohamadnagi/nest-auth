import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DynamicSwagger(
  options: { tag?: string; description?: string } = {},
) {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) {
    if (!descriptor) {
      // Decorator applied to a class (controller level)
      applyDecorators(
        ApiTags(options.tag || 'Default'), // Apply the tag to the whole controller
      )(target);
    } else {
      // Decorator applied to a method (route level)
      applyDecorators(
        ApiOperation({
          summary: options.description || 'No description provided',
        }),
        ApiResponse({ status: 200, description: 'Successful response' }),
        ApiResponse({ status: 400, description: 'Bad Request' }),
        ApiResponse({ status: 500, description: 'Internal Server Error' }),
      )(target, propertyKey, descriptor);
    }
  };
}
