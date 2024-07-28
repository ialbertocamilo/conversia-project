import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RateLimiterService } from './service/rate-limiter.service';

@Injectable()
export class RateLimiterGuard implements CanActivate {
  constructor(
    @Inject(RateLimiterService)
    private readonly rateLimiterService: RateLimiterService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    const isAllowed = await this.rateLimiterService.isAllowed(ip);
    if (!isAllowed) {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
