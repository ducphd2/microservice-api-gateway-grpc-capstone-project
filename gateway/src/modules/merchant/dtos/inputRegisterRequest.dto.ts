import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function Match<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName} exactly`;
        },
      },
    });
  };
}

@InputType()
export class InputRegisterRequest {
  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @Match('password')
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  merchantPhone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  merchantName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  merchantAddress: string;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  cityCode: number;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  districtCode: number;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  wardCode: number;

  @Field()
  @Matches(/^[a-zA-Z0-9\-]+$/)
  @IsString()
  @IsNotEmpty()
  merchantSubdomain: string;
}
