const request = {
    "post": "https://script.google.com/macros/s/AKfycbzgJ7eUlA_PAvDihPovygdPoYYbjKu3srByTeJUYjRKFcfg-tytgOJjwVzfI6p23_pH/exec",
    "get": "https://script.google.com/macros/s/AKfycbwiLO0D8PwRItiZ-LXsCe0_pAaOhtrZYh9tdHAraTmjCO0s9azxAerj5WQdGZlYDDhC/exec"
}

const endpoints = {
    "get-tags": request.get + '?exec=allTags',
    "get-all-tasks": request.get + '?exec=allTasks',
    "add-task": request.post + '?exec=add',
    "delete-task": request.post + '?exec=delete',
    "update-task": request.post + '?exec=update'
}


export default endpoints;