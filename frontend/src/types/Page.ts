export interface Page<T> {
  size: number;
  page: number;
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
