// @mui
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { HeaderLabel } from '~/models';

// ----------------------------------------------------------------------

interface TableListHeadProps {
  headLabel: HeaderLabel[];
}

export default function TableListHead({ headLabel }: TableListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
