import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, TablePagination, Button, Checkbox, Popover, Typography, Switch, styled
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomPagination from './CustomizablePagination';
import '../component/css/DetailListTable.css';


const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 21,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(14px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(25px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#868FA0' : 'orange',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 10,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'orange' : '#868FA0',
    boxSizing: 'border-box',
  },
}));

const DetailListTable = () => {
  const [rows, setRows] = useState([
    { id: 1, country: 'Afghanistan', startDate: '22-05-2024', endDate: '22-06-2024', deal: 10, show: true },
    { id: 2, country: 'Albania', startDate: '22-05-2024', endDate: '22-06-2024', deal: 20, show: false },
    { id: 3, country: 'Algeria', startDate: '22-05-2024', endDate: '22-06-2024', deal: 10, show: true },
    { id: 1, country: 'Afghanistan', startDate: '22-05-2024', endDate: '22-06-2024', deal: 10, show: true },
    { id: 2, country: 'america', startDate: '22-05-2024', endDate: '22-06-2024', deal: 20, show: false },
    { id: 3, country: 'Algeria', startDate: '22-05-2024', endDate: '22-06-2024', deal: 10, show: true },
  ]);

  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selectedRows, setSelectedRows] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverRowId, setPopoverRowId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShow = (id) => {
    setRows(rows.map(row => row.id === id ? { ...row, show: !row.show } : row));
  };

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPopoverRowId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverRowId(null);
  };

  const open = Boolean(anchorEl);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className='table-head'>
          <TableRow className='mainTableRow'>
            <TableCell className='checkbox' padding="checkbox" sx={{ height: '36px' }}>
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell  className='collapse' />
            <TableCell className='id' >#<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='country' >Country<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='startDate' >Start Date<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='endDate' >End Date<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='deal' >Deal %<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='show' >Show<img src={require(`../image/column-sorting.png`)} /></TableCell>
            <TableCell className='action' >Actions<img src={require(`../image/column-sorting.png`)} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <React.Fragment key={row.id}>
              <TableRow selected={isRowSelected(row.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isRowSelected(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell >
                  <IconButton onClick={() => toggleExpand(row.id)}>
                    {expandedRows[row.id] ? <img src={require(`../image/bottomArrow.png`)}/>
                                           : <img src={require(`../image/rightArrow.png`)} />}
                  </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.deal}</TableCell>
                <TableCell>
                  <CustomSwitch
                    checked={row.show}
                    onChange={() => toggleShow(row.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell >
                  <IconButton onClick={(event) => handlePopoverOpen(event, row.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Popover 
                  className='popup-show'
                    open={open && popoverRowId === row.id}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                      
                    }}
                    transformOrigin={{
                      vertical: 'right',
                      horizontal: 'right',
                      
                    }}
                  >
                    <div className='edit-popup'>
                    <img className='edit-icon' src={require(`../image/edit-icon.png`)} />
                    <Typography>Edit</Typography>
                    </div>
                  </Popover>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                  <Collapse className='collapse-open'  in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                    <div style={{ margin: 16 }}>
                      More information about {row.country}
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 36 * emptyRows }}>
              <TableCell colSpan={9} />
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

export default DetailListTable;
