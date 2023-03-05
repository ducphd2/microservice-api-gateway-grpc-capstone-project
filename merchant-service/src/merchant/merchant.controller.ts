import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Merchant } from '../entities/cv.entity';
import { InputCvIdRequest } from '../types/inputCvIdRequest';
import { MerchantService } from './merchant.service';

@Controller()
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  @GrpcMethod('CvServiceGrpc', 'getCv')
  async getCv(data: InputCvIdRequest): Promise<{ cv: Merchant }> {
    return {
      cv: await this.merchantService.findCvById(data.cvId),
    };
  }
}
