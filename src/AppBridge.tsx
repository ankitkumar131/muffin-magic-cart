import React, { useState, useEffect } from 'react';
import SimpleApp from './SimpleApp';
import FixedApp from './FixedApp';

// This component will try to load the FixedApp
// If it fails, it will fall back to the SimpleApp
const AppBridge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading ThreeMuffins...</h2>
          <p className="text-gray-600">Please wait while we set things up</p>
        </div>
      </div>
    );
  }

  try {
    // Try to render the FixedApp
    return <FixedApp />;
  } catch (err) {
    console.error('Error rendering FixedApp:', err);
    // Fall back to SimpleApp if there's an error
    return <SimpleApp />;
  }
};

export default AppBridge;
