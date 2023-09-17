import moment from 'moment';
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
export const getColor = (user, categoryName, type) => {
    if(type === "Income"){
        return user.incomeCategories[user.incomeCategories.findIndex(inc => inc.name === categoryName)].color;
    }
    return user.expenseCategories[user.expenseCategories.findIndex(exp => exp.name === categoryName)].color;
}

export const toCurrency = (num) => {
    return Number(num).toLocaleString('en-US', {
        style: 'currency',
        currency: 'BGN',
      })
}
export const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "warning";
    if (ratio < 0.75) return "primary";
    return "success";
}

export const getBudgetProgress = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
}
export const formatDate = (timestamp) => {
    return moment(timestamp).format("dddd, MMM Do YYYY")
}
export const formatTime = (timestamp) => {
    return moment(timestamp).format("h:mm:ss A")
}

export const getMonthFromNumber = (item) => {
    switch(item) {
        case 0 : return "January";
        case 1 : return "February";
        case 2 : return "March";
        case 3 : return "April";
        case 4 : return "May";
        case 5 : return "June";
        case 6 : return "July";
        case 7 : return "August";
        case 8 : return "September";
        case 9 : return "October";
        case 10 : return "November";
        case 11 : return "December";
    };
    //in case we don't have correct value
    return false;
}