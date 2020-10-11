const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "Name of the project"
        },
        {
            type: "input",
            name: "developer",
            message: "Developer(s)"
        },
        {
            type: "input",
            name: "github",
            message: "GitHub user name"
        },
        {
            type: "input",
            name: "email",
            message: "Email address"
        },
        {
            type: "input",
            name: "description",
            message: "Brief description"
        },
        {
            type: "input",
            name: "toc",
            message: "Table of contents"
        },
        {
            type: "input",
            name: "installation",
            message: "Install instructions"
        },
        {
            type: "input",
            name: "usage",
            message: "Use instructions"
        },
        {
            type: "input",
            name: "license",
            message: "Licensing"
        },
        {
            type: "input",
            name: "contributing",
            message: "Contributors"
        },
        {
            type: "input",
            name: "tests",
            message: "Tests"
        },
        {
            type: "input",
            name: "questions",
            message: "Remaining questions"
        }
    ]);
}