import { JobCard, JobCardStatus } from '../entities/job-card.entity';

export interface IJobCardRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; status?: string; priority?: string }): Promise<{ data: JobCard[]; total: number }>;
  getById(id: string): Promise<JobCard | undefined>;
  create(job: Partial<JobCard>): Promise<JobCard>;
  update(id: string, job: Partial<JobCard>): Promise<JobCard>;
  updateStatus(id: string, status: JobCardStatus): Promise<JobCard>;
  assign(id: string, assigneeId: string): Promise<JobCard>;
}
