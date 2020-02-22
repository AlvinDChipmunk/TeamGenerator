const fs       = require("fs"); 
const inquirer = require("inquirer"); 
const util     = require("util");
const path     = require("path");

const Employee = require("./lib/Employee"); 
const Intern   = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager  = require("./lib/Manager");

const render = require("./lib/htmlRenderer");
const outputPath = path.resolve(__dirname, "output", "team.html");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
	console.log ( "Now beginning a new work project team roster.\nWe will start with the manager." ); 

    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Team Manager's Name?",
        validate: answer => {
          if (answer !== "") { return true; }
          return "Please enter at least one character for the manager's name.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "Team Manager's ID? (Must be a unique numerical positive value.)", 
        validate: answer => {
          const pass = answer.match( /^[1-9]\d*$/ );
          if (pass) { return true; }
          return "Please enter a number greater than zero for the manager's ID.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Team manager's email address?",
        validate: answer => {
          const pass = answer.match( /\S+@\S+\.\S+/ );
          if (pass) { return true; }
          return "Please enter a valid email address for the manager.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Team Manager's Office #?",
        validate: answer => { 
          const pass = answer.match( /^[1-9]\d*$/ );
          if (pass) { return true; }
          return "Please enter a number greater than zero for the manager's office number.";
        }
      }
    ]).then(answers => {
      const manager = new Manager (
        answers.managerName, 
        answers.managerId, 
        answers.managerEmail, 
        answers.managerOfficeNumber
      );
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "New engineer's Name?",
        validate: answer => {
          if (answer !== "") { return true; }
          return "Please enter at least one character for the engineer's name.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "New engineer's ID? (Must be a unique numerical positive value.)",
        validate: answer => {
          const pass = answer.match( /^[1-9]\d*$/ );
          if (pass) {
            if (idArray.includes(answer)) { return "This ID is already taken. Please enter a different number for the engineer."; }
            else { return true; }
          }
          return "Please enter a positive number greater than zero for the engineer's ID number.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "New engineer's email address?",
        validate: answer => {
          const pass = answer.match( /\S+@\S+\.\S+/ );
          if (pass) { return true; }
          return "Please enter a valid email address for the engineer.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "New engineer's GitHub ID?",
        validate: answer => {
          if (answer !== "") { return true; }
          return "Please enter at least one character for the engineer's GitHub ID.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer (
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub
      );
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }


  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "New intern's Name?",
        validate: answer => {
          if (answer !== "") { return true; }
          return "Please enter at least one character for the intern's name.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "New intern's ID?",
        validate: answer => {
          const pass = answer.match( /^[1-9]\d*$/ );
          if (pass) {
            if (idArray.includes(answer)) { return "This ID is already taken. Please enter a different number for the intern."; }
            else { return true; }
          }
          return "Please enter a positive number greater than zero for the intern's ID number.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "New intern's email address?",
        validate: answer => {
          const pass = answer.match( /\S+@\S+\.\S+/ );
          if (pass) { return true; }
          return "Please enter a valid email address for the intern.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "New intern's school?",
        validate: answer => {
          if (answer !== "") { return true; }
          return "Please enter at least one character for the intern's school.";
        }
      }
    ]).then(answers => {
      const intern = new Intern (
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();