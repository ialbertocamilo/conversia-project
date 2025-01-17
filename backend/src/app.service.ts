import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthcheck(): string {
    return `Healthcheck ${Date.now()}`;
  }
}
