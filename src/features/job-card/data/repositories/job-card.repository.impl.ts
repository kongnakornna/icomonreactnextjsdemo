import { IJobCardRepository } from '../../domain/repositories/job-card.repository';
import { JobCard, JobCardStatus } from '../../domain/entities/job-card.entity';
import { JobCardApiDataSource } from '../datasources/job-card.api.datasource';
import { JobCardResponseDto } from '../dtos/job-card.dto';

export class JobCardRepositoryImpl implements IJobCardRepository {
  constructor(private ds: JobCardApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; status?: string; priority?: string }): Promise<{ data: JobCard[]; total: number }> {
    const result = await this.ds.list(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<JobCard | undefined> {
    try {
      const dto = await this.ds.getById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(job: Partial<JobCard>): Promise<JobCard> {
    const dto = await this.ds.create({
      title: job.title ?? '',
      description: job.description ?? '',
      priority: job.priority ?? 'medium',
      assigneeId: job.assigneeId ?? undefined,
      dueDate: job.dueDate ? new Date(job.dueDate).toISOString() : undefined,
    });
    return this.toEntity(dto);
  }

  async update(id: string, job: Partial<JobCard>): Promise<JobCard> {
    const dto = await this.ds.update(id, job as Partial<JobCardResponseDto>);
    return this.toEntity(dto);
  }

  async updateStatus(id: string, status: JobCardStatus): Promise<JobCard> {
    const dto = await this.ds.updateStatus(id, status);
    return this.toEntity(dto);
  }

  async assign(id: string, assigneeId: string): Promise<JobCard> {
    const dto = await this.ds.assign(id, assigneeId);
    return this.toEntity(dto);
  }

  private toEntity(d: JobCardResponseDto): JobCard {
    return {
      id: d.id,
      title: d.title,
      description: d.description,
      status: d.status as JobCard['status'],
      assigneeId: d.assigneeId,
      priority: d.priority as JobCard['priority'],
      dueDate: d.dueDate ? new Date(d.dueDate) : null,
    };
  }
}
