import React, { useState } from 'react';
import { Box, Drawer, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

const GroupDrawer = ({ isOpen, onClose, setGrouping }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleGroupChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGroups((prev) => [...prev, value]);
    } else {
      setSelectedGroups((prev) => prev.filter((item) => item !== value));
    }
  };

  const applyGrouping = () => {
    setGrouping(selectedGroups);
    onClose();
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Group By
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedGroups.includes('category')}
              onChange={handleGroupChange}
              value="category"
            />
          }
          label="Category"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedGroups.includes('subcategory')}
              onChange={handleGroupChange}
              value="subcategory"
            />
          }
          label="Subcategory"
        />
        <Button variant="contained" onClick={applyGrouping}>
          Apply Grouping
        </Button>
      </Box>
    </Drawer>
  );
};

export default GroupDrawer;