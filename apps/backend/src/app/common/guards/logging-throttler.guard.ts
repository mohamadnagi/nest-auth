import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class LoggingThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(LoggingThrottlerGuard.name);

  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;
    const userAgent = request.headers['user-agent'] || 'unknown device';
    const path = request.url;

    this.logger.warn(
      `Rate limit exceeded: IP=${ip}, Path=${path}, Device=${userAgent}`,
    );

    await super.throwThrottlingException(context, throttlerLimitDetail);
  }
}
