import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Button, Checkbox, Switch, styled
} from '@mui/material';
import CustomPagination from './CustomizablePagination'; 
import './css/EsimListTable.css'

const InvoiceButton = styled(Button)(({ theme }) => ({
    width: '80px',
    height: '25px',
  borderRadius: '50px',
  backgroundColor: '#b1d3fa',
  color: '#1883FF',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap:'10px',
  '&:hover': {
    backgroundColor: '#b1d3fa',
  },

}));

const EsimListTable = () => {
  const [rows, setRows] = useState([
    { id: 1, iccid: '19852342022002887791', accountId: '2234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 2, iccid: '29852342022002887791', accountId: '3234560', country: 'AMERICA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 3, iccid: '39852342022002887791', accountId: '4234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 4, iccid: '49852342022002887791', accountId: '5234560', country: 'AUSTRALIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 5, iccid: '59852342022002887791', accountId: '1234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 6, iccid: '69852342022002887791', accountId: '9234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 7, iccid: '89852342022002887791', accountId: '1234560', country: 'NEW ZEALAND', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 8, iccid: '9852342022002887791', accountId: '6234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 9, iccid: '79852342022002887791', accountId: '1234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 10, iccid: '89852342022002887791', accountId: '1234560', country: 'CORIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 11, iccid: '89852342022002887791', accountId: '7234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 12, iccid: '99852342022002887791', accountId: '1234560', country: 'UK', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 13, iccid: '89852342022002887791', accountId: '8234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
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
            <TableCell className='iccid'>ICCID<img onClick={() => handleSort('iccid')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='AccountId'>ACCOUNT ID<img onClick={() => handleSort('accountId')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='country'>COUNTRY<img onClick={() => handleSort('country')} src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='reInstall'>REINSTALL<img onClick={() => handleSort('reInstall')} src={require(`../image/column-sorting.png`)} /></TableCell>
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
                <TableCell>{row.iccid}</TableCell>
                <TableCell>{row.accountId}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.reinstall}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={10}>
                  <Collapse className='collapseOpen' in={expandedRows[row.id]} timeout="auto">
                    <div className='collapse-margin' >
                      <Table className='collapseTable' size="small">
                        <TableBody >
                          <TableRow >
                            <TableCell className='emptySpace' />
                            <TableCell className='installTime'>INSTALL TIME
                            <div style={{color:'#292D32'}}>{row.details.installTime}</div>
                            </TableCell>
                            <TableCell className='esimType'>UPDATE TIME
                              <div>{row.details.updateTime}</div>
                            </TableCell>
                            <TableCell className='insallDevice'>INSTALL DEVICE
                              <div>{row.details.installDevice}</div>
                            </TableCell>
                            <TableCell className='status'>STATUS
                                <div>
                              <InvoiceButton >{row.details.buttonText}</InvoiceButton>
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

export default EsimListTable;
