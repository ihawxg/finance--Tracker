import styles from "./styles/pages.module.css"
import AddAccountBTN from "./AddAccountBTN";
import { useDispatch, useSelector } from "react-redux";
import { removeAccountAction } from "../redux/actions/userActions";

export default function AccountsPage(){
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();

    const handleRemove = (prevName) => {
        dispatch(removeAccountAction(user.id, prevName, user.accounts));
    }

    return (
        <div className={styles.page}>
            <h1>Accounts Page</h1>
            <AddAccountBTN />
            <div style={{marginTop: "50px"}}>
                {user.accounts.map( acc => {
                    return (
                      <>
                        <h1>{acc.name}</h1>
                        <AddAccountBTN operation="edit" name={acc.name}/>
                        <button onClick={() => handleRemove(acc.name)}>Remove</button>
                      </>  
                    );

                })}
            </div>
        </div>
    );
}