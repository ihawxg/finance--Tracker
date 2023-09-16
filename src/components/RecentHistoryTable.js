import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
export default function RecentHistoryTable() {
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

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
         <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Description</TableCell>
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
                        <TableCell align="left" style={{color: trans.type === "income" ? "green" : "red"}}>{trans.type === "income" ? "+" : "-"}{trans.amount}</TableCell>
                        <TableCell align="left">{trans.description}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}