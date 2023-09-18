import { useSelector } from "react-redux";

export default function GetMaxAmount() {
    
    const incomes = useSelector(state =>      
        state.userData.user.accounts
            .map(account => account.incomes)
            .flat().map(income => Number(income.amount)));

    const expenses = useSelector(state => 
        state.userData.user.accounts
            .map(account => account.expenses)
            .flat().map(expense => Number(expense.amount))
            );

    const maxI = Math.max(...incomes);
    const maxE = Math.max(...expenses);
    const max = Math.max(maxI, maxE);
    return max;
}