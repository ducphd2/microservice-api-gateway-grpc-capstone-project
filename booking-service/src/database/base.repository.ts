import {
  Attributes,
  CountOptions,
  CreateOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';

import { FIRST_PAGE, LIMIT_PAGE } from '../constants';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IPaginationRes } from '../interfaces';

export class BaseRepository<T extends Model> {
  constructor(readonly model: Repository<T>) {}

  async find(options?: FindOptions<T>): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findOne(options?: FindOptions<T>): Promise<T> {
    return await this.model.findOne(options);
  }

  async findById(id: number, options?: FindOptions<T>): Promise<T> {
    return await this.model.findByPk(id, options);
  }

  async paginate(
    options?: WhereOptions<T>,
    page = FIRST_PAGE,
    limit = LIMIT_PAGE,
    opts?: FindOptions<T>,
  ): Promise<IPaginationRes<T>> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.rawPaginate({
      where: { ...options },
      offset,
      limit,
      ...opts,
    });

    return {
      items: rows,
      total: count,
      page,
      limit,
    } as IPaginationRes<T>;
  }

  async rawPaginate(options: FindAndCountOptions): Promise<{
    rows: T[];
    count: number;
  }> {
    return await this.model.findAndCountAll(options);
  }

  async create(entity: Attributes<T>, opts: CreateOptions): Promise<T> {
    const res = await this.model.create(entity, opts);
    return res.toJSON();
  }

  async update(entity: Attributes<T>, opts: UpdateOptions) {
    const [affectedCount, affectedRows] = await this.model.update(entity, {
      ...opts,
      returning: true,
    });
    return affectedRows;
  }

  async delete(conditions: FindOptions<T>): Promise<number> {
    return await this.model.destroy(conditions);
  }

  async raw(query: string) {
    return await this.model.sequelize.query(query);
  }

  getModel(): Repository<T> {
    return this.model;
  }

  async findAndPaginate(query?: IFindAndPaginateOptions, opts?: FindOptions<T>): Promise<IFindAndPaginateResult<T>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<T> = await this.model.findAndPaginate({
      ...query,
      ...opts,
    });

    return result;
  }

  async count(options?: CountOptions): Promise<number> {
    const result: number = await this.model.count(options);
    return result;
  }
}
