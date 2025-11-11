
export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  logo: string;
  foundedYear: number;
}

export interface FilterOptions {
  name: string;
  industry: string;
  location: string;
}

export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  key: keyof Pick<Company, 'name' | 'foundedYear'>;
  order: SortOrder;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
