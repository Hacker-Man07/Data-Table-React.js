import React from 'react';
import { AdvancedDataTable } from './components';
import { useSampleData } from './useSampleData';

function App() {
  const { data, error, loading } = useSampleData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!! {error}</div>;
  if (!data) return <div>No data available</div>;
  
  return (
    <div className="App">
      <h1>Advanced Data Table</h1>
      <AdvancedDataTable data={data} />
    </div>
  );
}

export default App;