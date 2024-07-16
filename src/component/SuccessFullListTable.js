import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Button, Checkbox, Switch, styled
} from '@mui/material';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import CustomPagination from './CustomizablePagination'; 
import './css/SuccessFullListTable.css'
import { Expand } from '@mui/icons-material';

const StatusButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: '#E0F3E0',
  color: '#1A932E',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  '&:hover': {
    backgroundColor: '#E0F3E0',
  },
}));

const InvoiceButton = styled(Button)(({ theme }) => ({
  borderRadius: '48px',
  backgroundColor: '#1A932E',
  color: 'white',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap:'10px',
  '&:hover': {
    backgroundColor: '#1A932E',
  },
}));

const SuccessFullList = () => {
  const [rows, setRows] = useState([
    { id: 1, date: '15-05-2024', accountId: '1234560', name: 'John Doe', destination: 'Japan', data: '8GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 2, date: '18-05-2024', accountId: '2234561', name: 'Allison Bator', destination: 'India', data: '3GB', days: '2 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 3, date: '13-05-2024', accountId: '5234562', name: 'Charlie Philips', destination: 'UK', data: '4GB', days: '7 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 4, date: '19-05-2024', accountId: '3234560', name: 'hello Doe', destination: 'Japan', data: '8GB', days: '9 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 5, date: '28-05-2024', accountId: '8234561', name: 'Allison Bator', destination: 'India', data: '5GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 6, date: '26-05-2024', accountId: '7234562', name: 'Charlie Philips', destination: 'UK', data: '7GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 7, date: '05-05-2024', accountId: '9234560', name: 'John Doe', destination: 'Japan', data: '8GB', days: '6 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 8, date: '07-05-2024', accountId: '5234561', name: 'Allison Bator', destination: 'India', data: '8GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
  ]);

  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className='tableHead'>
          <TableRow className='mainTableRow'>
            <TableCell className='checkbox' padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell className='collapse' />
            <TableCell className='id'>#<img onClick={() => handleSort('id')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='date'>Date<img onClick={() => handleSort('date')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='AccountId'>Account ID<img onClick={() => handleSort('accountId')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='name'>Name<img onClick={() => handleSort('name')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='destination'>Destination<img onClick={() => handleSort('destination')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='data'>Data<img onClick={() => handleSort('data')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='days'>Days<img onClick={() => handleSort('days')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='status'>Status<img src={require(`../image/column-sorting.png`)} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <React.Fragment key={row.id}>
              <TableRow className={expandedRows[row.id]?'tableRow':''} selected={isRowSelected(row.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isRowSelected(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleExpand(row.id)}>
                    {expandedRows[row.id] ?  <img src={require(`../image/bottomArrow.png`)}/>
                                           : <img src={require(`../image/rightArrow.png`)} />}
                  </IconButton>
                </TableCell>
                <TableCell >{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.accountId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>{row.data}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>
                  <StatusButton>{row.status}</StatusButton>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                  <Collapse className='collapseOpen' in={expandedRows[row.id]} timeout="auto">
                    <div className='collapse-margin' >
                      <Table className='collapseTable' size="small">
                        <TableBody >
                          <TableRow >
                            <TableCell className='actualCost'>Actual Cost
                            <div>{row.details.actualCost}</div>
                            </TableCell>
                            <TableCell className='sellingPrice'>Selling Price
                              <div>{row.details.sellingPrice}</div>
                            </TableCell>
                            <TableCell className='discount'>Discount
                              <div>{row.details.discount}</div>
                            </TableCell>
                            <TableCell className='netIncome'>Net Income
                              <div>{row.details.netIncome}</div>
                            </TableCell>
                            <TableCell className='paymentType'>Payment Type
                              <div>{row.details.paymentType}</div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='sale'>Sale
                              <div>{row.details.sale}</div>
                            </TableCell>
                            <TableCell className='waoClub'>WAOClub
                              <div>{row.details.waoclub}</div>
                            </TableCell>
                            <TableCell className='iccicd'>ICCID
                              <div>{row.details.iccid}</div>
                            </TableCell>
                            <TableCell className='invoiceButton' colSpan={2}>
                              <InvoiceButton variant="contained">{row.details.buttonText}</InvoiceButton>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 36 * emptyRows }}>
              <TableCell colSpan={10} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SuccessFullList;
