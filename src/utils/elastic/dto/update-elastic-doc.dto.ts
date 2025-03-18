export interface UpdateElasticDocDto<T> {
  id: string;
  index: string;
  body: T;
}
