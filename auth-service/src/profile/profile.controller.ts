import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private profileService: ProfileService) {}
}
