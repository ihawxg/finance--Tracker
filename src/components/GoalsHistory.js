import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { formatDate, formatTime } from '../utils/util'
import styled from 'styled-components';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeedIcon from '@mui/icons-material/Feed';
import SavingsIcon from '@mui/icons-material/Savings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { toCurrency, uuidv4 } from '../utils/util';
import { useSelector } from "react-redux";

function createData(date, time, description, amount) {

    return { description, amount, date, time };
}

export default function DataTable(props) {
    const currency = useSelector(state => state.userData.user.currency);

    const columns = [
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
            align: 'right',
            icon: <FeedIcon />
        },
        {
            id: 'amount',
            label: 'Reached / Goal',
            minWidth: 200,
            align: 'right',
            format: (value) => toCurrency(value, currency),
            icon: <SavingsIcon />
        },
        { id: 'date', label: 'Finished on', minWidth: 170, icon: <DateRangeIcon /> },
        { id: 'time', label: 'Time', minWidth: 100, align: 'left', icon: <AccessTimeIcon /> }
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = props.data.map(item => createData(formatDate(item.date), formatTime(item.date), item.name, item.amount + "/" + item.goal));
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: "0"}}>
            <CustomTableContainer sx={{ maxHeight: 440 }}>
                <CustomTable stickyHeader aria-label="sticky table">
                    <TableHead sx={{ backgroundColor: 'rgb(68, 18, 96)' }}>
                        <CustomRow key={uuidv4()}>
                            {columns.map((column) => (
                                <CustomCol
                                    key={uuidv4()}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.icon} {column.label}
                                </CustomCol>
                            ))}
                        </CustomRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <CustomRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <CustomCol key={uuidv4()} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </CustomCol>
                                            );
                                        })}
                                    </CustomRow>
                                );
                            })}
                    </TableBody>
                </CustomTable>
            </CustomTableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const CustomTable = styled.table`
    border: none;
`
const CustomCol = styled.td` 
border: none;
padding: 12px;
width:100%;
text-align: start;
`
const CustomRow = styled(TableRow)`
    border: 1px solid rgba(255,255,255, 0.5);
`
const CustomTableContainer = styled(TableContainer)` 
    background: #9D50BB;
    background: -webkit-linear-gradient(to right, #6E48AA, #9D50BB); 
    background: linear-gradient(to right, #6E48AA, #9D50BB);
    color : #fff;

`