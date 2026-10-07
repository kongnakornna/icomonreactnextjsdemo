import { z } from 'zod';
import { InputParseError, NotFoundError, UnknownError } from '@/src/entities/errors/common';
import type { Customer } from '@/src/entities/models/customer';
import type { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';

export type GetCustomerInputData = { id: string };

export type GetCustomerOutputData = Customer | InputParseError | NotFoundError | UnknownError;

export type IGetCustomerUseCase<VM> = (input: GetCustomerInputData) => Promise<VM>;

export type IGetCustomerPresenter<VM> = (output: GetCustomerOutputData) => Promise<VM>;

const inputSchema = z.object({
  id: z.string().min(1),
});

export const getCustomerUseCase =
  <VM>(
    customersRepository: ICustomersRepository,
    presenter: IGetCustomerPresenter<VM>
  ): IGetCustomerUseCase<VM> =>
  async (input: GetCustomerInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const customer = await customersRepository.getById(data.id);
      if (!customer) {
        return presenter(new NotFoundError('Customer not found'));
      }

      return presenter(customer);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
