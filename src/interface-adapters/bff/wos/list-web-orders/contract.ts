import type { WebOrder } from '@/src/entities/models/web-order';
import type { InputParseError, UnknownError } from '@/src/entities/errors/common';

export type ListWebOrdersBffInput = {
  search?: string;
  page?: number;
  pageSize?: number;
  status?: string;
};

export type ListWebOrdersBffOutput =
  | { status: 'success'; data: WebOrder[]; total: number }
  | { status: 'failure'; code: 'invalid_data' | 'unknown_error' };

export type IListWebOrdersBffController = () => Promise<ListWebOrdersBffOutput>;
export type IListWebOrdersBffPresenter = (output: { data: WebOrder[]; total: number } | InputParseError | UnknownError) => Promise<ListWebOrdersBffOutput>;

export type IListWebOrdersBffUseCase = (
  input: ListWebOrdersBffInput
) => Promise<ListWebOrdersBffOutput>;
