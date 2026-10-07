import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import type { Device } from '@/src/entities/models/device';
import type { IDevicesRepository } from '@/src/application/repositories/devices.repository.interface';

export type ListDevicesInputData = {
  search?: string;
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
};

export type ListDevicesOutputData = { data: Device[]; total: number } | InputParseError | UnknownError;

export type IListDevicesUseCase<VM> = (input: ListDevicesInputData) => Promise<VM>;

export type IListDevicesPresenter<VM> = (output: ListDevicesOutputData) => Promise<VM>;

const inputSchema = z.object({
  search: z.string().optional(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
});

export const listDevicesUseCase =
  <VM>(
    devicesRepository: IDevicesRepository,
    presenter: IListDevicesPresenter<VM>
  ): IListDevicesUseCase<VM> =>
  async (input: ListDevicesInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const result = await devicesRepository.list({
        search: data.search,
        page: data.page,
        pageSize: data.pageSize,
        type: data.type,
        status: data.status,
      });

      return presenter(result);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
