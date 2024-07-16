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
  Button,
  Checkbox,
  Switch,
  styled,
} from "@mui/material";
import CustomPagination from "./CustomizablePagination";
import "./css/FailedListTable.css";
import { FaLeaf } from "react-icons/fa";

const StatusButton = styled(Button)(({ theme }) => ({
  width: "51px",
  height: "25px",
  fontSize:'12px',
  borderRadius: "20px",
  backgroundColor: "#f5cbce",
  color: "#EE201C",
  textTransform: "none",
  minWidth: "auto",
  padding: "5px 8px 5px 8px",
  "&:hover": {
    backgroundColor: "#f5cbce",
  },
}));

const FailedListTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      date: "5-05-2024",
      accountId: "3234560",
      name: "John Doe",
      destination: "Japan",
      data: "6GB",
      days: "5 Days",
      status: "Failed",
    },
    {
      id: 2,
      date: "25-05-2024",
      accountId: "5234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "3 Days",
      status: "Failed",
    },
    {
      id: 3,
      date: "12-05-2024",
      accountId: "3284560",
      name: "good Doe",
      destination: "Japan",
      data: "2GB",
      days: "6 Days",
      status: "Failed",
    },
    {
      id: 4,
      date: "15-05-2024",
      accountId: "1234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 5,
      date: "8-05-2024",
      accountId: "1234560",
      name: "John Doe",
      destination: "Japan",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 6,
      date: "7-05-2024",
      accountId: "1234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 7,
      date: "29-05-2024",
      accountId: "1234560",
      name: "John Doe",
      destination: "Japan",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 8,
      date: "26-05-2024",
      accountId: "1234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 9,
      date: "15-05-2024",
      accountId: "1234560",
      name: "John Doe",
      destination: "Japan",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
    {
      id: 10,
      date: "15-05-2024",
      accountId: "1234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "8 Days",
      status: "Failed",
    },
  ]);

  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
        <TableHead className="tableHead">
          <TableRow className="mainTableRow">
            <TableCell className="checkbox" padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>

            <TableCell className="id">
                
                #<img onClick={() => handleSort('id')} src={require(`../image/column-sorting.png`)} />
                
            </TableCell>
            <TableCell className="date">
              Date
              <img  onClick={() => handleSort('date')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="AccountId">
              Account ID
              <img  onClick={() => handleSort('accountId')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="name">
              Name
              <img onClick={() => handleSort('name')}  src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="destination">
              Destination
              <img onClick={() => handleSort('destination')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="data">
              Data
              <img onClick={() => handleSort('data')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="days">
              Days
              <img onClick={() => handleSort('days')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="status">
              Status
              <img src={require(`../image/column-sorting.png`)} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className="table-row"
                  selected={isRowSelected(row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>

                  <TableCell>{row.id}</TableCell>
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
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                  ></TableCell>
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

export default FailedListTable;
