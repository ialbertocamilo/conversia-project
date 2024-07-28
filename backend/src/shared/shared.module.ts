import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user-schema';
import { RateLimiterService } from './service/rate-limiter.service';
import { RateLimiterGuard } from './rate-limiter.guard';

@Module({
  controllers: [],
  providers: [RateLimiterService, RateLimiterGuard],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [RateLimiterGuard, RateLimiterService],
})
export class SharedModule {}
