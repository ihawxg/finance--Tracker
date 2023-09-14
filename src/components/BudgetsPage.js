import { useDispatch, useSelector } from "react-redux";
import { removeBudget } from "../redux/actions/userActions";
import FormDialog from "./FormDialog";
import styles from "./styles/pages.module.css"

export default function BudgetsPage(){
    const user = useSelector(state => state.userData.user);

    const dispatch = useDispatch();

    const handleClick = (category) => {
        dispatch(removeBudget(user, category));
    }   

    return (
        <div className={styles.page}>
            <h1>Budgets Page</h1>
            <FormDialog value="Budget" title="Add Budget"/>
            {
                user.budgets.map(budget => {
                    return (
                        <>
                            <h1>{budget.category}</h1>
                            <FormDialog value="Budget" title="Edit Budget" operation="edit"/>
                            <button onClick={() => handleClick(budget.category)}> Remove </button>
                        </>
                    );
                })
            }
        </div>
    );
}