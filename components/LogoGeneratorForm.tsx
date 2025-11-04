
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface LogoGeneratorFormProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const LogoGeneratorForm: React.FC<LogoGeneratorFormProps> = ({
  companyName,
  setCompanyName,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-800/50 p-2 rounded-xl border border-gray-700 shadow-lg shadow-cyan-500/5">
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter company name (e.g., Prista Oil)"
        className="w-full flex-grow bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-lg border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !companyName.trim()}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 shadow-md disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" />
            Generate
          </>
        )}
      </button>
    </form>
  );
};

export default LogoGeneratorForm;
