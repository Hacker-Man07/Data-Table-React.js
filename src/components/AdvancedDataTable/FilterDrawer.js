import React, { useState, useMemo } from 'react';
import { Box, Drawer, Typography, Button, TextField } from '@mui/material';
import MultiSelectFilter from './MultiSelectFilter';
import RangeFilter from './RangeFilter';
import DateRangeFilter from './DateRangeFilter';

const FilterDrawer = ({ isOpen, onClose, columns, setColumnFilters, data }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (columnId, value) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  const applyFilters = () => {
    const newFilters = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([id, value]) => ({
        id,
        value: value
      }));
    setColumnFilters(newFilters);
    onClose();
  };

  const getUniqueValues = useMemo(() => {
    return (columnId) => [...new Set(data.map(item => item[columnId]))].sort();
  }, [data]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        {columns.map((column) => (
         column && column.accessorKey && (
         <Box key={column.accessorKey} sx={{ my: 2 }}>
            <Typography>{column.header}</Typography>
            {(column.accessorKey === 'id' || column.accessorKey === 'name') && (
              <TextField
                fullWidth
                value={filters[column.accessorKey] || ''}
                onChange={(e) => handleFilterChange(column.accessorKey, e.target.value)}
              />
            )}
            {(column.accessorKey === 'price' || column.accessorKey === 'sale_price') && (
              <RangeFilter
                column={column}
                onFilterChange={handleFilterChange}
                data={data}
                currentFilter={filters[column.accessorKey]}
              />
            )}
            {(column.accessorKey === 'createdAt' || column.accessorKey === 'updatedAt') && (
              <DateRangeFilter
                column={column}
                onFilterChange={handleFilterChange}
                currentFilter={filters[column.accessorKey]}
              />
            )}
            {(column.accessorKey === 'category' || column.accessorKey === 'subcategory') && (
              <MultiSelectFilter
                column={column}
                onFilterChange={handleFilterChange}
                data={data}
                options={getUniqueValues(column.accessorKey)}
                currentFilter={filters[column.accessorKey]}
              />
            )}
          </Box>
        )))}
        <Button variant="contained" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;