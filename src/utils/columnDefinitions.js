import { format } from 'date-fns';

const betweenFilterFn = (row, columnId, filterValue) => {
  const value = row.values[columnId];
  const [min, max] = filterValue;
  return value >= min && value <= max;
};

const fuzzyFilterFn = (row, columnId, filterValue) => {
  const value = row.values[columnId];
  const regex = new RegExp(filterValue, 'i');
  return regex.test(value);
};
export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    filterFn: fuzzyFilterFn,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    filterFn: fuzzyFilterFn,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    filterVariant: 'multi-select',
  },
  {
    accessorKey: 'subcategory',
    header: 'Subcategory',
    filterVariant: 'multi-select',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    filterFn: betweenFilterFn,
    Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy HH:mm'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    filterFn: betweenFilterFn,
    Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy HH:mm'),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    filterFn: betweenFilterFn,
  },
  {
    accessorKey: 'sale_price',
    header: 'Sale Price',
    filterFn: betweenFilterFn,
  }
];