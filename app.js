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

choices();

let teamList = [];


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
        else {
            renderHTML();
        }
    });
};


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

function renderHTML() {
    let html = render(teamList);
    fs.writeFile(outputPath, html, function (err) {
        if (err) {
            throw err;
        }
        console.log("Team Profile page successfully made!!")
    });
};




/*
Write code to use inquirer to gather information about the development team members,
and to create objects for each team member (using the correct classes as blueprints!)

After the user has input all employees desired, call the `render` function (required
above) and pass in an array containing all employee objects; the `render` function will
generate and return a block of HTML including templated divs for each employee!

After you have your html, you're now ready to create an HTML file using the HTML
returned from the `render` function. Now write it to a file named `team.html` in the
`output` folder. You can use the variable `outputPath` above target this location.
Hint: you may need to check if the `output` folder exists and create it if it
does not.

HINT: each employee type (manager, engineer, or intern) has slightly different
information; write your code to ask different questions via inquirer depending on
employee type.

HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
and Intern classes should all extend from a class named Employee; see the directions
for further information. Be sure to test out each class and verify it generates an
object with the correct structure and methods. This structure will be crucial in order
for the provided `render` function to work!*/
