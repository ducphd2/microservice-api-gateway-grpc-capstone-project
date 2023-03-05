import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [MikroOrmModule.forFeature([User]), ProfileModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
