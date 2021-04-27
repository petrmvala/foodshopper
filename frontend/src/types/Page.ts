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

export function emptyPage<T>(): Page<T> {
  return {
    content: [],
    empty: false,
    first: true,
    last: false,
    number: 0,
    numberOfElements: 1,
    page: 0,
    size: 1,
    totalElements: 1,
    totalPages: 1
  };
}
