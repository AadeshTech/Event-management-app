import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ReusableTableProps {
  cols: { title: string; render: (rowData: any) => React.ReactNode }[];
  data: any[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ cols, data }) => {
  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {cols.map((col, index) => (
              <TableCell key={index}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, index) => (
            <TableRow key={index}>
              {cols.map((col, key) => (
                <TableCell key={key}>{col.render(rowData)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
