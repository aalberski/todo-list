import './styles.css';
import Task from './modules/task';
import Project from './modules/project';

let activeProject = null;

// Main content element
const content = document.querySelector("#content");

// Project elements
const projectList = document.getElementById("project-list");
const projectForm = document.getElementById("project-form");
const addProject = document.getElementById("add-project");

// Task elements
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const addTask = document.getElementById("add-task");

// Add project button
addProject.addEventListener('click', (e) =>{
    e.preventDefault();
    projectForm.style.visibility = "visible";
})

// Project form
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const proj = new Project(document.getElementById("project-name").value);
    projects.push(proj);
    displayProjects();
    projectForm.style.visibility = "hidden";
    projectForm.reset();
})

// Display projects
function displayProjects(){
    projectList.innerHTML = "";

    projects.forEach(project => {
        const projectItem = document.createElement("span");
        projectItem.textContent = project.name;
        projectItem.classList.add("project-item");
        projectItem.addEventListener("click", (e) =>{
            activeProject = project;
            displayTasks();
        })

        const deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", (e) =>{
            e.preventDefault();
            
            const index = projects.indexOf(project);
            projects.splice(index, 1);

            displayProjects();
        })
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-project");
        projectItem.appendChild(deleteButton);
        projectList.appendChild(projectItem);
    })
}

// Add task button

addTask.addEventListener('click', (e) =>{
    e.preventDefault();
    taskForm.style.visibility = "visible";
})

// Task form
taskForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(!activeProject) return;
    const title = document.getElementById("task-name").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    const task = new Task(title, description, dueDate, priority);
    activeProject.addTask(task);
    displayTasks(activeProject);
    taskForm.style.visibility = "hidden";
    taskForm.reset();
}
)
// Display tasks

function displayTasks(){
    if(!activeProject) return;
    taskList.innerHTML = "";

    const projectTasks = activeProject.getTasks();
    projectTasks.forEach(task =>{
        const taskItem = document.createElement("div");
        taskItem.textContent = task.title;
        taskItem.classList.add("task-item");
        taskItem.addEventListener("click", (e)=>{
            e.preventDefault();
        })
        const deleteButton = document.createElement("button");
        deleteButton.addEventListener('click', (e) =>{
            e.preventDefault();

            const index = projectTasks.indexOf(task);
            projectTasks.splice(index, 1);
            
            displayTasks();
        })
        deleteButton.textContent = "Delete";
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    })

}

// Main

const projects = [];
const defaultProject = new Project("Default");
projects.push(defaultProject);

activeProject = defaultProject;
displayProjects();