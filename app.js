const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

/*imports file that renders the completed template (that includes engineer, intern, manager html into main.html)*/
const render = require("./lib/htmlRenderer");

/*call on choices function so that the prompts start, and ask the first question*/
choices();

/*array that manager, inter, and engineer objects will be added to and then passed through the render function from htmlRenderer.js*/
let teamList = [];

/*function that asks the user what type of employee they are entering information about, using the choices question in the object, the user
is offered to choose from three employees. The promise's response is then ran through an if statement, depending on the choice made by
the user, another function will run where the user is asked employee specific questions*/
function choices() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Use arrow keys to select type of employee",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(answer => {
        console.log(answer);

        let employeeType = answer.employee;
        if (employeeType === "Manager") {
            manager();
        }
        else if (employeeType === "Engineer") {
            engineer();
        }
        else if (employeeType === "Intern") {
            intern();
        }
    });
};

/*function that is called when user chooses to add a manager to their team page. The last question object asks the user if they
wish to add another employee, if yes then choices function is called, if the user says no then renderHTML function is called to write
into team.html*/
function manager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Type name of employee"
        },
        {
            type: "input",
            name: "id",
            message: "Type employee id"
        },
        {
            type: "input",
            name: "email",
            message: "Type employee email"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Type employee office number"
        },
        {
            type: "confirm",
            name: "anotherEmployee",
            message: "Add another employee?"
        }
    ]).then(answer => {
        teamList.push(new Manager(answer.name, answer.id, answer.email, answer.officeNumber));
        console.log(teamList);
        if (answer.anotherEmployee === true) {
            choices();
        }
        else {
            renderHTML();
        }
    });
};

/*function that is called when user chooses to add a engineer to their team page. The last question object asks the user if they
wish to add another employee, if yes then choices function is called, if the user says no then renderHTML function is called to write
into team.html*/
function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Type name of employee"
        },
        {
            type: "input",
            name: "id",
            message: "Type employee id"
        },
        {
            type: "input",
            name: "email",
            message: "Type employee email"
        },
        {
            type: "input",
            name: "github",
            message: "Type employee's github username"
        },
        {
            type: "confirm",
            name: "anotherEmployee",
            message: "Add another employee?"
        }
    ]).then(answer => {
        teamList.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
        console.log(teamList);
        if (answer.anotherEmployee === true) {
            choices();
        }
        else {
            renderHTML();
        }
    });
};

/*function that is called when user chooses to add an intern to their team page. The last question object asks the user if they
wish to add another employee, if yes then choices function is called, if the user says no then renderHTML function is called to write
into team.html*/
function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Type name of employee"
        },
        {
            type: "input",
            name: "id",
            message: "Type employee id"
        },
        {
            type: "input",
            name: "email",
            message: "Type employee email"
        },
        {
            type: "input",
            name: "school",
            message: "Type name of school employee attends"
        },
        {
            type: "confirm",
            name: "anotherEmployee",
            message: "Add another employee?"
        }
    ]).then(answer => {
        teamList.push(new Intern(answer.name, answer.id, answer.email, answer.school));
        console.log(teamList);
        if (answer.anotherEmployee === true) {
            choices();
        }
        else {
            renderHTML();
        }
    });
};

/*function to call the render function from htmlRenderer.js into a variable and writes the variable into team.html in output folder*/
function renderHTML() {
    let html = render(teamList);
    fs.writeFile(outputPath, html, function (err) {
        if (err) {
            throw err;
        }
        console.log("Team Profile page successfully made!!")
    });
};
