import type { Customer } from '@/src/entities/models/customer';
import type { InputParseError, UnknownError } from '@/src/entities/errors/common';

export type CreateCustomerBffInput = {
  companyName: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
};

export type CreateCustomerBffOutput =
  | { status: 'success'; data: Customer }
  | { status: 'failure'; code: 'invalid_data' | 'unknown_error' };

export type ICreateCustomerBffController = () => Promise<CreateCustomerBffOutput>;
export type ICreateCustomerBffPresenter = (output: Customer | InputParseError | UnknownError) => Promise<CreateCustomerBffOutput>;

export type ICreateCustomerBffUseCase = (
  input: CreateCustomerBffInput
) => Promise<CreateCustomerBffOutput>;
