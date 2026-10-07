export interface JobCardResponseDto {
  id: string;
  title: string;
  description: string;
  status: string;
  assigneeId: string | null;
  priority: string;
  dueDate: string | null;
}

export interface CreateJobCardRequestDto {
  title: string;
  description: string;
  priority: string;
  assigneeId?: string;
  dueDate?: string;
}
