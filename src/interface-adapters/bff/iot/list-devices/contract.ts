import type { Device } from '@/src/entities/models/device';
import type { InputParseError, UnknownError } from '@/src/entities/errors/common';

export type ListDevicesBffInput = {
  search?: string;
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
};

export type ListDevicesBffOutput =
  | { status: 'success'; data: Device[]; total: number }
  | { status: 'failure'; code: 'invalid_data' | 'unknown_error' };

export type IListDevicesBffController = () => Promise<ListDevicesBffOutput>;
export type IListDevicesBffPresenter = (output: { data: Device[]; total: number } | InputParseError | UnknownError) => Promise<ListDevicesBffOutput>;

export type IListDevicesBffUseCase = (
  input: ListDevicesBffInput
) => Promise<ListDevicesBffOutput>;
