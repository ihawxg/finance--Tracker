export default function delay(fn, ms) {
    let timer = 0;
    return function(...args) {
        clearTimeout(timer); 
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
    }
}
export function getDate(){
    const today = new Date();
    const date = `${(today.getMonth()+1)}/${today.getDate()}/${today.getFullYear()}`;
    return date;
}

export function getFormatedDate(date){
    if(typeof date == "string"){
        date = new Date(date);
    }
    const formattedDate = `${(date.getMonth()+1)}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
}

export const getDateAndTime = (timeStamp) => {
    const dateTime = JSON.stringify(timeStamp);
    const dateArr = dateTime.split("T");
    const date = dateArr[0].slice(3);
    const time = dateArr[1].slice(0, 5);
    return `${date}  ${time}`;
}

export const getColor = (user, categoryName, type) => {
    if(type === "Income"){
        return user.incomeCategories[user.incomeCategories.findIndex(inc => inc.name === categoryName)].color;
    }
    return user.expenseCategories[user.expenseCategories.findIndex(exp => exp.name === categoryName)].color;
}