import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Company, FilterOptions, SortOptions, PaginationOptions, SortOrder } from './types';
import companiesRepo from './database/CompaniesRepo';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import CompanyCard from './components/CompanyCard';
import Pagination from './components/Pagination';
import Spinner from './components/Spinner';

const ITEMS_PER_PAGE = 6;

const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    name: '',
    industry: '',
    location: '',
  });
  const [sort, setSort] = useState<SortOptions>({ key: 'name', order: 'asc' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);

  const [uniqueIndustries, setUniqueIndustries] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  
  const totalPages = useMemo(() => Math.ceil(totalCompanies / ITEMS_PER_PAGE), [totalCompanies]);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pagination: PaginationOptions = { page: currentPage, limit: ITEMS_PER_PAGE };
      const result = await companiesRepo.getCompanies({ filters, sort, pagination });
      setCompanies(result.data);
      setTotalCompanies(result.total);
    } catch (err) {
      setError('Failed to fetch companies. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters, sort]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [industries, locations] = await Promise.all([
          companiesRepo.getUniqueIndustries(),
          companiesRepo.getUniqueLocations(),
        ]);
        setUniqueIndustries(industries);
        setUniqueLocations(locations);
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (key: SortOptions['key']) => {
    setCurrentPage(1);
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <FilterControls
          filters={filters}
          sort={sort}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          industries={uniqueIndustries}
          locations={uniqueLocations}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
        ) : companies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-medium-text dark:text-gray-400 mt-16">
            <h2 className="text-2xl font-semibold text-dark-text dark:text-gray-100">No Companies Found</h2>
            <p className="mt-2">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;