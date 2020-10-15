const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

var describeLicense = "";
var urlLicense = "";

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
            name: "future",
            message: "Future development plans"
        },
        {
            type: "list",
            name: "license",
            choices: ["MIT","Apache 2.0","GPLv3","AGPLv3","wtfpl"],
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

function generateMD(content) {
    console.log(content);
    switch (content.license) {
        case "MIT":
            describeLicense = "FastCompany.com says, '[E]xtremely straightforward and open. It permits users to do anything with a given project as long as they credit the developer and don’t hold him or her liable for the project’s use.'";
            urlLicense = "http://img.shields.io/static/v1?label=License&message=MIT&color=orange";
            break;
        case "Apache 2.0":
            describeLicense = "FastCompany.com says, '[S]imilar to the MIT License, but also explicitly grants patent rights to users.'";
            urlLicense = "http://img.shields.io/static/v1?label=License&message=Apache&color=orange";            
            break;
        case "GPLv3":
            describeLicense = "FastCompany.com says, '[O]lder, more limiting, and less popular than [MIT or Apache]. It is a copyleft license that requires users to track their changes if they modify and then distribute a project. Different versions of this license also restrict the use of modified code in various classes of hardware.'";
            urlLicense = "http://img.shields.io/static/v1?label=License&message=GPL&color=orange";
            break;
        case "AGPLv3":
            describeLicense = "GNU.org says, 'The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure cooperation with the community in the case of network server software. The licenses for most software and other practical works are designed to take away your freedom to share and change the works. By contrast, our General Public Licenses are intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users.'";
            urlLicense = "http://img.shields.io/static/v1?label=License&message=AGPL&color=orange";
            break;
        case "wtfpl":
            describeLicense = "github.com/dtf0 says, 'Ok, the purpose of this license is simple and you just do what the f**k you want to.'";
            urlLicense = "http://img.shields.io/static/v1?label=License&message=wtfplL&color=orange";
            break;
    }
    return `# Application: ${content.projectTitle}\n## Developer: ${content.developer}\n ![License: ${content.license}](${urlLicense}) \n### Table of Contents\n[Project Description](#project-description)\n\n[Installation](#installation)\n\n[Usage](#usage)\n\n[Future Development](#future-development)\n\n[Contributors](#contributors)\n\n[Tests](#tests)\n\n[License](#license)\n\n[Questions, Contact Info](#questions-and-contact-info)\n\n### Project Description\n ${content.description}\n### Installation\n ${content.installation}\n### Usage\n ${content.usage}\n### Future Development\n ${content.future}\n### Contributors\n ${content.contributing}\n### Tests\n ${content.tests}\n ### License\n ${describeLicense}\n### Questions and Contact Info\n ${content.questions}\n * Link to Github profile for the developer, ${content.developer}: [GitHub](https://github.com/${content.github})\n * Email address for ${content.developer}: ${content.email}`
}

async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();
        
        const md = generateMD(answers);

        await writeFileAsync("README.md", md);

        console.log("Successfully wrote to README.md");
    }   catch(err) {
        console.log(err);
    }
}

init();
