
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface LogoGridProps {
  logos: string[];
  isLoading: boolean;
  companyName: string;
}

const LogoCard: React.FC<{ src: string; index: number; companyName: string }> = ({ src, index, companyName }) => {
  const sanitizedCompanyName = companyName.toLowerCase().replace(/\s+/g, '-');
  const downloadName = `${sanitizedCompanyName}-logo-${index + 1}.png`;

  return (
    <div className="group relative aspect-square bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500 hover:-translate-y-1">
      <img src={src} alt={`Logo variant ${index + 1}`} className="w-full h-full object-contain p-4" />
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={src}
          download={downloadName}
          className="flex items-center gap-2 px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded-md hover:bg-white transition-colors duration-200"
        >
          <DownloadIcon className="w-5 h-5" />
          Download
        </a>
      </div>
    </div>
  );
};

const SkeletonCard: React.FC = () => {
  return (
    <div className="aspect-square bg-gray-800 rounded-xl animate-pulse border border-gray-700"></div>
  );
};

const LogoGrid: React.FC<LogoGridProps> = ({ logos, isLoading, companyName }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    if (logos.length === 0 && !isLoading) {
        return (
            <div className="text-center py-16 px-4 text-gray-500">
                <p>Your generated logos will appear here.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {logos.map((logoSrc, index) => (
            <LogoCard key={index} src={logoSrc} index={index} companyName={companyName} />
        ))}
        </div>
    );
};

export default LogoGrid;
