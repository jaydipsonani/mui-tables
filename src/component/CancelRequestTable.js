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
  styled,
} from "@mui/material";
import CustomPagination from "./CustomizablePagination";
import "../component/css/CancelRequestTable.css";

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
  width: "87px",
  height: "25px",
  borderRadius: "48px",
  backgroundColor: "#1A932E",
  color: "#FFFFFF",
  fontWeight: "600",
  textTransform: "none",
  minWidth: "auto",
  padding: "0 12px",
  marginRight: "10px",
}));

const InvoiceButton2 = styled(Button)(({ theme }) => ({
  width: "87px",
  height: "25px",
  borderRadius: "48px",
  backgroundColor: "#FF0000",
  color: "#FFFFFF",
  fontWeight: "600",
  textTransform: "none",
  minWidth: "auto",
  padding: "0 12px",
  gap: "10px",
}));

const CancelRequest = () => {
  const rows = [
    {
      id: 1,
      date: "16-07-2023",
      accountId: "6519984948",
      name: "john deo",
      country: "japan",
      mobile: "7258468578",
      email: "radhe@gmail.com",
      status: "active",
      details: {
        plan: "JAPAN/1G/3DAY",
        iccid: "123456969",
        planStatus: "ACTIVE",
        refund: "FREE TILL JUN/31",
        acceptText: "Accept",
        declineText: "Decline",
      },
    },
    {
      id: 2,
      date: "15-05-2024",
      accountId: "256489",
      name: "abcd deo",
      country: "america",
      mobile: "8965231478",
      email: "deo@gmail.com",
      status: "active",
      details: {
        plan: "JAPAN/1G/3DAY",
        iccid: "123456969",
        planStatus: "ACTIVE",
        refund: "FREE TILL JUN/31",
        acceptText: "Accept",
        declineText: "Decline",
      },
    },
    {
      id: 3,
      date: "17-06-2024",
      accountId: "123456",
      name: "john deo",
      country: "australia",
      mobile: "9876567858",
      email: "john@gmail.com",
      status: "active",
      details: {
        plan: "JAPAN/1G/3DAY",
        iccid: "123456969",
        planStatus: "ACTIVE",
        refund: "FREE TILL JUN/31",
        acceptText: "Accept",
        declineText: "Decline",
      },
    },
    {
      id: 4,
      date: "18-06-2024",
      accountId: "123456",
      name: "zero deo",
      country: "new zealand",
      mobile: "9876567858",
      email: "zero@gmail.com",
      status: "active",
      details: {
        plan: "JAPAN/1G/3DAY",
        iccid: "123456969",
        planStatus: "ACTIVE",
        refund: "FREE TILL JUN/31",
        acceptText: "Accept",
        declineText: "Decline",
      },
    },
    {
      id: 5,
      date: "28-06-2024",
      accountId: "123456",
      name: "john deo",
      country: "bangladesh",
      mobile: "9876567858",
      email: "john@gmail.com",
      status: "active",
      details: {
        plan: "JAPAN/1G/3DAY",
        iccid: "123456969",
        planStatus: "ACTIVE",
        refund: "FREE TILL JUN/31",
        acceptText: "Accept",
        declineText: "Decline",
      },
    },
  ];

  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
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
        <TableHead className="table-head">
          <TableRow className="mainTableRow">
            <TableCell
              className="checkbox"
              padding="checkbox"
              sx={{ height: "36px" }}
            >
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell className="collapse" />
            <TableCell className="id" >
              #
              <img onClick={() => handleSort('id')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="date" >
              DATE
              <img onClick={() => handleSort('date')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="accountId" >
              ACCOUNT ID
              <img onClick={() => handleSort('accountId')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="name" >
              NAME
              <img onClick={() => handleSort('name')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="country" >
              COUNTRY
              <img onClick={() => handleSort('country')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="mobile" >
              MOBILE
              <img onClick={() => handleSort('mobile')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="email" >
              EMAIL
              <img onClick={() => handleSort('email')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
            <TableCell className="status" >
              STATUS
              <img onClick={() => handleSort('status')} src={require(`../image/column-sorting.png`)} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className={expandedRows[row.id] ? "tableRow" : ""}
                  selected={isRowSelected(row.id)}
                >
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
                  <TableCell>
                    <div className="statusIcon">
                      <StatusButton>{row.status}</StatusButton>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                  >
                    <Collapse
                      className="collapseOpen"
                      in={expandedRows[row.id]}
                      timeout="auto"
                    >
                      <div className="collapse-margin">
                        <Table className="collapseTable" size="small">
                          <TableBody>
                            <TableRow className="collapseRow">
                              <TableCell className="emptySpace" />
                              <TableCell className="plan">
                                PLAN
                                <div>{row.details.plan}</div>
                              </TableCell>
                              <TableCell className="iccid">
                                ICCID
                                <div>{row.details.iccid}</div>
                              </TableCell>
                              <TableCell className="planStatus">
                                PLAN STATUS
                                <div>{row.details.planStatus}</div>
                              </TableCell>
                              <TableCell className="refund">
                                REFUND
                                <div>{row.details.refund}</div>
                              </TableCell>

                              <TableCell className="planButton">
                                <InvoiceButton>
                                  {row.details.acceptText}
                                </InvoiceButton>
                                <InvoiceButton2>
                                  {row.details.declineText}
                                </InvoiceButton2>
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

export default CancelRequest;
