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