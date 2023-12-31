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
    if(type === 'income' || type === 'Income'){
        return user.incomeCategories[user.incomeCategories.findIndex(inc => inc.name === categoryName)].color;
    }
    return user.expenseCategories[user.expenseCategories.findIndex(exp => exp.name === categoryName)].color;
}

export const toCurrency = (num, currency = "BGN") => {
    return Number(num).toLocaleString({
        style: 'currency',
        currency
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
export const formatDateNoDay = (timestamp) => {
    return moment(timestamp).format("MMM Do YYYY")
}
export const formatTime = (timestamp) => {
    return moment(timestamp).format("h:mm A")
}

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}

export const isWithinDate = (date, from, to) => {
    const timeFrom = new Date(from).getTime();
    const timeDate = new Date(date).getTime();
    const timeTo = new Date(to).getTime();

    return (timeFrom < timeDate && timeDate < timeTo);
}

export const getAmount = (user, from, to, category) => {
    let amount = 0;
    user.accounts.forEach(acc => {
        acc.expenses.forEach(exp => {
            if(exp.category === category && isWithinDate(exp.date, from, to)){
                amount += Number(exp.amount);
            }
        })
    })
    return amount;
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
        //in case we don't have correct value
        default: return false;
    };
}