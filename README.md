# TeamGenerator

This application is meant to be a Node.js CLI that creates a work group list.  Members of this list are of three employee types, manager, engineer, and intern.  These three employee types have traits common to all kinds of employees, such as a name, but each different type also possess traits not shared with others, such as a GitHub ID for the engineer employee type. 

The user interface is generally an interrogative flow of questions, with the information of the manager of the work group or "team" being stored first, then additional team members are optionally added.  

After the team is created, the list of team members gets processed to create a team.html file in a directory named "output", with each team member's information placed in an individual section.
