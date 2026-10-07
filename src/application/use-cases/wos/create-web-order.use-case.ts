import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { WebOrder } from '@/src/entities/models/web-order';
import type { IWebOrdersRepository } from '@/src/application/repositories/web-orders.repository.interface';

export type CreateWebOrderInputData = {
  customerId: string;
  customerName: string;
  notes?: string;
  dueDate?: Date;
};

export type CreateWebOrderOutputData = WebOrder | InputParseError | UnknownError;

export type ICreateWebOrderUseCase<VM> = (input: CreateWebOrderInputData) => Promise<VM>;

export type ICreateWebOrderPresenter<VM> = (output: CreateWebOrderOutputData) => Promise<VM>;

const inputSchema = z.object({
  customerId: z.string().min(1),
  customerName: z.string().min(1),
  notes: z.string().optional(),
  dueDate: z.date().optional(),
});

export const createWebOrderUseCase =
  <VM>(
    webOrdersRepository: IWebOrdersRepository,
    presenter: ICreateWebOrderPresenter<VM>
  ): ICreateWebOrderUseCase<VM> =>
  async (input: CreateWebOrderInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const order = await webOrdersRepository.create({
        customerId: data.customerId,
        customerName: data.customerName,
        status: 'pending',
        totalAmount: 0,
        notes: data.notes,
        dueDate: data.dueDate,
      });

      return presenter(order);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
