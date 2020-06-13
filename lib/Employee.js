//Object Employee created via class constructor

/*
define class Employee with constructor that builds key pairs for name, id, and email. Four methods are created under Employee
object, getName(), getId(), getEmail(), getRole(). Each one, except for getRole() returns the value that will be taken from 
inquirer.prompt in app.js and is later plugged into main.html and later into the final output of team.html. getRole() returns the 
word that is the name of the object, to also be plugged into main.html and later into team.html
*/

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole () {
        return "Employee";
    }
}

//exports Employee object to be added onto and modified in Engineer.js, Intern.js and Manager.js
module.exports = Employee;