import React, { useState, useEffect } from 'react';
import type { FilterOptions, SortOptions } from '../types';
import { MagnifyingGlassIcon, MapPinIcon, BuildingLibraryIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';

interface FilterControlsProps {
  filters: FilterOptions;
  sort: SortOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  onSortChange: (key: SortOptions['key']) => void;
  industries: string[];
  locations: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  sort,
  onFilterChange,
  onSortChange,
  industries,
  locations,
}) => {
    const [searchTerm, setSearchTerm] = useState(filters.name);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm !== filters.name) {
                onFilterChange({ name: searchTerm });
            }
        }, 300); // Debounce search input

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, filters.name, onFilterChange]);

    const SortIcon = sort.order === 'asc' ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by Name */}
        <div className="relative">
          <label htmlFor="search-name" className="sr-only">Search by name</label>
          <MagnifyingGlassIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
          <input
            id="search-name"
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-white dark:bg-gray-700 text-dark-text dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
          />
        </div>
        {/* Filter by Industry */}
        <div className="relative">
          <label htmlFor="filter-industry" className="sr-only">Filter by industry</label>
          <BuildingLibraryIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
          <select
            id="filter-industry"
            value={filters.industry}
            onChange={(e) => onFilterChange({ industry: e.target.value })}
            className="w-full pl-11 pr-4 py-2 bg-white dark:bg-gray-700 text-dark-text dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        {/* Filter by Location */}
        <div className="relative">
          <label htmlFor="filter-location" className="sr-only">Filter by location</label>
          <MapPinIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="w-full pl-11 pr-4 py-2 bg-white dark:bg-gray-700 text-dark-text dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Sorting Controls */}
      <div className="flex items-center justify-end space-x-2 pt-2">
        <span className="text-sm font-medium text-medium-text dark:text-gray-400">Sort by:</span>
        <button
          onClick={() => onSortChange('name')}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full flex items-center transition ${
            sort.key === 'name' ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
          }`}
        >
          Name {sort.key === 'name' && <SortIcon className="ml-1 h-4 w-4" />}
        </button>
        <button
          onClick={() => onSortChange('foundedYear')}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full flex items-center transition ${
            sort.key === 'foundedYear' ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
          }`}
        >
          Founded {sort.key === 'foundedYear' && <SortIcon className="ml-1 h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default FilterControls;