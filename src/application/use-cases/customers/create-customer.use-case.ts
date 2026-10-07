import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { Customer } from '@/src/entities/models/customer';
import type { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';

export type CreateCustomerInputData = {
  companyName: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
};

export type CreateCustomerOutputData = Customer | InputParseError | UnknownError;

export type ICreateCustomerUseCase<VM> = (input: CreateCustomerInputData) => Promise<VM>;

export type ICreateCustomerPresenter<VM> = (output: CreateCustomerOutputData) => Promise<VM>;

const inputSchema = z.object({
  companyName: z.string().min(1),
  taxId: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export const createCustomerUseCase =
  <VM>(
    customersRepository: ICustomersRepository,
    presenter: ICreateCustomerPresenter<VM>
  ): ICreateCustomerUseCase<VM> =>
  async (input: CreateCustomerInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const customer = await customersRepository.create({
        companyName: data.companyName,
        taxId: data.taxId,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email,
      });

      return presenter(customer);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
