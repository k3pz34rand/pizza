type SortName =
  | 'популярности'
  | 'цене (по уб.)'
  | 'цене (по возр.)'
  | 'алфавиту (сначала)'
  | 'алфавиту (с конца)';
type SortValue = 'raiting' | 'price' | 'title';
type SortOrder = 'desc' | 'asc';
export type SortInterface = { name: SortName; value: SortValue; order: SortOrder };
export interface SearchSliceInterface {
  search: string;
  category: number;
  sortParams: SortInterface;
  page: number;
  limit: number;
}
export interface IntiParams {
  order?: SortOrder;
  sortBy?: SortValue;
  category?: number;
  search?: string;
  page?: number;
}
