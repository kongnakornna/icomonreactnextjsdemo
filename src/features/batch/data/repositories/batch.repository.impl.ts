import { IBatchRepository } from '../../domain/repositories/batch.repository';
import { BatchJob, BatchJobHistory } from '../../domain/entities/batch-job.entity';
import { BatchApiDataSource } from '../datasources/batch.api.datasource';
import { BatchJobResponseDto, BatchJobHistoryResponseDto, CreateBatchJobRequestDto } from '../dtos/batch.dto';

export class BatchRepositoryImpl implements IBatchRepository {
  constructor(private ds: BatchApiDataSource) {}

  async list(): Promise<BatchJob[]> {
    const dtos = await this.ds.list();
    return dtos.map((d) => this.toJobEntity(d));
  }

  async getById(id: string): Promise<BatchJob | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toJobEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(job: Partial<BatchJob>): Promise<BatchJob> {
    const dto = await this.ds.create(job as CreateBatchJobRequestDto);
    return this.toJobEntity(dto);
  }

  async trigger(id: string): Promise<void> {
    await this.ds.trigger(id);
  }

  async getHistory(id: string): Promise<BatchJobHistory[]> {
    const dtos = await this.ds.getHistory(id);
    return dtos.map((d) => this.toHistoryEntity(d));
  }

  private toJobEntity(d: BatchJobResponseDto): BatchJob {
    return {
      id: d.id,
      name: d.name,
      description: d.description,
      cronExpression: d.cronExpression,
      status: d.status,
      lastRun: d.lastRun ? new Date(d.lastRun) : undefined,
      nextRun: d.nextRun ? new Date(d.nextRun) : undefined,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }

  private toHistoryEntity(d: BatchJobHistoryResponseDto): BatchJobHistory {
    return {
      id: d.id,
      jobId: d.jobId,
      status: d.status,
      startedAt: new Date(d.startedAt),
      completedAt: d.completedAt ? new Date(d.completedAt) : undefined,
      error: d.error,
      result: d.result,
    };
  }
}
