//Object Intern created via class constructor, it inherits properties from object Employee, modifies getRole() and adds a new method getSchool()

/*path of file required for this module*/
const Employee = require("./Employee");

/*
define class Intern, which adds onto and modifies object Employee, with constructor that builds a new key pair for github username. Two methods are under Engineer
object, getRole() and getGithub(). getGitHub(), except for getRole() returns the value that will be taken from 
inquirer.prompt in app.js and is later plugged into main.html and later into the final output of team.html. getRole() returns the 
word that is the name of the object, to also be plugged into main.html and later into team.html
*/

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

//exports Engineer object to htmlRenderer.js to be added to an array that will be exported to main.html and later to team.html
module.exports = Intern;