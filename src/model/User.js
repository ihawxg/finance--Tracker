export default class User {
    constructor(id, firstName, lastName, email, password, birthDate, currency) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.currency = currency;
        this.income = [];
        this.expense = [];
        this.savings = [];
    }
}