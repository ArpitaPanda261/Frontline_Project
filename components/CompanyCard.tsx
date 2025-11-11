import React from 'react';
import type { Company } from '../types';
import { MapPinIcon, BuildingLibraryIcon, CalendarDaysIcon } from './Icons';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-blue-500/20 transition-all duration-300 ease-in-out flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">{company.industry}</p>
            <h3 className="mt-1 text-xl font-bold text-dark-text dark:text-gray-100">{company.name}</h3>
          </div>
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-16 h-16 rounded-full border-2 border-gray-100 dark:border-gray-700 object-cover ml-4"
          />
        </div>
        <p className="mt-4 text-medium-text dark:text-gray-400 text-sm leading-relaxed flex-grow">{company.description}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400"/>
            <span>Founded in {company.foundedYear}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;