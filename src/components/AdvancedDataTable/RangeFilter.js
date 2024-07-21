import React, { useState, useMemo, useEffect } from 'react';
import { Slider, Typography, Box } from '@mui/material';

const RangeFilter = ({ column, onFilterChange, data, currentFilter }) => {
  const [min, max] = useMemo(() => {
    const values = data.map(item => parseFloat(item[column.accessorKey])).filter(v => !isNaN(v));
    return [Math.min(...values), Math.max(...values)];
  }, [data, column.accessorKey]);

  const [range, setRange] = useState([min, max]);

  useEffect(() => {
    if (currentFilter) {
      setRange(currentFilter);
    }
  }, [currentFilter]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
    onFilterChange(column.accessorKey, newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '0 10px' }}>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
      <Typography variant="caption">
        Range: {range[0].toFixed(2)} - {range[1].toFixed(2)}
      </Typography>
    </Box>
  );
};

export default RangeFilter;