export interface BatchJobResponseDto {
  id: string;
  name: string;
  description: string;
  cronExpression: string;
  status: 'active' | 'inactive' | 'running';
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BatchJobHistoryResponseDto {
  id: string;
  jobId: string;
  status: 'success' | 'failed' | 'running';
  startedAt: string;
  completedAt?: string;
  error?: string;
  result?: string;
}

export interface CreateBatchJobRequestDto {
  name: string;
  description: string;
  cronExpression: string;
  status: 'active' | 'inactive';
}
