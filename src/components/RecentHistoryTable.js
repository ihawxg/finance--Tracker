import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import { toCurrency } from '../utils/util';
export default function RecentHistoryTable() {
    const currency = "BGN";
    const transactions = useSelector(state => state.userData.user.transactions);
    const recentTransactions = [];
    let counter = 0;
    for(let i = transactions.length - 1; i >= 0; i--, counter++){
        recentTransactions.push(transactions[i]);
        if(counter === 4) {
            break;
        }
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 600 }} >
                <Table aria-label="simple table">
                    <TableHead sx={{background: "#ad5389", background: "-webkit-linear-gradient(to right, #3c1053, #ad5389)", background: "linear-gradient(to right, #3c1053, #ad5389)"}}>
                        <TableRow>
                            <TableCell style={{ color: "white", fontFamily: "Poppins" }}>Category</TableCell>
                            <TableCell align="left" style={{ color: "white", fontFamily: "Poppins" }}>Amount&nbsp;({currency})</TableCell>
                            <TableCell align="left" style={{ color: "white", fontFamily: "Poppins" }}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {recentTransactions.map((trans) => (
                        <TableRow
                        key={trans.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {trans.category}
                            </TableCell>
                            <TableCell align="left" style={{color: trans.type === "income" ? "green" : "red"}}>{trans.type === "income" ? "+" : "-"}{ toCurrency(trans.amount) }
                            </TableCell>
                            <TableCell align="left">{trans.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}