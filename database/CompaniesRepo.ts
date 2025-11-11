import type { Company, FilterOptions, SortOptions, PaginationOptions } from '../types';

class CompaniesRepo {
  private companiesPromise: Promise<Company[]>;

  constructor() {
    this.companiesPromise = fetch('./database/companies.json').then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
  }

  private async getCompaniesData(): Promise<Company[]> {
    return this.companiesPromise;
  }

  public async getCompanies(options: {
    filters: FilterOptions;
    sort: SortOptions;
    pagination: PaginationOptions;
  }): Promise<{ data: Company[]; total: number }> {
    const companies = await this.getCompaniesData();
    const { filters, sort, pagination } = options;
    let filteredCompanies = [...companies];

    // Filtering
    if (filters.name) {
      filteredCompanies = filteredCompanies.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.industry) {
      filteredCompanies = filteredCompanies.filter(
        (c) => c.industry === filters.industry
      );
    }
    if (filters.location) {
      filteredCompanies = filteredCompanies.filter(
        (c) => c.location === filters.location
      );
    }

    // Sorting
    filteredCompanies.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];
      
      if (aValue < bValue) {
        return sort.order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    const total = filteredCompanies.length;

    // Pagination
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    const paginatedData = filteredCompanies.slice(start, end);

    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));

    return { data: paginatedData, total };
  }

  public async getUniqueIndustries(): Promise<string[]> {
    const companies = await this.getCompaniesData();
    await new Promise(res => setTimeout(res, 100)); // Simulate delay
    const industries = new Set(companies.map((c) => c.industry));
    return Array.from(industries).sort();
  }

  public async getUniqueLocations(): Promise<string[]> {
    const companies = await this.getCompaniesData();
    await new Promise(res => setTimeout(res, 100)); // Simulate delay
    const locations = new Set(companies.map((c) => c.location));
    return Array.from(locations).sort();
  }
}

const companiesRepo = new CompaniesRepo();
export default companiesRepo;
