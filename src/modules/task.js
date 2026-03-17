export default class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = dueDate;
    }
    
    updateTask(newTitle){
        this.title = newTitle;
    }

    printTitle(){
        return this.title;
    }
}
