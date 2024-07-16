import * as React from 'react';
import './Table.css'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function createData(
  number,
  data,
  accountId,
  name,
  destination,
  data2,
  days,
  status
) {
  return {
    number,
    data,
    accountId,
    name,
    destination,
    data2,
    days,
    status,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row, handleRowCheckboxChange, checkedRows } = props;
  const [open, setOpen] = React.useState(false);

  const handleCheckboxChange = (event) => {
    handleRowCheckboxChange(row.number, event.target.checked);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={checkedRows.includes(row.number)}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'select row' }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon className='icon' /> : <KeyboardArrowDownIcon className='icon' />}
          </IconButton>
        </TableCell>
        <TableCell>{row.number}</TableCell>
        <TableCell>{row.data}</TableCell>
        <TableCell>{row.accountId}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.destination}</TableCell>
        <TableCell>{row.data2}</TableCell>
        <TableCell>{row.days}</TableCell>
        {/* <TableCell>{row.status}</TableCell> */}
        <TableCell>
          
            <div className='btn'>
              Complete
            </div>
          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    number: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    data2: PropTypes.string.isRequired,
    days: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  handleRowCheckboxChange: PropTypes.func.isRequired,
  checkedRows: PropTypes.arrayOf(PropTypes.number).isRequired,

};

const initialRows = [
  createData(1, 'Data A', 'Account1', 'Name A', 'Destination A', 'Data B', 5, 'Pending'),
  createData(2, 'Data C', 'Account2', 'Name B', 'Destination B', 'Data D', 10, 'Pending'),
  createData(3, 'Data E', 'Account3', 'Name C', 'Destination C', 'Data F', 15, 'Pending'),
  createData(4, 'Data G', 'Account4', 'Name D', 'Destination D', 'Data H', 20, 'Pending'),
  createData(5, 'Data I', 'Account5', 'Name E', 'Destination E', 'Data J', 25, 'Pending'),
];

export default function CollapsibleTable() {
  const [checkedRows, setCheckedRows] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [rows, setRows] = React.useState(initialRows);

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      setCheckedRows(rows.map(row => row.number));
      setSelectAll(true);
    } else {
      setCheckedRows([]);
      setSelectAll(false);
    }
  };

  const handleRowCheckboxChange = (rowNumber, isChecked) => {
    setCheckedRows(prevCheckedRows => {
      if (isChecked) {
        return [...prevCheckedRows, rowNumber];
      } else {
        return prevCheckedRows.filter(number => number !== rowNumber);
      }
    });
  };



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:'#E9EDF5'}}>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectAll}
                onChange={handleHeaderCheckboxChange}
                inputProps={{ 'aria-label': 'select all rows' }}
              />
            </TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Account ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.number}
              row={row}
              handleRowCheckboxChange={handleRowCheckboxChange}
              checkedRows={checkedRows}
           
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
