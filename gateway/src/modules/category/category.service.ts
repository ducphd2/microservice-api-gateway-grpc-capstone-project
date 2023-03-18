import { Inject, Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Category } from '../../types';
import { CategoryDto, UploadInputArgs } from './dtos';
import {
  DeleteCategoryPayload,
  FindAllCategories,
  MerchantCategoryServiceGrpc,
} from './interfaces/merchant-branch-service-grpc';
import { UploadService } from '../upload/upload.service';
import { isEmpty } from 'lodash';

@Injectable()
export class MerchantCategoryService {
  private merchantCategoryServiceGrpc: MerchantCategoryServiceGrpc;

  constructor(
    @Inject('MERCHANT_CATEGORY_PACKAGE') private client: ClientGrpc,
    private readonly uploadService: UploadService,
  ) {}

  onModuleInit() {
    this.merchantCategoryServiceGrpc =
      this.client.getService<MerchantCategoryServiceGrpc>('MerchantCategoryServiceGrpc');
  }

  async create(data: UploadInputArgs): Promise<Category> {
    let uploadRes: any = {};
    if (data.file) {
      uploadRes = await this.uploadService.uploadSingleToCloudinaryGraphql({ file: data.file, folder: data?.folder });
    }
    const response = await lastValueFrom(
      this.merchantCategoryServiceGrpc.create({ ...data.data, imageUrl: uploadRes?.url }),
    );
    return {
      ...response.category,
      image: response?.image,
    };
  }

  async find(): Promise<FindAllCategories> {
    const branches = await lastValueFrom(this.merchantCategoryServiceGrpc.find({ limit: 10 }));
    return branches;
  }

  async findById(@Args('id') id: number): Promise<Category> {
    const branch = await lastValueFrom(this.merchantCategoryServiceGrpc.findById({ id }));
    return branch;
  }

  async update(id: number, data: CategoryDto): Promise<Category> {
    const branch = await lastValueFrom(this.merchantCategoryServiceGrpc.update({ id, data }));
    return branch;
  }

  async delete(@Args('id') id: number): Promise<DeleteCategoryPayload> {
    const count = await lastValueFrom(this.merchantCategoryServiceGrpc.delete({ id }));
    return count;
  }
}
