import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Button, Checkbox, Switch, styled
} from '@mui/material';
import CustomPagination from './CustomizablePagination'; 
import './css/PlansListTable.css'


const InvoiceButton = styled(Button)(({ theme }) => ({
    width: '80px',
height: '25px',
  borderRadius: '50px',
  backgroundColor: '#b1d3fa',
  color: '#1883FF',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap:'10px'
}));

const PlanListTable = () => {
  const [rows, setRows] = useState([
    { id: 1, date: '15-05-2024', accountId: '1234560', name: 'hello Doe', destination: 'America', data: '4GB', days: '3 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
    { id: 2, date: '16-05-2024', accountId: '5234560', name: 'good Doe', destination: 'west indies', data: '2GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
    { id: 3, date: '20-05-2024', accountId: '7234560', name: 'morning Doe', destination: 'canada', data: '1GB', days: '1 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
    { id: 4, date: '18-05-2024', accountId: '9234560', name: 'jai Doe', destination: 'london', data: '10GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
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
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <React.Fragment key={row.id}>
              <TableRow className={expandedRows[row.id] ? 'tableRow':''} selected={isRowSelected(row.id)}>
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
              </TableRow>
              <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                  <Collapse className='collapseOpen' in={expandedRows[row.id]} timeout="auto">
                    <div className='collapse-margin' >
                      <Table className='collapseTable' size="small">
                        <TableBody >
                          <TableRow >
                            <TableCell className='emptySpace' />
                            <TableCell className='os'>Os
                            <div style={{color:'#292D32'}}>{row.details.os}</div>
                            </TableCell>
                            <TableCell className='esimType'>ESIM TYPE
                              <div>{row.details.esimtype}</div>
                            </TableCell>
                            <TableCell className='iccid'>ICCID
                              <div>{row.details.iccid}</div>
                            </TableCell>
                            <TableCell className='status'>STATUS
                                <div>
                              <InvoiceButton variant="contained">{row.details.buttonText}</InvoiceButton>
                                </div>
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

export default PlanListTable;
