/*variables to hold the packages needed for this module*/
const path = require("path");
const fs = require("fs");

/*path to template folder that holds the html files this module will modify*/
const templatesDir = path.resolve(__dirname, "../templates");

/*function that modifies and pushes the modified templates into an array to be joined with the main.html where after gathering the info
from .prompts on app.js is rendered in a new team.html*/
const render = employees => {
  let html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
    .join(`
    `)
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
    .join(`
    `)
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
    .join(`
    `)
  );

  return renderMain(html.join(""));

};

/*function that is called for each html template to replace the {{  }} placeholder in the html files*/
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

/*function that reads the main.html file and replaces the placeholder "team" located in it, it is called on in the render function to join the modified 
templates with main.html where it replaces the placeholder*/
const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

/*function that replaces the placeholders in all the html files with a value from the .prompt answers in app.js*/
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

/*exports module to be used in app.js*/
module.exports = render;
