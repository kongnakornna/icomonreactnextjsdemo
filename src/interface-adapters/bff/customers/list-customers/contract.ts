import type { Customer } from '@/src/entities/models/customer';
import type { InputParseError, UnknownError, NotFoundError } from '@/src/entities/errors/common';

export type ListCustomersBffInput = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type ListCustomersBffOutput =
  | { status: 'success'; data: Customer[]; total: number }
  | { status: 'failure'; code: 'invalid_data' | 'unknown_error' };

export type IListCustomersBffController = () => Promise<ListCustomersBffOutput>;
export type IListCustomersBffPresenter = (output: { data: Customer[]; total: number } | InputParseError | UnknownError) => Promise<ListCustomersBffOutput>;

export type IListCustomersBffUseCase = (
  input: ListCustomersBffInput
) => Promise<ListCustomersBffOutput>;
