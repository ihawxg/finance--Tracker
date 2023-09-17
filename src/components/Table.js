import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getDateAndTime } from '../utils/util'
import styled from 'styled-components';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CategoryIcon from '@mui/icons-material/Category';
import FeedIcon from '@mui/icons-material/Feed';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { toCurrency } from '../utils/util';
const columns = [
    { id: 'date', label: 'Date/Time', minWidth: 120, icon: <DateRangeIcon /> },
    { id: 'type', label: 'Type', minWidth: 100, icon: <ShowChartIcon /> },
    { id: 'account', label: 'Account', minWidth: 130, icon: <AccountBalanceWalletIcon /> },
    {
        id: 'category',
        label: 'Category',
        minWidth: 140,
        align: 'right',
        icon: <CategoryIcon />
    },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
        align: 'right',
        icon: <FeedIcon />
    },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 120,
        align: 'right',
        format: (value) => toCurrency(value),
        icon: <ReceiptLongIcon />
    },
];

function createData(date, type, account, category, description, amount) {
    return { date, type, account, category, description, amount };
}

export default function DataTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = props.data.map(item => createData(getDateAndTime(item.date), item.type, item.account, item.category, item.description, Number(item.amount)))
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <CustomTableContainer sx={{ maxHeight: 440 }}>
                <CustomTable stickyHeader aria-label="sticky table">
                    <TableHead sx={{ backgroundColor: 'rgb(68, 18, 96)' }}>
                        <CustomRow key={Math.random()*100}>
                            {columns.map((column) => (
                                <CustomCol
                                    key={column.id}
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
                                    <CustomRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <CustomCol key={column.id} align={column.align}>
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
    border: none
`
const CustomCol = styled.td` 
border: none;
padding: 12px;
width:100%;
text-align: start;
    &:last-child {
        text-align: end;
    }
`
const CustomRow = styled(TableRow)`
    border: 1px solid rgba(255,255,255, 0.5);
`
const CustomTableContainer = styled(TableContainer)` 
    background: #9D50BB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #6E48AA, #9D50BB);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #6E48AA, #9D50BB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color : #fff;

`