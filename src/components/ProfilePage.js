import BudgetCard from "./BudgetCard";

export default function ProfilePage(){
    return (
        <>
            <div className="user-data">

            </div>
            <BudgetCard amount={60} min={0} max={120} name="Tesla Model X"/>
        </>
    );
}