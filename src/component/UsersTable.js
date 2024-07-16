import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  TablePagination,
  Button,
  Checkbox,
  Popover,
  Typography,
  Switch,
  styled,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomPagination from "./CustomizablePagination";
import "../component/css/UserTable.css";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 24,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(7px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(8px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#868FA0" : "#F47500",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 8,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 10,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#E6E8EA" : "#E6E8EA",
    boxSizing: "border-box",
  },
}));

const StatusButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: "#E0F3E0",
  color: "#1A932E",
  textTransform: "none",
  minWidth: "auto",
  padding: "0 12px",
  "&:hover": {
    backgroundColor: "#E0F3E0",
  },
}));

const InvoiceButton = styled(Button)(({ theme }) => ({
    width: '87px',
    height: '25px',
  borderRadius: '48px',
  border: '1px solid #F47500',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  fontWeight:'600',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap:'10px',


}));

const UserTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      date: "18-06-2024",
      accountId: "789654",
      name: "abcd deo",
      country: "west Indies",
      mobile: "123456789",
      email: "abcd@gmail.com",
      status: "active",
      details: {plans: '3', buttontext: 'Plans'}
    },
    {
        id: 2,
        date: "15-07-2024",
        accountId: "654321",
        name: "hello deo",
        country: "australia",
        mobile: "7894561232",
        email: "hello@gmail.com",
        status: "active",
        details: {plans: '3',buttontext: 'Plans'}
      },
      {
        id: 3,
        date: "23-05-2024",
        accountId: "326598",
        name: "john deo",
        country: "japan",
        mobile: "9876567858",
        email: "john@gmail.com",
        status: "active",
        details: {plans: '3',buttontext: 'Plans'}
      },
      {
        id: 4,
        date: "19-05-2024",
        accountId: "568978",
        name: "john deo",
        country: "japan",
        mobile: "9876567858",
        email: "john@gmail.com",
        status: "active",
        details: {plans: '3',buttontext: 'Plans'}
      },
      {
        id: 5,
        date: "15-05-2024",
        accountId: "123456",
        name: "john deo",
        country: "japan",
        mobile: "9876567858",
        email: "john@gmail.com",
        status: "active",
        details: {plans: '3',buttontext: 'Plans'}
      },
  ]);

  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverRowId, setPopoverRowId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShow = (id) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, show: !row.show } : row))
    );
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
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleClick = () => {
    alert("click")
  }

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


  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className="table-head">
          <TableRow className="mainTableRow">
            <TableCell className="checkbox" padding="checkbox" sx={{ height: "36px" }}>
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell className="collapse" />
            <TableCell className="id">
              #<img onClick={() => handleSort('id')} src={require(`../image/column-sorting.png`)} />
            </TableCell >
            <TableCell className="date">
              DATE
              <img onClick={() => handleSort('date')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="accountId">
              ACCOUNT ID
              <img onClick={() => handleSort('accountId')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="name">
              NAME
              <img onClick={() => handleSort('name')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="country">
              COUNTRY
              <img onClick={() => handleSort('country')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="mobile">
              MOBILE
              <img onClick={() => handleSort('mobile')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="email">
              EMAIL
              <img onClick={() => handleSort('email')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="status">
              STATUS
              <img src={require(`../image/column-sorting.png`)} />
            </TableCell>
            {/* <TableCell className="moreOption"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
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
                      {expandedRows[row.id] ? (
                        <img src={require(`../image/bottomArrow.png`)} />
                      ) : (
                        <img src={require(`../image/rightArrow.png`)} />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.accountId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell >

                    <div className="statusIcon"> 
                    <StatusButton>{row.status}</StatusButton>
                    <IconButton
                      onClick={(event) => handlePopoverOpen(event, row.id)}
                    >
                      <img src={require(`../image/More.png`)} />
                    </IconButton>
                    </div>
                    <Popover
                      className="popup-show"
                      open={open && popoverRowId === row.id}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "right",
                        horizontal: "right",
                      }}
                    >
                    <div className="main-popup">
                      <div className="edit-popup">
                        <div className="active-class">
                        <Typography>Active</Typography>
                        <CustomSwitch
                          checked='true'
                          onChange={() => toggleShow(row.id)}
                          color="primary"
                        />
                        </div>
                        <div className="active-class">
                        <Typography>Block</Typography>
                        <CustomSwitch
                          checked={row.show}
                          onChange={() => toggleShow(row.id)}
                          color="primary"
                        />
                        </div>
                      </div>
                    </div>
                    </Popover>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                  >
                   <Collapse className='collapseOpen' in={expandedRows[row.id]} timeout="auto">
                    <div className='collapse-margin' >
                      <Table className='collapseTable' size="small">
                        <TableBody >
                          <TableRow className="collapseRow" >
                            <TableCell className='emptySpace' />
                            <TableCell className='noOfPlans'>NO OF PLANS
                            <div>{row.details.plans}</div>
                            </TableCell>
                            
                            <TableCell className='plans'>
                                <InvoiceButton onClick={handleClick}>{row.details.buttontext}</InvoiceButton>
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

export default UserTable;
