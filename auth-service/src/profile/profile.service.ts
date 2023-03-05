import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from '../database/entities/profile.entity';
import { RpcException } from '@nestjs/microservices';
import { InputRegisterUserRequest } from '../interfaces/user';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: EntityRepository<Profile>,
  ) {}

  async create(
    userId: number,
    createInput: InputRegisterUserRequest,
  ): Promise<Profile> {
    const currentProfile = await this.profileRepository.findOne({ userId });

    if (currentProfile) {
      throw new RpcException({
        message: 'The profile is existed',
        code: HttpStatus.BAD_GATEWAY,
      });
    }

    const profile = new Profile();
    profile.address = createInput.merchantAddress;
    profile.cityCode = createInput.cityCode;
    profile.userId = userId;
    profile.fullName = createInput.fullName;
    profile.phone = createInput.phone;

    const newProfile = this.profileRepository.create(profile);
    await this.profileRepository.persistAndFlush(newProfile);

    return newProfile;
  }
}
