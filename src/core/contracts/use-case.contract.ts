export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

export interface UseCaseWithoutInput<TOutput> {
  execute(): Promise<TOutput>;
}
