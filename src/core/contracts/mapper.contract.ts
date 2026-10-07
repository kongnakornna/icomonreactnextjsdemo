export interface Mapper<TEntity, TDto> {
  toEntity(dto: TDto): TEntity;
  toDto(entity: TEntity): TDto;
}

export interface RequestMapper<TRequest, TEntity> {
  toEntity(request: TRequest): TEntity;
}

export interface ResponseMapper<TEntity, TResponse> {
  toResponse(entity: TEntity): TResponse;
}
