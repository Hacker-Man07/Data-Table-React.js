import React, { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleFiltersButton as MrtToggleFiltersButton,
  MRT_ShowHideColumnsButton as MrtShowHideColumnsButton,
  MRT_ToggleGlobalFilterButton as MrtToggleGlobalFilterButton,
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import { columns } from '../../utils/columnDefinitions';
import FilterDrawer from './FilterDrawer';
import GroupDrawer from './GroupDrawer';

const AdvancedDataTable = ({ data }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [grouping, setGrouping] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isGroupDrawerOpen, setIsGroupDrawerOpen] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return columnFilters.every((filter) => {
        const { id, value } = filter;
        const cellValue = row[id];

        if (Array.isArray(value)) {
          if (value[0] instanceof Date) {
            const rowDate = new Date(cellValue);
            return rowDate >= value[0] && rowDate <= value[1];
          }
          if (typeof value[0] === 'number') {
            return cellValue >= value[0] && cellValue <= value[1];
          }
          return value.includes(cellValue);
        }

        if (typeof value === 'string') {
          return cellValue.toString().toLowerCase().includes(value.toLowerCase());
        }

        return true;
      });
    });
  }, [data, columnFilters]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableColumnFilters: true,
    enableFilters: true,
    enableGlobalFilter: true,
    enableGrouping: true,
    enableColumnOrdering: true,
    enablePagination: true,
    enableSorting: true,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnVisibilityChange: setColumnVisibility,
    renderTopToolbarCustomActions: () => (
      <Box>
        <IconButton onClick={() => setIsFilterDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
        <IconButton onClick={() => setIsGroupDrawerOpen(true)}>
          <GroupIcon />
        </IconButton>
        <MrtToggleFiltersButton table={table} />
        <MrtShowHideColumnsButton table={table} />
        <MrtToggleGlobalFilterButton table={table} />
      </Box>
    ),
    state: {
      columnFilters,
      globalFilter,
      pagination,
      sorting,
      grouping,
      columnVisibility,
    },
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        columns={columns}
        setColumnFilters={setColumnFilters}
        data={data}
      />
      <GroupDrawer
        isOpen={isGroupDrawerOpen}
        onClose={() => setIsGroupDrawerOpen(false)}
        setGrouping={setGrouping}
      />
    </Box>
  );
};

export default AdvancedDataTable;