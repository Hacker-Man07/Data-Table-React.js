import React, {  useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

const MultiSelectFilter = ({ column, onFilterChange, data, options, currentFilter }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (currentFilter) {
      setSelectedOptions(currentFilter);
    }
  }, [currentFilter]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const newSelectedOptions = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter(option => option !== value);
    
    setSelectedOptions(newSelectedOptions);
    onFilterChange(column.accessorKey, newSelectedOptions.length ? newSelectedOptions : undefined);
  };

  return (
    <Box>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={handleChange}
              value={option}
            />
          }
          label={`${option} (${data.filter(item => item[column.accessorKey] === option).length})`}
        />
      ))}
    </Box>
  );
};

export default MultiSelectFilter;