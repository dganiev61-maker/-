
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LogoGeneratorForm from './components/LogoGeneratorForm';
import LogoGrid from './components/LogoGrid';
import { generateLogos } from './services/geminiService';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('Prista Oil');
  const [logos, setLogos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLogos = useCallback(async () => {
    if (!companyName.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setLogos([]);

    try {
      const generatedLogos = await generateLogos(companyName);
      setLogos(generatedLogos);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating logos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [companyName, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-cyan-400">
            Create a professional logo instantly
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Describe your company, and our AI will generate several unique logo concepts for you in seconds.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mt-10">
          <LogoGeneratorForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            onSubmit={handleGenerateLogos}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-12">
          {error && (
            <div className="text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
              <p>{error}</p>
            </div>
          )}
          <LogoGrid logos={logos} isLoading={isLoading} companyName={companyName} />
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
