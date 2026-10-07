import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { Customer } from '@/src/entities/models/customer';
import type { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';

export type ListCustomersInputData = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type ListCustomersOutputData = { data: Customer[]; total: number } | InputParseError | UnknownError;

export type IListCustomersUseCase<VM> = (input: ListCustomersInputData) => Promise<VM>;

export type IListCustomersPresenter<VM> = (output: ListCustomersOutputData) => Promise<VM>;

const inputSchema = z.object({
  search: z.string().optional(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
});

export const listCustomersUseCase =
  <VM>(
    customersRepository: ICustomersRepository,
    presenter: IListCustomersPresenter<VM>
  ): IListCustomersUseCase<VM> =>
  async (input: ListCustomersInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const result = await customersRepository.list({
        search: data.search,
        page: data.page,
        pageSize: data.pageSize,
      });

      return presenter(result);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
