import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';

@Injectable()
export class RateLimiterService {
  private readonly limit: number = 10;
  private readonly ttl: number = 60;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {}

  async isAllowed(ip: string): Promise<boolean> {
    const requests = await this.cacheManager.get<number>(ip);

    console.log(Number(process.env.CACHE_TTL));
    if (!requests) {
      await this.cacheManager.set(ip, 1, Number(process.env.CACHE_TTL));
      return true;
    }

    if (requests >= this.limit) {
      return false;
    }

    await this.cacheManager.set(
      ip,
      requests + 1,
      Number(process.env.CACHE_TTL),
    );
    return true;
  }
}
