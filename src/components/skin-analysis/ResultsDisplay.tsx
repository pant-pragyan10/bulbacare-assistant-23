
import React from 'react';

interface ResultsDisplayProps {
  results: {
    label: string;
    score: number;
  }[] | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-center text-gray-600">Analyzing image...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <p className="text-gray-600 text-center p-6">Upload an image to see analysis results</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between">
            <span className="font-medium">{result.label}</span>
            <span className="text-gray-700">{(result.score * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
