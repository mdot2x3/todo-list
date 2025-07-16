import { Project } from "./Project.js";
import { TaskList } from "./TaskList.js";
import { TaskItem } from "./TaskItem.js";

const STORAGE_KEY = "projectStorage";

export const projectStorage = [];

// save projectStorage to localStorage
export function saveToLocalStorage() {
    const rawData = JSON.stringify(projectStorage);
    localStorage.setItem(STORAGE_KEY, rawData);
}

// load data from localStorage and populate projectStorage array
export function loadFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
        const parsed = JSON.parse(raw);
        parsed.forEach(projectObj => {
            // rebuild Project object
            const project = new Project(
                projectObj.title,
                projectObj.description,
                new Date(projectObj.dueDate),
                projectObj.priority
            );
            project.id = projectObj.id;

            // rebuild unassigned task items
            project.projectArrayOfTaskItems = projectObj.projectArrayOfTaskItems.map(taskObj => {
                const task = new TaskItem(
                    taskObj.title,
                    taskObj.description,
                    new Date(taskObj.dueDate),
                    taskObj.priority,
                    taskObj.notes,
                    // taskListId will be null for unassigned tasks
                    null
                );
                task.id = taskObj.id;
                // ensure it's boolean
                task.checkbox = !!taskObj.checkbox;
                // add projectId explicitly
                task.projectId = project.id;
                return task;
            });

            // rebuild TaskLists and their TaskItems
            project.projectArrayOfTaskLists = projectObj.projectArrayOfTaskLists.map(taskListObj => {
                const taskList = new TaskList(taskListObj.title, taskListObj.projectId);
                taskList.id = taskListObj.id;

                 // always initialize the array, even if empty, to preserve empty lists after refresh
                taskList.taskListArrayOfTaskItems = [];

                if (Array.isArray(taskListObj.taskListArrayOfTaskItems)) {
                    taskList.taskListArrayOfTaskItems = taskListObj.taskListArrayOfTaskItems.map(taskObj => {
                        const task = new TaskItem(
                            taskObj.title,
                            taskObj.description,
                            new Date(taskObj.dueDate),
                            taskObj.priority,
                            taskObj.notes,
                            // set taskListId
                            taskList.id
                        );
                        task.id = taskObj.id;
                        task.checkbox = !!taskObj.checkbox;
                        task.projectId = project.id;
                        return task;
                    });
                }
                    return taskList;
                });

            // push the fully reconstructed project into storage
            projectStorage.push(project);
        });

    } catch (error) {
        console.error("Failed to load projectStorage from localStorage:", error);
    }
}
