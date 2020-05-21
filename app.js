const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
//`${__dirname}/output`;
const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputPath2 = path.join(OUTPUT_DIR, "style.css");

//`${OUTPUT_DIR}/team.html`;

//`${__dirname}/output/team.html`

const render = require("./lib/htmlRenderer");

const createdTeam = [];
function createOutPut() {
    //create manager function
    const createManager = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of the manager for this project?",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "What is the id # for the manager for this project?",
                    name: "managerId"
                },
                {
                    type: "input",
                    message: "What is the manager's email for this project?",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "What is the manager's office number for this project?",
                    name: "managerOfficeNumber"
                },
            ])
            .then(answers => {
                const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
                createdTeam.push(manager)
                createTeam();
            })
    }

    //create team function
    const createTeam = function () {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Would you like to add more team members?",
                    name: "moreMembers",
                    choices: ["Yes", "No"]
                },
            ])
            .then(answers => {
           if (answers.moreMembers == "Yes"){
               selectEmployee();
           }else{
               renderHtml();
               RenderCss();
           }
            })
    }
    const selectEmployee = function () {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Please select an employee type below:",
                    choices: ["Engineer", "Intern"],
                    name: "employeeType"
                },
            ])
            .then(answers => {
                switch (answers.employeeType) {
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break; 
                }
            })
            .catch(function(err) {
                console.log(err);
              });
    }
    //add Engineer function
    const createEngineer = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of this engineer?",
                    name: "engineerName"
                },
                {
                    type: "input",
                    message: "What is the id # for this engineer?",
                    name: "engineerId"
                },
                {
                    type: "input",
                    message: "What is the engineer's email?",
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: "What is the engineer's GitHub user name?",
                    name: "engineerGitHub"
                },
            ])
            .then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
                createdTeam.push(engineer)
                createTeam();
            })
    }
    //add Intern function
    const createIntern = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of this intern?",
                    name: "internName"
                },
                {
                    type: "input",
                    message: "What is the id # for this intern?",
                    name: "internId"
                },
                {
                    type: "input",
                    message: "What is the intern's email?",
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: "What school is the intern attending?",
                    name: "internSchool"
                },
            ])
            .then(answers => {
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                createdTeam.push(intern)
                createTeam();
            })
    }
    //build Team function
    //!fs.existSync checks if the path exists  fs mkdirsync makes the directory
    const renderHtml = function () {
        if (!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }
        fs.writeFileSync(outputPath, render(createdTeam))
    };
    const RenderCss = function () {
        if (!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }
        fs.writeFileSync(outputPath2, `
        body{
            background-color: blue;
        }
        `)
    };


    createManager();

}

createOutPut();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



//*****My pseudo code******
//have inquirer prompt user for manager name
//then prompt for engineer name followed by do you want to add another
//if they want another continue to prompt for name of engineer
//if they dont want another enginner prompt