import { Module } from '@nestjs/common';
import { GenericService } from './generic-service';

@Module({
  controllers: [],
  providers: [GenericService],
  imports: [],
})
export class SharedModule {}
