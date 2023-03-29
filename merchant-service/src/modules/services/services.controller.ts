import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import Aigle from 'aigle';
import { isEmpty, isNil } from 'lodash';
import { Service } from '../../database/entities';
import { EGrpcClientService } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { ICreateBranchServicesInput, IUpdateBranchServicesInput } from '../../interfaces/services';
import { ServicesService } from './services.services';
const { map } = Aigle;

@Controller()
export class BranchServicesController {
  constructor(private branchServicesService: ServicesService) {}

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'find')
  async find(query: IQuery): Promise<IFindPayload<Service>> {
    const { results, cursors } = await this.branchServicesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Service> = {
      edges: await map(results, async (group: Service) => ({
        node: group,
        cursor: Buffer.from(JSON.stringify([group.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'findAll')
  async findAll() {
    return this.branchServicesService.findAll();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'create')
  async create(data: ICreateBranchServicesInput) {
    const result = await this.branchServicesService.create(data);
    return result.toJSON();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'findById')
  async findById({ id }: IId) {
    const result = await this.branchServicesService.findById(id);

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException('Branch service group not found');
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'update')
  async update({ id, data }: IUpdateBranchServicesInput) {
    const result = await this.branchServicesService.updateBranchServiceGroup(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GRPC, 'destroy')
  async destroy({ id }: IId): Promise<ICount> {
    const count = await this.branchServicesService.destroy(id);
    return { count };
  }
}
