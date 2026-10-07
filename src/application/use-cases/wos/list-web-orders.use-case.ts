import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { WebOrder } from '@/src/entities/models/web-order';
import type { IWebOrdersRepository } from '@/src/application/repositories/web-orders.repository.interface';

export type ListWebOrdersInputData = {
  search?: string;
  page?: number;
  pageSize?: number;
  status?: string;
};

export type ListWebOrdersOutputData = { data: WebOrder[]; total: number } | InputParseError | UnknownError;

export type IListWebOrdersUseCase<VM> = (input: ListWebOrdersInputData) => Promise<VM>;

export type IListWebOrdersPresenter<VM> = (output: ListWebOrdersOutputData) => Promise<VM>;

const inputSchema = z.object({
  search: z.string().optional(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
  status: z.string().optional(),
});

export const listWebOrdersUseCase =
  <VM>(
    webOrdersRepository: IWebOrdersRepository,
    presenter: IListWebOrdersPresenter<VM>
  ): IListWebOrdersUseCase<VM> =>
  async (input: ListWebOrdersInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const result = await webOrdersRepository.list({
        search: data.search,
        page: data.page,
        pageSize: data.pageSize,
        status: data.status,
      });

      return presenter(result);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
