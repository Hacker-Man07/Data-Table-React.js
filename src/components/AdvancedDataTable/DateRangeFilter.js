import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateRangeFilter = ({ column, onFilterChange, currentFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (currentFilter) {
      setStartDate(currentFilter[0]);
      setEndDate(currentFilter[1]);
    }
  }, [currentFilter]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilterChange(column.accessorKey, [date, endDate]);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onFilterChange(column.accessorKey, [startDate, date]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;