import * as paginate from 'sequelize-cursor-pagination';
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { BranchServiceGroups } from './branch-service-group.model';
import { MerchantBranch } from './merchant-branch.model';
import { Merchant } from './merchant.model';

@Table({
  modelName: 'branch_service',
  tableName: 'branch_services',
  underscored: true,
  indexes: [
    {
      name: 'ts_vector_index',
      fields: ['tsv'],
      type: 'FULLTEXT',
    },
  ],
})
export class BranchServices extends BaseModel<BranchServices> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.FLOAT,
  })
  capitalPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationHour: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationMinute: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  canEditPriceInPay: boolean;

  @Column({
    type: DataType.TEXT,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  showType: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  canPrintHouseInInvoice: boolean;

  @Column({
    type: 'tsvector',
  })
  tsv: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => BranchServiceGroups)
  serviceGroupId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Merchant)
  merchantId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => MerchantBranch)
  branchId: number;

  @BelongsTo(() => BranchServiceGroups)
  branchServiceGroup: BranchServiceGroups;

  @BelongsTo(() => MerchantBranch)
  branch: MerchantBranch;

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @BeforeSave
  static async updateTsv(service: BranchServices) {
    const columnsToConcatenate = ['description', 'name', 'price', 'capitalPrice', 'code'];
    const concatenatedValues = columnsToConcatenate.map((columnName) => service.get(columnName)).join(' ');

    service.setDataValue('tsv', concatenatedValues.concat(' ', toUFT8NonSpecialCharacters(concatenatedValues)));
  }
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BranchServices);

function toUFT8NonSpecialCharacters(str: string): string {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A');
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}
