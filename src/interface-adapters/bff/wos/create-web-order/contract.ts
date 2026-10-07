import type { WebOrder } from '@/src/entities/models/web-order';
import type { InputParseError, UnknownError } from '@/src/entities/errors/common';

export type CreateWebOrderBffInput = {
  customerId: string;
  customerName: string;
  notes?: string;
  dueDate?: Date;
};

export type CreateWebOrderBffOutput =
  | { status: 'success'; data: WebOrder }
  | { status: 'failure'; code: 'invalid_data' | 'unknown_error' };

export type ICreateWebOrderBffController = () => Promise<CreateWebOrderBffOutput>;
export type ICreateWebOrderBffPresenter = (output: WebOrder | InputParseError | UnknownError) => Promise<CreateWebOrderBffOutput>;

export type ICreateWebOrderBffUseCase = (
  input: CreateWebOrderBffInput
) => Promise<CreateWebOrderBffOutput>;
