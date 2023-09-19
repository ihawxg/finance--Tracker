import UserInfo from "../UserInfo";
import styles from "./styles/info.module.css"

export default function ProfilePage(){
    return (
        <div className={styles.userContainer}> 
            <UserInfo />
        </div>
    );
}