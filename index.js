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
            type: "list",
            name: "license",
            choices: ["tom","dick","harry"],
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
    return `# ${content.projectTitle}\n## ${content.developer}\n\n### Project Description\n ${content.description}\n## Installation\n ${content.installation}\n## Usage\n ${content.usage}\n## Contributors\n ${content.contributing}\n## Tests\n ${content.tests}\n## Questions and Contact Info\n ${content.questions}\n * Link to Github profile for the developer, ${content.developer}: [GitHub](https://github.com/${content.github})\n * Email address for ${content.developer}: ${content.email}`
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
