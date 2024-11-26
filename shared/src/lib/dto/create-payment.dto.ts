import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsUUID()
  @IsOptional()
  'x-idempotency-key'?: string;

  @IsString()
  @IsOptional()
  'client-id'?: string;
}